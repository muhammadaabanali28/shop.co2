import ProductCard from "../ProductCard/ProductCardF";

function TopSelling({ products, onProductClick }) {
  return (
    <section className="new-arrivals-section">
      <h2>TOP SELLING</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            image={product.image}
            title={product.title}
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            rating={product.rating || 4.5}
            onClick={() => onProductClick && onProductClick(product, products)}
          />
        ))}
      </div>

      <button className="view-all-btn">View All</button>
    </section>
  );
}

export default TopSelling;
