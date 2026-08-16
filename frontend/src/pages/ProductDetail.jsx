import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FiStar, FiHeart, FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";
import "./css/ProductDetail.css";

const sampleReviews = [
  { id: 1, name: "Sarah M.", rating: 5, date: "August 15, 2026", text: "I'm obsessed with this t-shirt! The fabric is incredibly soft and the fit is perfect. I've washed it multiple times and it still looks brand new. Definitely ordering more colors." },
  { id: 2, name: "Alex K.", rating: 4, date: "August 12, 2026", text: "Great quality for the price. The design is exactly as shown in the pictures. Only giving 4 stars because shipping took a bit longer than expected, but the product itself is amazing." },
  { id: 3, name: "James L.", rating: 5, date: "August 10, 2026", text: "This is my third purchase from SHOP.CO and they never disappoint. The material feels premium and the graphic print is high quality. Highly recommend!" },
  { id: 4, name: "Mike R.", rating: 4, date: "August 8, 2026", text: "Really comfortable everyday shirt. The sizing chart was accurate - I ordered my usual size and it fits perfectly. Would love to see more color options." },
];

function StarRating({ rating, size = 16 }) {
  return (
    <div className="stars" style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <FiStar key={i} className={i <= rating ? "star-filled" : "star-empty"} fill={i <= rating ? "#ffc633" : "none"} stroke={i <= rating ? "#ffc633" : "#ddd"} />
      ))}
    </div>
  );
}

function ProductDetail({ product, onChangePage, onChangeSection, allProducts = [] }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const productName = product.title || product.name || "Product";
  const productId = product._id || product.id;

  const colors = ["#4a4a4a", "#1a1a2e", "#8b7355", "#c4a882"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  const images = [product.image, product.image, product.image, product.image];

  const relatedProducts = allProducts
    .filter((p) => (p._id || p.id) !== productId)
    .slice(0, 4);

  return (
    <>
      <Navbar onChangePage={onChangePage} />

      <div className="pd-container">
        <div className="pd-breadcrumb">
          <span onClick={() => onChangePage("home")} className="pd-breadcrumb-link">Home</span>
          <span className="pd-breadcrumb-sep">/</span>
          <span onClick={() => onChangeSection("shop")} className="pd-breadcrumb-link">Shop</span>
          <span className="pd-breadcrumb-sep">/</span>
          <span className="pd-breadcrumb-current">{productName}</span>
        </div>

        <div className="pd-main">
          <div className="pd-gallery">
            <div className="pd-thumbnails">
              {images.map((img, i) => (
                <div key={i} className={`pd-thumb ${i === selectedImage ? "active" : ""}`} onClick={() => setSelectedImage(i)}>
                  <img src={img} alt={`${productName} ${i + 1}`} />
                </div>
              ))}
            </div>
            <div className="pd-main-image">
              <img src={images[selectedImage]} alt={productName} />
            </div>
          </div>

          <div className="pd-info">
            <h1 className="pd-title">{productName}</h1>

            <div className="pd-rating-row">
              <StarRating rating={Math.round(product.rating || 4)} size={18} />
              <span className="pd-rating-text">{product.rating || 4.5}/5</span>
            </div>

            <div className="pd-price-row">
              <span className="pd-price">${product.price}</span>
              {product.originalPrice && (
                <span className="pd-original-price">${product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="pd-discount-badge">-{product.discount}%</span>
              )}
            </div>

            <p className="pd-description">
              This stylish t-shirt is crafted from premium cotton for ultimate comfort.
              Features a modern graphic design that makes a statement. Perfect for casual
              outings or lounging at home.
            </p>

            <div className="pd-section">
              <h3 className="pd-section-title">Select Colors</h3>
              <div className="pd-colors">
                {colors.map((color, i) => (
                  <button key={i} className={`pd-color-btn ${i === selectedColor ? "active" : ""}`} onClick={() => setSelectedColor(i)}>
                    <span className="pd-color-dot" style={{ background: color }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="pd-section">
              <h3 className="pd-section-title">Choose Size</h3>
              <div className="pd-sizes">
                {sizes.map((size, i) => (
                  <button key={size} className={`pd-size-btn ${i === selectedSize ? "active" : ""}`} onClick={() => setSelectedSize(i)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pd-actions">
              <div className="pd-quantity">
                <button className="pd-qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span className="pd-qty-value">{quantity}</span>
                <button className="pd-qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button
                className="pd-add-cart"
                onClick={async () => {
                  if (!user) {
                    onChangePage("login");
                    return;
                  }
                  const success = await addToCart(product, quantity, selectedColor, selectedSize);
                  if (success) {
                    setAddedToCart(true);
                    setTimeout(() => setAddedToCart(false), 2000);
                  }
                }}
              >
                {addedToCart ? "✓ Added!" : "Add to Cart"}
              </button>
              <button className={`pd-heart-btn ${liked ? "liked" : ""}`} onClick={() => setLiked(!liked)}>
                <FiHeart fill={liked ? "#e53e3e" : "none"} stroke={liked ? "#e53e3e" : "#111"} />
              </button>
            </div>

            <button
              className="pd-buy-now"
              onClick={async () => {
                if (!user) {
                  onChangePage("login");
                  return;
                }
                await addToCart(product, quantity, selectedColor, selectedSize);
                onChangePage("cart");
              }}
            >
              Buy Now
            </button>

            <div className="pd-features">
              <div className="pd-feature">
                <FiTruck />
                <div>
                  <strong>Free Delivery</strong>
                  <span>Enter your postal code for delivery availability</span>
                </div>
              </div>
              <div className="pd-feature">
                <FiRefreshCw />
                <div>
                  <strong>Return Delivery</strong>
                  <span>Free 30 days delivery returns</span>
                </div>
              </div>
              <div className="pd-feature">
                <FiShield />
                <div>
                  <strong>2 Year Warranty</strong>
                  <span>Manufacturer warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pd-tabs">
          <div className="pd-tab-header">
            <button className={`pd-tab-btn ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>
              Product Details
            </button>
            <button className={`pd-tab-btn ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>
              Rating & Reviews ({sampleReviews.length})
            </button>
          </div>

          {activeTab === "details" && (
            <div className="pd-tab-content">
              <p>This premium t-shirt is designed for those who appreciate both style and comfort. Made from 100% organic cotton, it features a breathable fabric that keeps you cool throughout the day.</p>
              <ul className="pd-detail-list">
                <li>Premium 100% organic cotton</li>
                <li>Regular fit with crew neck</li>
                <li>Machine washable at 30 degrees</li>
                <li>Graphic print with high-quality ink</li>
                <li>Reinforced stitching for durability</li>
                <li>Pre-shrunk fabric</li>
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="pd-tab-content">
              <div className="pd-reviews-header">
                <h3>All Reviews ({sampleReviews.length})</h3>
                <button className="pd-write-review-btn">Write a Review</button>
              </div>
              <div className="pd-reviews-list">
                {sampleReviews.map((review) => (
                  <div key={review.id} className="pd-review-card">
                    <div className="pd-review-top">
                      <div className="pd-review-avatar">{review.name[0]}</div>
                      <div className="pd-review-info">
                        <h4>{review.name}</h4>
                        <StarRating rating={review.rating} size={14} />
                      </div>
                    </div>
                    <p className="pd-review-text">{review.text}</p>
                    <span className="pd-review-date">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {relatedProducts.length > 0 && (
          <div className="pd-related">
            <h2 className="pd-related-title">YOU MIGHT ALSO LIKE</h2>
            <div className="pd-related-grid">
              {relatedProducts.map((p) => (
                <div
                  key={p._id || p.id}
                  className="pd-related-card"
                  onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  <img src={p.image} alt={p.title || p.name} />
                  <h4>{p.title || p.name}</h4>
                  <StarRating rating={Math.round(p.rating || 4)} size={12} />
                  <span className="pd-related-price">${p.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer onChangePage={onChangePage} onChangeSection={onChangeSection} />
    </>
  );
}

export default ProductDetail;
