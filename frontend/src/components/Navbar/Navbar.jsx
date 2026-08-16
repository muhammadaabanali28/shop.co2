import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './navbar.css';
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiLogOut
} from "react-icons/fi";

function Navbar({ onChangePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNavClick = (pageName) => {
    setMenuOpen(false);
    if (onChangePage) {
      onChangePage(pageName);
    }
  };

  const handleUserClick = () => {
    if (user) {
      logout();
    } else {
      handleNavClick('login');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <>
              <span style={{ transform: 'rotate(45deg) translate(5px, 5.5px)' }} />
              <span style={{ opacity: 0 }} />
              <span style={{ transform: 'rotate(-45deg) translate(5px, -5.5px)' }} />
            </>
          ) : (
            <>
              <span />
              <span />
              <span />
            </>
          )}
        </button>

        <h1 className="logo" onClick={() => handleNavClick('home')}>SHOP.CO</h1>

        <ul className="nav-links">
          <li onClick={() => handleNavClick('casual')}>Shop ▼</li>
          <li onClick={() => handleNavClick('casual')}>On Sale</li>
          <li onClick={() => handleNavClick('casual')}>New Arrivals</li>
          <li onClick={() => handleNavClick('casual')}>Brands</li>
        </ul>
      </div>

      <div className="search-box">
        <FiSearch />
        <input
          type="text"
          placeholder="Search for products..."
        />
      </div>

      <div className="nav-icons">
        <FiSearch className="search-icon-mobile" />
        <FiShoppingCart />
        {user ? (
          <div className="user-menu" onClick={handleUserClick} title="Click to logout">
            <FiLogOut />
            <span className="user-name">{user.name?.split(' ')[0]}</span>
          </div>
        ) : (
          <FiUser onClick={handleUserClick} style={{ cursor: 'pointer' }} title="Log in" />
        )}
      </div>

      {menuOpen && (
        <div className="mobile-nav-menu">
          <ul>
            <li onClick={() => handleNavClick('casual')}>Shop ▼</li>
            <li onClick={() => handleNavClick('casual')}>On Sale</li>
            <li onClick={() => handleNavClick('casual')}>New Arrivals</li>
            <li onClick={() => handleNavClick('casual')}>Brands</li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
