const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");

dotenv.config();

const seedProducts = [
  {
    title: "Gradient Graphic T-shirt",
    image: "/upload/products/image 7.png",
    price: 145,
    rating: 3.5,
  },
  {
    title: "Polo with Tipping Details",
    image: "/upload/products/image 8.png",
    price: 180,
    rating: 4.5,
  },
  {
    title: "Black Striped T-shirt",
    image: "/upload/products/image 9.png",
    price: 120,
    rating: 5.0,
  },
  {
    title: "Skinny Fit Jeans",
    image: "/upload/products/image 10.png",
    price: 240,
    rating: 4.5,
  },
  {
    title: "Checkered Shirt",
    image: "/upload/products/image 7.png",
    price: 180,
    rating: 4.5,
  },
  {
    title: "Sleeve Striped T-shirt",
    image: "/upload/products/image 8.png",
    price: 130,
    rating: 4.5,
  },
  {
    title: "Vertical Striped Shirt",
    image: "/upload/products/image 9.png",
    price: 212,
    rating: 5.0,
  },
  {
    title: "Courage Graphic T-shirt",
    image: "/upload/products/image 10.png",
    price: 145,
    rating: 4.0,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("MongoDB Connected for seeding...");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Old products removed.");

    // Insert seed data
    await Product.insertMany(seedProducts);
    console.log(`${seedProducts.length} products seeded successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();
