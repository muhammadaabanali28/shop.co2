const { readJSON, writeJSON } = require("../config/jsonDB");

const CART_FILE = "cart.json";

const getCart = async (req, res) => {
  try {
    const allCart = readJSON(CART_FILE);
    const cart = allCart[req.user._id] || [];
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, title, image, price, quantity, color, size } = req.body;
    const allCart = readJSON(CART_FILE);
    const userId = req.user._id;

    if (!allCart[userId]) allCart[userId] = [];

    const existingIndex = allCart[userId].findIndex(
      (item) => item.productId === productId && item.color === color && item.size === size
    );

    if (existingIndex > -1) {
      allCart[userId][existingIndex].quantity += quantity || 1;
    } else {
      allCart[userId].push({
        productId,
        title,
        image,
        price,
        quantity: quantity || 1,
        color: color || "#4a4a4a",
        size: size || "M",
        addedAt: Date.now(),
      });
    }

    writeJSON(CART_FILE, allCart);
    res.json(allCart[userId]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const allCart = readJSON(CART_FILE);
    const userId = req.user._id;
    const index = req.params.index;

    if (!allCart[userId] || !allCart[userId][index]) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    allCart[userId][index].quantity = quantity;
    writeJSON(CART_FILE, allCart);
    res.json(allCart[userId]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const allCart = readJSON(CART_FILE);
    const userId = req.user._id;
    const index = parseInt(req.params.index);

    if (!allCart[userId] || !allCart[userId][index]) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    allCart[userId].splice(index, 1);
    writeJSON(CART_FILE, allCart);
    res.json(allCart[userId]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const allCart = readJSON(CART_FILE);
    allCart[req.user._id] = [];
    writeJSON(CART_FILE, allCart);
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
