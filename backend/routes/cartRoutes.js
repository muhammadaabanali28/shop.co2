const express = require("express");
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require("../controller/cartController");
const auth = require("../middleware/auth");

router.get("/", auth, getCart);
router.post("/", auth, addToCart);
router.put("/:index", auth, updateCartItem);
router.delete("/:index", auth, removeFromCart);
router.delete("/", auth, clearCart);

module.exports = router;
