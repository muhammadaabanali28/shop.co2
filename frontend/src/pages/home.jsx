import Navbar from "../components/Navbar/Navbar";
import heroImg from "../assets/images/herosection.png";
import NewArrivals from "../components/newArrivals/newArrivals";
import TopSelling from "../components/TopSelling/Topselling";
import Browse from "../components/Browse/Browse";
import Customers from "../components/Customers/Customers";
import Footer from "../components/Footer/Footer";
import "./css/home.css";

function Home({ onChangePage, onChangeSection, onProductClick, products = [] }) {
  const newArrivals = products.slice(0, 4);
  const topSelling = products.slice(4, 8);

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

      <Navbar onChangePage={onChangePage} onChangeSection={onChangeSection} />

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

          <button id="hebtn" onClick={() => onChangeSection('shop')}>Shop Now</button>

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

      <NewArrivals products={newArrivals} onProductClick={onProductClick} />
      <TopSelling products={topSelling} onProductClick={onProductClick} />
      <Browse onChangeSection={onChangeSection} />
      <Customers />
      <Footer onChangePage={onChangePage} onChangeSection={onChangeSection} />
    </>
  );
}

export default Home;