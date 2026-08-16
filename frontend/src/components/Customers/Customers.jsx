import "./Customers.css";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "\"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.\"",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    text: "\"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.\"",
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    text: "\"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.\"",
  },
];

function Customers() {
  return (
    <section className="customers-section">
      <div className="customers-header">
        <h2 className="customers-title">OUR HAPPY CUSTOMERS</h2>
        <div className="customers-arrows">
          <button className="arrow-btn" aria-label="Previous">←</button>
          <button className="arrow-btn" aria-label="Next">→</button>
        </div>
      </div>

      <div className="customers-track">
        {reviews.map((r) => (
          <div className="review-card" key={r.id}>
            <div className="review-stars">
              {"★".repeat(r.rating)}
            </div>
            <p className="review-name">
              {r.name} <span className="verified">✔</span>
            </p>
            <p className="review-text">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Customers;
