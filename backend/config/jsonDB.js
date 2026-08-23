const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const seedProducts = [
  { _id: "p001", title: "Gradient Graphic T-shirt", description: "A stylish gradient graphic t-shirt made from premium cotton.", category: "T-shirts", style: "Casual", color: "white", size: "Large", image: "/images/image7.png", price: 145, rating: 3.5, isNew: true },
  { _id: "p002", title: "Polo with Tipping Details", description: "Classic polo shirt with elegant tipping details on the collar and sleeves.", category: "T-shirts", style: "Casual", color: "red", size: "Medium", image: "/images/image8.png", price: 180, rating: 4.5, isNew: true },
  { _id: "p003", title: "Black Striped T-shirt", description: "Bold black striped t-shirt for a modern casual look.", category: "T-shirts", style: "Casual", color: "black", size: "Small", image: "/images/image9.png", price: 120, originalPrice: 150, discount: 20, rating: 5.0, isNew: true },
  { _id: "p004", title: "Skinny Fit Jeans", description: "Comfortable skinny fit jeans with stretch fabric.", category: "Jeans", style: "Casual", color: "blue", size: "Large", image: "/images/image10.png", price: 240, originalPrice: 260, discount: 8, rating: 4.5, isNew: true },
  { _id: "p005", title: "Checkered Shirt", description: "Classic checkered shirt perfect for casual and formal occasions.", category: "Shirts", style: "Casual", color: "red", size: "X-Large", image: "/images/selling1.png", price: 180, rating: 4.5 },
  { _id: "p006", title: "Sleeve Striped T-shirt", description: "Striped t-shirt for a sporty casual style.", category: "T-shirts", style: "Casual", color: "orange", size: "XX-Large", image: "/images/selling2.png", price: 130, originalPrice: 160, discount: 20, rating: 4.5 },
  { _id: "p007", title: "Vertical Striped Shirt", description: "Elegant vertical striped shirt for a sophisticated look.", category: "Shirts", style: "Formal", color: "green", size: "Medium", image: "/images/selling3.png", price: 212, originalPrice: 232, discount: 9, rating: 5.0 },
  { _id: "p008", title: "Courage Graphic T-shirt", description: "Bold graphic t-shirt with courage-themed design.", category: "T-shirts", style: "Casual", color: "orange", size: "Large", image: "/images/selling.png", price: 145, rating: 4.0 },
  { _id: "p009", title: "Classic Denim Jeans", description: "Timeless straight-cut denim jeans crafted from durable fabric.", category: "Jeans", style: "Casual", color: "blue", size: "Medium", image: "/images/selling.png", price: 199, originalPrice: 240, discount: 17, rating: 4.2 },
  { _id: "p010", title: "Loose Fit Bermuda Shorts", description: "Comfortable loose fit Bermuda shorts perfect for summer days.", category: "Shorts", style: "Casual", color: "blue", size: "Medium", image: "/images/image7.png", price: 80, rating: 3.0 },
  { _id: "p011", title: "Gym Running Hoodie", description: "Lightweight and breathable hoodie designed for running and gym workouts.", category: "Hoodies", style: "Gym", color: "black", size: "Large", image: "/images/image8.png", price: 175, originalPrice: 210, discount: 17, rating: 4.8 },
  { _id: "p012", title: "Formal Executive Shirt", description: "Premium formal shirt with a sharp cut for office and business meetings.", category: "Shirts", style: "Formal", color: "white", size: "Large", image: "/images/image9.png", price: 220, rating: 4.9 },
  { _id: "p013", title: "Warm Fleece Hoodie", description: "Ultra-warm fleece hoodie with kangaroo pocket and adjustable hood.", category: "Hoodies", style: "Casual", color: "black", size: "X-Large", image: "/images/selling1.png", price: 160, originalPrice: 190, discount: 16, rating: 4.5 },
  { _id: "p014", title: "Classic Summer Shorts", description: "Light and airy summer shorts with elastic waistband for beach and casual wear.", category: "Shorts", style: "Casual", color: "yellow", size: "Small", image: "/images/selling2.png", price: 95, rating: 4.0 },
  { _id: "p015", title: "Breathable Workout Tee", description: "High-performance workout t-shirt with moisture-wicking technology.", category: "T-shirts", style: "Gym", color: "green", size: "Medium", image: "/images/selling3.png", price: 70, rating: 4.1 },
  { _id: "p016", title: "Urban Street Joggers", description: "Stylish slim-fit joggers blending streetwear aesthetics with everyday comfort.", category: "Jeans", style: "Casual", color: "black", size: "Large", image: "/images/image10.png", price: 110, originalPrice: 135, discount: 19, rating: 3.9 },
];

const readJSON = (filename) => {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    if (filename === "products.json") {
      fs.writeFileSync(filePath, JSON.stringify(seedProducts, null, 2));
      return seedProducts;
    }
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeJSON = (filename, data) => {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readJSON, writeJSON };
