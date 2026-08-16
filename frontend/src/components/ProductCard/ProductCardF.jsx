import "./ProductCard.css";

function StarRating({ rating }) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(
        <span key={i} className="star">
          ★
        </span>
      );
    } else if (i === full && half) {
      stars.push(
        <span key={i} className="star">
          ⯨
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="star empty">
          ★
        </span>
      );
    }
  }

  return <div className="stars">{stars}</div>;
}

function ProductCard({ image, title, price, originalPrice, discount, rating, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <img
        className="product-card-img"
        src={image}
        alt={title}
      />

      <h3 className="product-card-title">{title}</h3>

      <div className="product-card-rating">
        <StarRating rating={rating} />

        <span className="rating-text">
          {rating}/5
        </span>
      </div>

      <div className="product-card-price">
        <span className="price-current">
          ${price}
        </span>
        {originalPrice && (
          <span className="price-original">
            ${originalPrice}
          </span>
        )}
        {discount && (
          <span className="price-discount">
            -{discount}%
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
