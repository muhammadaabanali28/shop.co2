const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "shopco_super_secret_key_2026";

// ── Data helpers ──────────────────────────────────────────────────────────────
// Vercel serverless: /tmp is writable; bundled api/data/ is read-only source
const SRC_DIR = path.join(__dirname, "data");
const TMP_DIR = "/tmp/shopco-data";

function ensureTmp() {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
}

function readJSON(file) {
  ensureTmp();
  const tmp = path.join(TMP_DIR, file);
  if (fs.existsSync(tmp)) return JSON.parse(fs.readFileSync(tmp, "utf-8"));
  const src = path.join(SRC_DIR, file);
  const data = fs.existsSync(src) ? JSON.parse(fs.readFileSync(src, "utf-8")) : [];
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  return data;
}

function writeJSON(file, data) {
  ensureTmp();
  fs.writeFileSync(path.join(TMP_DIR, file), JSON.stringify(data, null, 2));
}

// ── Auth middleware ───────────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });
  try {
    req.user = jwt.verify(auth.split(" ")[1], JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// ── Health ────────────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// ── Products ──────────────────────────────────────────────────────────────────
app.get("/api/products", (req, res) => {
  try { res.json(readJSON("products.json")); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

app.get("/api/products/:id", (req, res) => {
  try {
    const p = readJSON("products.json").find(x => x._id === req.params.id);
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.post("/api/products", (req, res) => {
  try {
    const { title, price, description, category, image, rating } = req.body;
    if (!title || !price) return res.status(400).json({ message: "Title and price required" });
    const products = readJSON("products.json");
    const newP = { _id: uuidv4(), title, description: description || "", category: category || "", image: image || "", price: Number(price), rating: rating ? Number(rating) : 4.5 };
    products.push(newP);
    writeJSON("products.json", products);
    res.status(201).json(newP);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.put("/api/products/:id", (req, res) => {
  try {
    const products = readJSON("products.json");
    const i = products.findIndex(x => x._id === req.params.id);
    if (i === -1) return res.status(404).json({ message: "Not found" });
    products[i] = { ...products[i], ...req.body };
    writeJSON("products.json", products);
    res.json(products[i]);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.delete("/api/products/:id", (req, res) => {
  try {
    let products = readJSON("products.json").filter(x => x._id !== req.params.id);
    writeJSON("products.json", products);
    res.json({ message: "Deleted" });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Auth ──────────────────────────────────────────────────────────────────────
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });
    const users = readJSON("users.json");
    if (users.find(u => u.email === email)) return res.status(400).json({ message: "Email already exists" });
    const hash = await bcrypt.hash(password, 10);
    const user = { _id: uuidv4(), name, email, password: hash };
    users.push(user);
    writeJSON("users.json", users);
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readJSON("users.json");
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  try {
    const users = readJSON("users.json");
    const user = users.find(u => u._id === req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── Cart ──────────────────────────────────────────────────────────────────────
function getUserCart(userId) {
  const carts = readJSON("cart.json");
  return carts.find(c => c.userId === userId) || { userId, items: [] };
}

function saveUserCart(userId, items) {
  const carts = readJSON("cart.json");
  const i = carts.findIndex(c => c.userId === userId);
  if (i === -1) carts.push({ userId, items });
  else carts[i].items = items;
  writeJSON("cart.json", carts);
}

app.get("/api/cart", authMiddleware, (req, res) => {
  try { res.json(getUserCart(req.user.id)); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

app.post("/api/cart", authMiddleware, (req, res) => {
  try {
    const cart = getUserCart(req.user.id);
    cart.items.push(req.body);
    saveUserCart(req.user.id, cart.items);
    res.json(cart);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.put("/api/cart/:index", authMiddleware, (req, res) => {
  try {
    const cart = getUserCart(req.user.id);
    const idx = Number(req.params.index);
    if (cart.items[idx]) cart.items[idx].quantity = req.body.quantity;
    saveUserCart(req.user.id, cart.items);
    res.json(cart);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.delete("/api/cart/:index", authMiddleware, (req, res) => {
  try {
    const cart = getUserCart(req.user.id);
    cart.items.splice(Number(req.params.index), 1);
    saveUserCart(req.user.id, cart.items);
    res.json(cart);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.delete("/api/cart", authMiddleware, (req, res) => {
  try {
    saveUserCart(req.user.id, []);
    res.json({ userId: req.user.id, items: [] });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = app;
