import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './navbar.css';
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiChevronDown
} from "react-icons/fi";

function Navbar({ onChangePage, onChangeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (pageName) => {
    setMenuOpen(false);
    const sections = ['shop', 'sale', 'arrivals', 'brands'];
    if (sections.includes(pageName) && onChangeSection) {
      onChangeSection(pageName);
    } else if (onChangePage) {
      onChangePage(pageName);
    }
  };

  const handleLogout = async () => {
    setUserDropdown(false);
    await logout();
    handleNavClick('home');
  };

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";

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
          <li onClick={() => handleNavClick('shop')}>Shop</li>
          <li onClick={() => handleNavClick('sale')}>On Sale</li>
          <li onClick={() => handleNavClick('arrivals')}>New Arrivals</li>
          <li onClick={() => handleNavClick('brands')}>Brands</li>
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
        <div className="nav-cart-icon" onClick={() => handleNavClick('cart')} title="Cart">
          <FiShoppingCart />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
        {user ? (
          <div className="user-dropdown" ref={dropdownRef}>
            <button className="user-trigger" onClick={() => setUserDropdown(!userDropdown)}>
              <div className="user-avatar">{userInitial}</div>
              <span className="user-name">{user.name?.split(' ')[0] || user.email?.split('@')[0]}</span>
              <FiChevronDown className={`dropdown-arrow ${userDropdown ? "open" : ""}`} />
            </button>

            {userDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-user-info">
                  <div className="dropdown-avatar">{userInitial}</div>
                  <div>
                    <div className="dropdown-name">{user.name || "User"}</div>
                    <div className="dropdown-email">{user.email}</div>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <button className="dropdown-item" onClick={() => { setUserDropdown(false); handleNavClick('cart'); }}>
                  <FiShoppingCart />
                  My Cart ({cartCount})
                </button>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <FiLogOut />
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <FiUser onClick={() => handleNavClick('login')} style={{ cursor: 'pointer' }} title="Log in" />
        )}
      </div>

      {menuOpen && (
        <div className="mobile-nav-menu">
          <ul>
            <li onClick={() => handleNavClick('shop')}>Shop</li>
            <li onClick={() => handleNavClick('sale')}>On Sale</li>
            <li onClick={() => handleNavClick('arrivals')}>New Arrivals</li>
            <li onClick={() => handleNavClick('brands')}>Brands</li>
            {user ? (
              <>
                <li className="mobile-user-info">
                  <div className="user-avatar">{userInitial}</div>
                  <span>{user.name || user.email}</span>
                </li>
                <li onClick={() => handleNavClick('cart')}>
                  <FiShoppingCart /> Cart ({cartCount})
                </li>
                <li className="mobile-logout" onClick={handleLogout}>
                  <FiLogOut /> Log Out
                </li>
              </>
            ) : (
              <li onClick={() => handleNavClick('login')}>Log In / Sign Up</li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
