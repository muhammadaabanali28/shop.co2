const express = require("express");
const cors = require("cors");
const path = require("path");

const productRoutes = require("../backend/routes/productRoutes");
const authRoutes = require("../backend/routes/authRoutes");
const cartRoutes = require("../backend/routes/cartRoutes");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/upload", express.static(path.join(__dirname, "..", "backend", "upload")));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
