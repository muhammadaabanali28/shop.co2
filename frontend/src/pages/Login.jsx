import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "./css/Login.css";

function Login({ onChangePage }) {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    onChangePage("home");
    return null;
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      onChangePage("home");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-visual">
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <h1>SHOP.CO</h1>
            <p>Find clothes that match your style</p>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Log in to continue shopping</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleEmailLogin} className="auth-form">
              <div className="auth-input-group">
                <FiMail className="auth-input-icon" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-input-group">
                <FiLock className="auth-input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? (
                  <span className="auth-spinner" />
                ) : (
                  <>Log In <FiArrowRight /></>
                )}
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?{" "}
              <span onClick={() => onChangePage("signup")}>Sign Up</span>
            </p>

            <button className="auth-back" onClick={() => onChangePage("home")}>
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
