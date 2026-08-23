const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "shopco_secret_key";

app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json());

// ── Seed Products ──────────────────────────────────────────────
const products = [
  { id: "1", title: "Gradient Graphic T-shirt", description: "A stylish gradient graphic t-shirt for casual wear.", category: "t-shirts", image: "/upload/products/image 7.png", price: 145, rating: 3.5 },
  { id: "2", title: "Polo with Tipping Details", description: "Classic polo shirt with elegant tipping details.", category: "polos", image: "/upload/products/image 8.png", price: 180, rating: 4.5 },
  { id: "3", title: "Black Striped T-shirt", description: "Bold black striped t-shirt for a modern look.", category: "t-shirts", image: "/upload/products/image 9.png", price: 120, rating: 5.0 },
  { id: "4", title: "Skinny Fit Jeans", description: "Sleek skinny fit jeans for a contemporary style.", category: "jeans", image: "/upload/products/image 10.png", price: 240, rating: 4.5 },
  { id: "5", title: "Checkered Shirt", description: "Timeless checkered shirt for any occasion.", category: "shirts", image: "/upload/products/selling.png", price: 180, rating: 4.5 },
  { id: "6", title: "Sleeve Striped T-shirt", description: "Striped t-shirt with comfortable sleeve design.", category: "t-shirts", image: "/upload/products/selling1.png", price: 130, rating: 4.5 },
  { id: "7", title: "Vertical Striped Shirt", description: "Elegant vertical striped shirt for a sharp look.", category: "shirts", image: "/upload/products/selling2.png", price: 212, rating: 5.0 },
  { id: "8", title: "Courage Graphic T-shirt", description: "Bold courage graphic t-shirt to make a statement.", category: "t-shirts", image: "/upload/products/selling3.png", price: 145, rating: 4.0 },
];

// ── In-Memory Users & Cart ─────────────────────────────────────
const users = [];
const carts = {};

// ── Auth Middleware ────────────────────────────────────────────
const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { _id: decoded.id, name: decoded.name, email: decoded.email };
    next();
  } catch {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ── Products Routes ────────────────────────────────────────────
app.get("/api/products", (req, res) => {
  const { category, search } = req.query;
  let result = [...products];
  if (category) result = result.filter((p) => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

app.post("/api/products", auth, (req, res) => {
  const { title, description, category, image, price, rating } = req.body;
  if (!title || !price) return res.status(400).json({ message: "Title and price are required" });
  const product = { id: uuidv4(), title, description: description || "", category: category || "", image: image || "", price, rating: rating || 0 };
  products.push(product);
  res.status(201).json(product);
});

// ── Auth Routes ────────────────────────────────────────────────
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), name, email, password: hashed };
  users.push(user);

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "All fields are required" });

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.get("/api/auth/me", auth, (req, res) => {
  res.json({ id: req.user._id, name: req.user.name, email: req.user.email });
});

// ── Cart Routes ────────────────────────────────────────────────
app.get("/api/cart", auth, (req, res) => {
  res.json(carts[req.user._id] || []);
});

app.post("/api/cart", auth, (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) return res.status(400).json({ message: "productId is required" });

  const userId = req.user._id;
  if (!carts[userId]) carts[userId] = [];

  const existing = carts[userId].find((item) => item.productId === productId);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + (quantity || 1);
  } else {
    carts[userId].push({ productId, quantity: quantity || 1 });
  }
  res.json(carts[userId]);
});

app.put("/api/cart/:index", auth, (req, res) => {
  const userId = req.user._id;
  const idx = parseInt(req.params.index, 10);
  if (!carts[userId] || idx < 0 || idx >= carts[userId].length) {
    return res.status(404).json({ message: "Cart item not found" });
  }
  const { quantity } = req.body;
  if (quantity === undefined || quantity < 1) {
    carts[userId].splice(idx, 1);
  } else {
    carts[userId][idx].quantity = quantity;
  }
  res.json(carts[userId]);
});

app.delete("/api/cart/:index", auth, (req, res) => {
  const userId = req.user._id;
  const idx = parseInt(req.params.index, 10);
  if (!carts[userId] || idx < 0 || idx >= carts[userId].length) {
    return res.status(404).json({ message: "Cart item not found" });
  }
  carts[userId].splice(idx, 1);
  res.json(carts[userId]);
});

app.delete("/api/cart", auth, (req, res) => {
  carts[req.user._id] = [];
  res.json({ message: "Cart cleared" });
});

// ── Health Check ───────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

module.exports = (req, res) => app(req, res);
