import "./Footer.css";

const links = {
  COMPANY:   ["About", "Features", "Works", "Career"],
  HELP:      ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  FAQ:       ["Account", "Manage Deliveries", "Orders", "Payments"],
  RESOURCES: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
};

function Footer({ onChangePage, onChangeSection }) {
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onChangePage) {
      onChangePage('home');
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (onChangeSection) {
      onChangeSection('shop');
    }
  };

  return (
    <footer className="footer">

      {/* ── Newsletter Banner ── */}
      <div className="newsletter-bar">
        <h2 className="newsletter-title">
          STAY UPTO DATE ABOUT<br />OUR LATEST OFFERS
        </h2>
        <div className="newsletter-form">
          <div className="newsletter-input-wrap">
            <span className="mail-icon">✉</span>
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
            />
          </div>
          <button className="newsletter-btn">Subscribe to Newsletter</button>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="footer-main">

        {/* Brand column */}
        <div className="footer-brand">
          <h3 className="footer-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>SHOP.CO</h3>
          <p className="footer-tagline">
            We have clothes that suits your style and which you're proud to wear.
            From women to men.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
            <a href="#" className="social-icon" aria-label="Facebook">f</a>
            <a href="#" className="social-icon" aria-label="Instagram">◎</a>
            <a href="#" className="social-icon" aria-label="Github">⌥</a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([heading, items]) => (
          <div className="footer-col" key={heading}>
            <h4 className="footer-col-title">{heading}</h4>
            <ul className="footer-links">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="footer-link" onClick={handleLinkClick}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <p className="footer-copy">Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="payment-icons">
          <span className="pay-badge">VISA</span>
          <span className="pay-badge">MC</span>
          <span className="pay-badge">PayPal</span>
          <span className="pay-badge">Pay</span>
          <span className="pay-badge">G Pay</span>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
