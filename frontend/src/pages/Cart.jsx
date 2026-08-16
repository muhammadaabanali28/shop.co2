import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import "./css/Cart.css";

function Cart({ onChangePage, onChangeSection }) {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <Navbar onChangePage={onChangePage} onChangeSection={onChangeSection} />
        <div className="cart-empty-page">
          <FiShoppingBag className="cart-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Login to see your cart items</p>
          <button className="cart-login-btn" onClick={() => onChangePage("login")}>Log In</button>
          <button className="cart-back-btn" onClick={() => onChangePage("home")}>← Back to Home</button>
        </div>
        <Footer onChangePage={onChangePage} onChangeSection={onChangeSection} />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar onChangePage={onChangePage} onChangeSection={onChangeSection} />
        <div className="cart-empty-page">
          <FiShoppingBag className="cart-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet</p>
          <button className="cart-login-btn" onClick={() => onChangePage("home")}>Start Shopping</button>
        </div>
        <Footer onChangePage={onChangePage} onChangeSection={onChangeSection} />
      </>
    );
  }

  return (
    <>
      <Navbar onChangePage={onChangePage} onChangeSection={onChangeSection} />

      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart ({cartItems.length})</h1>
          <button className="cart-clear-btn" onClick={clearCart}>Clear Cart</button>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.cartId} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <div className="cart-item-details">
                    <span className="cart-item-size">Size: {item.size}</span>
                    <span className="cart-item-color">
                      Color: <span className="cart-color-dot" style={{ background: item.color }} />
                    </span>
                  </div>
                  <div className="cart-item-price">${item.price}</div>
                  <div className="cart-item-actions">
                    <div className="cart-quantity">
                      <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} disabled={item.quantity <= 1}>
                        <FiMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>
                        <FiPlus />
                      </button>
                    </div>
                    <span className="cart-item-subtotal">${item.price * item.quantity}</span>
                    <button className="cart-remove-btn" onClick={() => removeFromCart(item.cartId)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span className="cart-free">Free</span>
            </div>
            <div className="cart-summary-divider" />
            <div className="cart-summary-row cart-total">
              <span>Total</span>
              <span>${cartTotal}</span>
            </div>
            <button className="cart-checkout-btn">Proceed to Checkout</button>
            <button className="cart-continue-btn" onClick={() => onChangePage("home")}>← Continue Shopping</button>
          </div>
        </div>
      </div>

      <Footer onChangePage={onChangePage} onChangeSection={onChangeSection} />
    </>
  );
}

export default Cart;
