const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../backend/.env") });

const productRoutes = require("../backend/routes/productRoutes");
const authRoutes = require("../backend/routes/authRoutes");
const cartRoutes = require("../backend/routes/cartRoutes");

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

module.exports = app;
