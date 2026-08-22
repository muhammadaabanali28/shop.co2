import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FiMapPin, FiCreditCard, FiTruck, FiCheckCircle, FiHome, FiMail, FiPhone, FiUser } from "react-icons/fi";
import "./css/Checkout.css";

function Checkout({ onChangePage, onChangeSection }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState({});

  if (!user) {
    return (
      <>
        <Navbar onChangePage={onChangePage} onChangeSection={onChangeSection} />
        <div className="cart-empty-page">
          <FiTruck className="cart-empty-icon" />
          <h2>Please login first</h2>
          <p>You need to login to proceed with checkout</p>
          <button className="cart-login-btn" onClick={() => onChangePage("login")}>Log In</button>
          <button className="cart-back-btn" onClick={() => onChangePage("home")}>&larr; Back to Home</button>
        </div>
        <Footer onChangePage={onChangePage} onChangeSection={onChangeSection} />
      </>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <>
        <Navbar onChangePage={onChangePage} onChangeSection={onChangeSection} />
        <div className="cart-empty-page">
          <FiTruck className="cart-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some items before checking out</p>
          <button className="cart-login-btn" onClick={() => onChangePage("home")}>Start Shopping</button>
        </div>
        <Footer onChangePage={onChangePage} onChangeSection={onChangeSection} />
      </>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (form.phone.trim().length < 10) newErrors.phone = "Phone must be at least 10 digits";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await clearCart();
      setOrderPlaced(true);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <>
        <Navbar onChangePage={onChangePage} onChangeSection={onChangeSection} />
        <div className="order-success">
          <FiCheckCircle className="order-success-icon" />
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order. We will send you a confirmation email shortly.</p>
          <p className="order-id">Order ID: #ORD-{Date.now().toString().slice(-8)}</p>
          <button className="order-success-btn" onClick={() => onChangePage("home")}>Continue Shopping</button>
        </div>
        <Footer onChangePage={onChangePage} onChangeSection={onChangeSection} />
      </>
    );
  }

  const shippingCost = cartTotal > 100 ? 0 : 10;
  const total = cartTotal + shippingCost;

  return (
    <>
      <Navbar onChangePage={onChangePage} onChangeSection={onChangeSection} />

      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Shipping Address */}
            <div className="checkout-section">
              <h2><FiMapPin className="checkout-section-icon" /> Shipping Address</h2>

              <div className="checkout-row">
                <div className="checkout-field">
                  <label>First Name</label>
                  <div className="checkout-input-group">
                    <FiUser className="checkout-input-icon" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.firstName && <span className="checkout-error">{errors.firstName}</span>}
                </div>

                <div className="checkout-field">
                  <label>Last Name</label>
                  <div className="checkout-input-group">
                    <FiUser className="checkout-input-icon" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.lastName && <span className="checkout-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="checkout-row">
                <div className="checkout-field">
                  <label>Email</label>
                  <div className="checkout-input-group">
                    <FiMail className="checkout-input-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <span className="checkout-error">{errors.email}</span>}
                </div>

                <div className="checkout-field">
                  <label>Phone</label>
                  <div className="checkout-input-group">
                    <FiPhone className="checkout-input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+92 300 1234567"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phone && <span className="checkout-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="checkout-field">
                <label>Street Address</label>
                <div className="checkout-input-group">
                  <FiHome className="checkout-input-icon" />
                  <input
                    type="text"
                    name="address"
                    placeholder="123 Main Street, Apt 4B"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
                {errors.address && <span className="checkout-error">{errors.address}</span>}
              </div>

              <div className="checkout-row">
                <div className="checkout-field">
                  <label>City</label>
                  <div className="checkout-input-group">
                    <FiMapPin className="checkout-input-icon" />
                    <input
                      type="text"
                      name="city"
                      placeholder="Lahore"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.city && <span className="checkout-error">{errors.city}</span>}
                </div>

                <div className="checkout-field">
                  <label>Postal Code</label>
                  <div className="checkout-input-group">
                    <FiMapPin className="checkout-input-icon" />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="54000"
                      value={form.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.postalCode && <span className="checkout-error">{errors.postalCode}</span>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="checkout-section">
              <h2><FiCreditCard className="checkout-section-icon" /> Payment Method</h2>

              <div className="payment-options">
                <label className={`payment-option ${form.paymentMethod === "cod" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === "cod"}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <FiTruck className="payment-option-icon" />
                    <div>
                      <h4>Cash on Delivery</h4>
                      <p>Pay when you receive your order</p>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${form.paymentMethod === "card" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={form.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <FiCreditCard className="payment-option-icon" />
                    <div>
                      <h4>Credit / Debit Card</h4>
                      <p>Visa, Mastercard, etc.</p>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${form.paymentMethod === "bank" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={form.paymentMethod === "bank"}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <FiHome className="payment-option-icon" />
                    <div>
                      <h4>Bank Transfer</h4>
                      <p>Direct bank transfer</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {errors.submit && <div className="checkout-submit-error">{errors.submit}</div>}

            <button type="submit" className="checkout-place-order-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="checkout-spinner" /> Processing...
                </>
              ) : (
                <>
                  <FiCheckCircle /> Place Order &mdash; ${total.toFixed(2)}
                </>
              )}
            </button>

            <button type="button" className="checkout-back-btn" onClick={() => onChangePage("cart")}>
              &larr; Back to Cart
            </button>
          </form>

          {/* Order Summary */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-summary-items">
              {cartItems.map((item, idx) => (
                <div key={idx} className="checkout-summary-item">
                  <div className="checkout-summary-item-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="checkout-summary-item-info">
                    <h4>{item.title}</h4>
                    <p>Size: {item.size} | Qty: {item.quantity}</p>
                  </div>
                  <span className="checkout-summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span className={shippingCost === 0 ? "checkout-free" : ""}>
                {shippingCost === 0 ? "Free" : `$${shippingCost}`}
              </span>
            </div>
            {shippingCost > 0 && (
              <p className="checkout-free-shipping-note">Free shipping on orders over $100</p>
            )}
            <div className="checkout-summary-divider" />
            <div className="checkout-summary-row checkout-total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer onChangePage={onChangePage} onChangeSection={onChangeSection} />
    </>
  );
}

export default Checkout;
