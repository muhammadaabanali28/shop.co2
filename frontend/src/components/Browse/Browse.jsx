import "./Browse.css";
import casual from "../../assets/browse/causual.png";
import formal from "../../assets/browse/formal.png";
import party from "../../assets/browse/party.png";
import gym from "../../assets/browse/gym.png";

const styles = [
  { id: 1, label: "Casual",  img: casual },
  { id: 2, label: "Formal",  img: formal },
  { id: 3, label: "Party",   img: party  },
  { id: 4, label: "Gym",     img: gym    },
];

function Browse({ onChangeSection }) {
  const handleClick = (label) => {
    if (onChangeSection) {
      onChangeSection('shop');
    }
  };

  return (
    <section className="browse-section">
      <div className="browse-inner">
        <h2 className="browse-title">BROWSE BY DRESS STYLE</h2>

        <div className="browse-grid">
          {styles.map((item) => (
            <div
              className="browse-card"
              key={item.id}
              onClick={() => handleClick(item.label)}
            >
              <span className="browse-label">{item.label}</span>
              <img src={item.img} alt={item.label} className="browse-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Browse;
