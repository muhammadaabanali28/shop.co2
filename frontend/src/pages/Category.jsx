import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './css/category.css';
import { FiSliders, FiChevronRight, FiCheck } from 'react-icons/fi';

const initialProducts = [
  { id: 1, name: "Gradient Graphic T-shirt", category: "T-shirts", price: 145, rating: 3.5, color: "white", size: "Large", style: "Casual", isNew: true, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=500" },
  { id: 2, name: "Polo with Tipping Details", category: "T-shirts", price: 180, rating: 4.5, color: "red", size: "Medium", style: "Casual", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=500" },
  { id: 3, name: "Black Striped T-shirt", category: "T-shirts", price: 120, originalPrice: 150, discount: 20, rating: 5.0, color: "black", size: "Small", style: "Casual", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=500" },
  { id: 4, name: "Skinny Fit Jeans", category: "Jeans", price: 240, originalPrice: 260, discount: 20, rating: 3.5, color: "blue", size: "Large", style: "Casual", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=500" },
  { id: 5, name: "Checkered Shirt", category: "T-shirts", price: 180, rating: 4.5, color: "red", size: "X-Large", style: "Formal", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=500" },
  { id: 6, name: "Sleeve Striped T-shirt", category: "T-shirts", price: 130, originalPrice: 160, discount: 20, rating: 4.5, color: "orange", size: "XX-Large", style: "Casual", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=500" },
  { id: 7, name: "Vertical Striped Shirt", category: "T-shirts", price: 212, originalPrice: 232, discount: 20, rating: 5.0, color: "green", size: "Medium", style: "Casual", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=500" },
  { id: 8, name: "Courage Graphic T-shirt", category: "T-shirts", price: 145, rating: 4.0, color: "orange", size: "Large", style: "Casual", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=500" },
  { id: 9, name: "Loose Fit Bermuda Shorts", category: "Shorts", price: 80, rating: 3.0, color: "blue", size: "Medium", style: "Casual", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=500" },
  { id: 10, name: "Faded Skinny Jeans", category: "Jeans", price: 210, rating: 4.5, color: "blue", size: "Medium", style: "Casual", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=500" },
  { id: 11, name: "Classic Summer Shorts", category: "Shorts", price: 95, rating: 4.0, color: "yellow", size: "Small", style: "Casual", image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=500" },
  { id: 12, name: "Gym Running Hoodie", category: "Hoodies", price: 175, rating: 4.8, color: "purple", size: "Medium", style: "Gym", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500" },
  { id: 13, name: "Denim Ripped Skirts", category: "Skirts", price: 130, rating: 4.2, color: "blue", size: "Small", style: "Party", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=500" },
  { id: 14, name: "Party Velvet Skirt", category: "Skirts", price: 195, rating: 4.7, color: "pink", size: "Medium", style: "Party", image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&q=80&w=500" },
  { id: 15, name: "Warm Fleece Hoodie", category: "Hoodies", price: 160, rating: 4.5, color: "cyan", size: "Large", style: "Casual", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=500" },
  { id: 16, name: "Breathable Workout Tee", category: "T-shirts", price: 70, rating: 4.1, color: "green", size: "Medium", style: "Gym", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=500" },
  { id: 17, name: "Formal Executive Shirt", category: "T-shirts", price: 220, rating: 4.9, color: "white", size: "Large", style: "Formal", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=500" },
  { id: 18, name: "Urban Street Joggers", category: "Jeans", price: 110, rating: 3.9, color: "black", size: "Large", style: "Casual", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=500" },
  { id: 19, name: "Nightlife Party Dress", category: "Skirts", price: 250, rating: 5.0, color: "black", size: "Small", style: "Party", image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&q=80&w=500" },
  { id: 20, name: "Activewear Training Hoodie", category: "Hoodies", price: 150, rating: 4.3, color: "black", size: "Large", style: "Gym", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=500" }
];

const colorMap = {
  green: "#27ae60",
  red: "#eb5757",
  yellow: "#f2c94c",
  orange: "#f2994a",
  cyan: "#56ccf2",
  blue: "#2f80ed",
  purple: "#9b51e0",
  pink: "#ec4899",
  white: "#ffffff",
  black: "#111111"
};

const sizesList = [
  "XX-Small", "X-Small", "Small", "Medium",
  "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"
];

// Helper to render inline SVG icon representing different garments
function GarmentIcon({ type }) {
  const normalized = type ? type.toLowerCase() : "";
  if (normalized.includes("shirt")) {
    return (
      <svg className="garment-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.38 3.46L16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2L3.62 3.46a1 1 0 0 0-1.34.45l-1 2a1 1 0 0 0 .44 1.35L5 10v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10l3.28-2.74a1 1 0 0 0 .44-1.35l-1-2a1 1 0 0 0-1.34-.45z" />
      </svg>
    );
  }
  if (normalized.includes("jean") || normalized.includes("pant")) {
    return (
      <svg className="garment-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 2v20h5l1-10 1 10h5V2H4zm0 3h11M4 8h11" />
      </svg>
    );
  }
  if (normalized.includes("hoodie")) {
    return (
      <svg className="garment-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a5 5 0 0 0-5 5v2H5v13h14V9h-2V7a5 5 0 0 0-5-5zM9 9V7a3 3 0 0 1 6 0v2H9z" />
      </svg>
    );
  }
  if (normalized.includes("short")) {
    return (
      <svg className="garment-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 2v12l4 4 4-4 4 4 4-4V2H4z" />
      </svg>
    );
  }
  // Skirt
  return (
    <svg className="garment-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3h12l3 16H3L6 3z" />
    </svg>
  );
}

function StarRating({ rating }) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(<span key={i} className="star">★</span>);
    } else if (i === full && half) {
      stars.push(<span key={i} className="star">⯨</span>);
    } else {
      stars.push(<span key={i} className="star empty">★</span>);
    }
  }

  return <div className="stars">{stars}</div>;
}

function Category({ onChangePage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceMax, setPriceMax] = useState(250);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [currentPage, setCurrentPage] = useState(1);

  // Clear all filters
  const resetFilters = () => {
    setSelectedCategory("");
    setPriceMax(250);
    setSelectedColor("");
    setSelectedSize("");
    setSelectedStyle("");
    setCurrentPage(1);
  };

  // Filtered and Sorted Products List
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (priceMax) {
      result = result.filter(p => p.price <= priceMax);
    }
    if (selectedColor) {
      result = result.filter(p => p.color === selectedColor);
    }
    if (selectedSize) {
      result = result.filter(p => p.size === selectedSize);
    }
    if (selectedStyle) {
      result = result.filter(p => p.style === selectedStyle);
    }

    // Sort
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Customer Rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: Most Popular
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [selectedCategory, priceMax, selectedColor, selectedSize, selectedStyle, sortBy]);

  // Pagination Logic
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      setCurrentPage(pageNo);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar onChangePage={onChangePage} />

      <main className="category-container">
        {/* Breadcrumb */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <span className="crumb" onClick={() => onChangePage('home')}>Home</span>
          <FiChevronRight className="crumb-arrow" />
          <span className="crumb active">Casual</span>
        </nav>

        {/* Outer Split Layout */}
        <div className="layout-split">

          {/* Left Sidebar Filters */}
          <aside className={`sidebar-filters ${sidebarOpen ? "active" : ""}`}>
            <div className="sidebar-header">
              <h3>Filters</h3>
              <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>×</button>
              <button className="reset-btn" onClick={resetFilters}>Reset</button>
            </div>

            {/* Categories */}
            <div className="filter-group">
              <ul className="filter-list">
                {["T-shirts", "Jeans", "Shorts", "Skirts", "Hoodies"].map((cat) => (
                  <li
                    key={cat}
                    className={selectedCategory === cat ? "active" : ""}
                    onClick={() => { setSelectedCategory(selectedCategory === cat ? "" : cat); setCurrentPage(1); }}
                  >
                    <span>{cat}</span>
                    <FiChevronRight className="chevron" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Price slider */}
            <div className="filter-group">
              <h4>Price</h4>
              <div className="price-slider-wrap">
                <input
                  type="range"
                  min="50"
                  max="250"
                  value={priceMax}
                  onChange={(e) => { setPriceMax(Number(e.target.value)); setCurrentPage(1); }}
                  className="range-slider"
                />
                <div className="price-labels">
                  <span>$50</span>
                  <span>Max: ${priceMax}</span>
                </div>
              </div>
            </div>

            {/* Colors selection */}
            <div className="filter-group">
              <h4>Colors</h4>
              <div className="colors-grid">
                {Object.entries(colorMap).map(([name, hex]) => (
                  <button
                    key={name}
                    className={`color-btn ${selectedColor === name ? "active" : ""} ${name === "white" ? "border-color" : ""}`}
                    style={{ backgroundColor: hex }}
                    onClick={() => { setSelectedColor(selectedColor === name ? "" : name); setCurrentPage(1); }}
                    aria-label={`Filter by ${name}`}
                  >
                    {selectedColor === name && (
                      <FiCheck className="check-icon" style={{ color: name === "white" ? "#111" : "#fff" }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="filter-group">
              <h4>Size</h4>
              <div className="sizes-grid">
                {sizesList.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => { setSelectedSize(selectedSize === size ? "" : size); setCurrentPage(1); }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Dress Style */}
            <div className="filter-group">
              <h4>Dress Style</h4>
              <ul className="filter-list">
                {["Casual", "Formal", "Party", "Gym"].map((style) => (
                  <li
                    key={style}
                    className={selectedStyle === style ? "active" : ""}
                    onClick={() => { setSelectedStyle(selectedStyle === style ? "" : style); setCurrentPage(1); }}
                  >
                    <span>{style}</span>
                    <FiChevronRight className="chevron" />
                  </li>
                ))}
              </ul>
            </div>

            <button className="apply-filter-btn" onClick={() => setSidebarOpen(false)}>
              Apply Filter
            </button>
          </aside>

          {/* Overlay for mobile sidebar */}
          {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

          {/* Right Product Grid Column */}
          <section className="product-results">
            {/* Header section with category name and sorting controls */}
            <div className="results-header">
              <div className="title-area">
                <h2>Casual</h2>
                <span className="results-count">
                  Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Products
                </span>
              </div>

              <div className="sort-controls">
                <button className="mobile-filter-toggle" onClick={() => setSidebarOpen(true)}>
                  <FiSliders />
                </button>

                <div className="sort-by-wrap">
                  <label htmlFor="sort-select">Sort by:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option>Most Popular</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Customer Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid display */}
            {currentProducts.length > 0 ? (
              <div className="category-products-grid">
                {currentProducts.map((p) => (
                  <div className="category-product-card" key={p.id}>
                    {/* Placeholder image representation with subtle CSS shapes */}
                    <div className="category-product-placeholder">
                      <GarmentIcon type={p.category} />
                      {p.isNew && <span className="new-badge">NEW</span>}
                    </div>

                    <h3 className="category-product-title">{p.name}</h3>

                    <div className="category-product-rating">
                      <StarRating rating={p.rating} />
                      <span className="rating-text">{p.rating}/5</span>
                    </div>

                    <div className="category-product-price">
                      <span className="price-current">${p.price}</span>
                      {p.originalPrice && (
                        <>
                          <span className="price-original">${p.originalPrice}</span>
                          <span className="price-discount">-{p.discount}%</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-products-msg">
                <p>No products found matching your filters.</p>
                <button className="reset-btn-large" onClick={resetFilters}>Clear All Filters</button>
              </div>
            )}

            {/* Pagination Controls */}
            {filteredProducts.length > itemsPerPage && (
              <nav className="pagination" aria-label="Pagination">
                <button
                  className="page-prev-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`page-num-btn ${currentPage === pageNum ? "active" : ""}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  className="page-next-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </nav>
            )}
          </section>

        </div>
      </main>

      <Footer onChangePage={onChangePage} />
    </>
  );
}

export default Category;
