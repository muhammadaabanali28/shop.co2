const { readJSON, writeJSON } = require("../config/jsonDB");
const { v4: uuidv4 } = require("uuid");

const PRODUCTS_FILE = "products.json";

const getProducts = async (req, res) => {
  try {
    const products = readJSON(PRODUCTS_FILE);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const products = readJSON(PRODUCTS_FILE);
    const product = products.find((p) => p._id === req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, image, rating } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    const products = readJSON(PRODUCTS_FILE);

    const newProduct = {
      _id: uuidv4(),
      title,
      description: description || "",
      category: category || "",
      image: image || "",
      price: Number(price),
      rating: rating ? Number(rating) : 4.5,
    };

    products.push(newProduct);
    writeJSON(PRODUCTS_FILE, products);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const products = readJSON(PRODUCTS_FILE);
    const index = products.findIndex((p) => p._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Product not found" });

    products[index] = { ...products[index], ...req.body };
    writeJSON(PRODUCTS_FILE, products);

    res.json(products[index]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let products = readJSON(PRODUCTS_FILE);
    products = products.filter((p) => p._id !== req.params.id);
    writeJSON(PRODUCTS_FILE, products);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
