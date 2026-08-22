const products = require("./products.json");
const { v4: uuidv4 } = require("uuid");

let db = {
  products: [...products],
  users: [],
  cart: {},
};

module.exports = {
  getProducts: () => db.products,

  getProductById: (id) => db.products.find((p) => p._id === id),

  createProduct: (data) => {
    const newProduct = { _id: uuidv4(), ...data };
    db.products.push(newProduct);
    return newProduct;
  },

  updateProduct: (id, data) => {
    const index = db.products.findIndex((p) => p._id === id);
    if (index === -1) return null;
    db.products[index] = { ...db.products[index], ...data };
    return db.products[index];
  },

  deleteProduct: (id) => {
    db.products = db.products.filter((p) => p._id !== id);
    return true;
  },

  findUserByEmail: (email) => db.users.find((u) => u.email === email),

  findUserById: (id) => db.users.find((u) => u._id === id),

  createUser: (data) => {
    const newUser = { _id: uuidv4(), ...data };
    db.users.push(newUser);
    return newUser;
  },

  getCart: (userId) => db.cart[userId] || [],

  addToCart: (userId, item) => {
    if (!db.cart[userId]) db.cart[userId] = [];
    const existing = db.cart[userId].findIndex(
      (i) => i.productId === item.productId && i.color === item.color && i.size === item.size
    );
    if (existing > -1) {
      db.cart[userId][existing].quantity += item.quantity || 1;
    } else {
      db.cart[userId].push({ ...item, quantity: item.quantity || 1, addedAt: Date.now() });
    }
    return db.cart[userId];
  },

  updateCartItem: (userId, index, quantity) => {
    if (!db.cart[userId] || !db.cart[userId][index]) return null;
    db.cart[userId][index].quantity = quantity;
    return db.cart[userId];
  },

  removeFromCart: (userId, index) => {
    if (!db.cart[userId] || !db.cart[userId][index]) return null;
    db.cart[userId].splice(index, 1);
    return db.cart[userId];
  },

  clearCart: (userId) => {
    db.cart[userId] = [];
    return [];
  },
};
