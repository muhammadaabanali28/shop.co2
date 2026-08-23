// In production on Vercel, /api/* is routed to the serverless function automatically
// In dev, Vite proxy forwards /api/* to localhost:5000
const API_BASE = "/api";

// Images are now static assets in frontend/public/images/ - no base URL needed
export const IMG_BASE = "";


const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + getToken(),
});

export const api = {
  getProducts: async () => {
    const res = await fetch(API_BASE + "/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  getProductById: async (id) => {
    const res = await fetch(API_BASE + "/products/" + id);
    if (!res.ok) throw new Error("Product not found");
    return res.json();
  },

  createProduct: async (productData) => {
    const res = await fetch(API_BASE + "/products", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to create product");
    }
    return res.json();
  },

  register: async (name, email, password) => {
    const res = await fetch(API_BASE + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
  },

  login: async (email, password) => {
    const res = await fetch(API_BASE + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
  },

  getMe: async () => {
    const res = await fetch(API_BASE + "/auth/me", { headers: authHeaders() });
    if (!res.ok) throw new Error("Not authorized");
    return res.json();
  },

  getCart: async () => {
    const res = await fetch(API_BASE + "/cart", { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch cart");
    return res.json();
  },

  addToCart: async (item) => {
    const res = await fetch(API_BASE + "/cart", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error("Failed to add to cart");
    return res.json();
  },

  updateCartItem: async (index, quantity) => {
    const res = await fetch(API_BASE + "/cart/" + index, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error("Failed to update cart");
    return res.json();
  },

  removeFromCart: async (index) => {
    const res = await fetch(API_BASE + "/cart/" + index, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to remove from cart");
    return res.json();
  },

  clearCart: async () => {
    const res = await fetch(API_BASE + "/cart", {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to clear cart");
    return res.json();
  },
};

export { API_BASE };
