import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import heroImg from "../assets/images/herosection.png";
import NewArrivals from "../components/newArrivals/newArrivals";
import TopSelling from "../components/TopSelling/Topselling";
import Browse from "../components/Browse/Browse";
import Customers from "../components/Customers/Customers";
import Footer from "../components/Footer/Footer";

// Fallback images (used when server is down)
import img7 from "../assets/newarrivals/image 7.png";
import img8 from "../assets/newarrivals/image 8.png";
import img9 from "../assets/newarrivals/image 9.png";
import img10 from "../assets/newarrivals/image 10.png";
import selling from "../assets/topselling/selling.png";
import selling1 from "../assets/topselling/selling1.png";
import selling2 from "../assets/topselling/selling2.png";
import selling3 from "../assets/topselling/selling3.png";
import "./css/home.css";

// Fallback data — only used if server API fails
const fallbackNewArrivals = [
  { _id: "1", image: img7,  title: "Gradient Graphic T-shirt", price: 145, rating: 3.5 },
  { _id: "2", image: img8,  title: "Polo with Tipping Details", price: 180, rating: 4.5 },
  { _id: "3", image: img9,  title: "Black Striped T-shirt",     price: 120, rating: 5.0 },
  { _id: "4", image: img10, title: "Skinny Fit Jeans",          price: 240, rating: 4.5 },
];

const fallbackTopSelling = [
  { _id: "t1", image: selling,  title: "Vertical Striped Shirt",   price: 212, originalPrice: 232, discount: 20, rating: 5.0 },
  { _id: "t2", image: selling1, title: "Courage Graphic T-shirt",  price: 145, rating: 4.0 },
  { _id: "t3", image: selling2, title: "Loose Fit Bermuda Shorts", price: 80,  rating: 3.0 },
  { _id: "t4", image: selling3, title: "Faded Skinny Jeans",       price: 210, rating: 4.5 },
];

const API_BASE = "http://localhost:5000/api";
const IMG_BASE = "http://localhost:5000";

function Home({ onChangePage }) {
  const [newArrivals, setNewArrivals] = useState(fallbackNewArrivals);
  const [topSelling, setTopSelling] = useState(fallbackTopSelling);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error("Server error");

        const data = await res.json();

        if (data.length > 0) {
          const withFullUrls = data.map((p) => ({
            ...p,
            image: p.image.startsWith("/upload") ? `${IMG_BASE}${p.image}` : p.image,
          }));
          // First 4 products → New Arrivals, next 4 → Top Selling
          setNewArrivals(withFullUrls.slice(0, 4));
          setTopSelling(withFullUrls.slice(4, 8));
        }
      } catch (err) {
        console.log("Server not available, using fallback data:", err.message);
        // Fallback data already set as default state
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="top-header">
        <span>
          Sign up and get 20% off on your first order.&nbsp;
          <a className="top-header-link" href="#" onClick={(e) => { e.preventDefault(); onChangePage('signup'); }}>
            Sign Up Now →
          </a>
        </span>
      </div>

      <Navbar onChangePage={onChangePage} />

      <section id="hero">
        <div className="hero-content">
          <h1>
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </h1>

          <p>
            Browse through our diverse range of meticulously crafted garments
            designed
            <br />
            to bring out your individuality.
          </p>

          <button id="hebtn" onClick={() => onChangePage('casual')}>Shop Now</button>

          <div className="stats">
            <div>
              <h2>200+</h2>
              <p>International Brands</p>
            </div>

            <div>
              <h2>2,000+</h2>
              <p>High-Quality Products</p>
            </div>

            <div>
              <h2>30,000+</h2>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="clothesbrand" id="heroimage" />
        </div>
      </section>

      <div className="brands-bar">
        <span className="brand-name brand-versace">VERSACE</span>
        <span className="brand-name brand-zara">ZARA</span>
        <span className="brand-name brand-gucci">GUCCI</span>
        <span className="brand-name brand-prada">PRADA</span>
        <span className="brand-name brand-ck">Calvin Klein</span>
      </div>

      <NewArrivals products={newArrivals} />
      <TopSelling products={topSelling} />
      <Browse onChangePage={onChangePage} />
      <Customers />
      <Footer onChangePage={onChangePage} />
    </>
  );
}

export default Home;