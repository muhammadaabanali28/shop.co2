const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve uploaded product images as static files
app.use("/upload", express.static(path.join(__dirname, "upload")));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
