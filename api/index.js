const express = require("express");
const path = require("path");
const cors = require("cors");

// Load env vars
require("dotenv").config({ path: path.join(__dirname, "../backend/.env") });

const productRoutes = require("../backend/routes/productRoutes");
const authRoutes = require("../backend/routes/authRoutes");
const cartRoutes = require("../backend/routes/cartRoutes");

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Serve uploaded product images
app.use("/upload", express.static(path.join(__dirname, "../backend/upload")));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
