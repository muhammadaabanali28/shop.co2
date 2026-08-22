const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  category: {
    type: String,
    default: "",
  },

  image: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    default: 4.5,
  },
});

module.exports = mongoose.model("Product", productSchema);