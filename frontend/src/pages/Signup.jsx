import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "./css/Login.css";

function Signup({ onChangePage }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    onChangePage("home");
    return null;
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(result.user, { displayName: name });
      }
      onChangePage("home");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      onChangePage("home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-visual">
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <h1>SHOP.CO</h1>
            <p>Discover your perfect look</p>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Create Account</h2>
              <p>Sign up and start shopping</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSignup} className="auth-form">
              <div className="auth-input-group">
                <FiUser className="auth-input-icon" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div className="auth-input-group">
                <FiLock className="auth-input-icon" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? (
                  <span className="auth-spinner" />
                ) : (
                  <>Create Account <FiArrowRight /></>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <button className="auth-google-btn" onClick={handleGoogleSignup}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" height="20" />
              Google
            </button>

            <p className="auth-switch">
              Already have an account?{" "}
              <span onClick={() => onChangePage("login")}>Log In</span>
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

export default Signup;
