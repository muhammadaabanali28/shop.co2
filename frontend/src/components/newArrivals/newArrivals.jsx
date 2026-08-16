import ProductCard from "../ProductCard/ProductCardF";

function NewArrivals({ products, onProductClick }) {
  return (
    <section className="new-arrivals-section">
      <h2>NEW ARRIVALS</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating || 4.5}
            onClick={() => onProductClick && onProductClick(product, products)}
          />
        ))}
      </div>

      <button className="view-all-btn">View All</button>
    </section>
  );
}

export default NewArrivals;
