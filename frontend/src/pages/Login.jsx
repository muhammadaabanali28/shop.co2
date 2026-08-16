import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "./css/Login.css";

function Login({ onChangePage }) {
  const { user } = useAuth();
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
      await signInWithEmailAndPassword(auth, email, password);
      onChangePage("home");
    } catch (err) {
      setError(err.code === "auth/invalid-credential" ? "Invalid email or password" : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Log in to your account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleEmailLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <button className="auth-google-btn" onClick={handleGoogleLogin}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" height="20" />
          Continue with Google
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <span onClick={() => onChangePage("signup")}>Sign Up</span>
        </p>

        <button className="auth-back" onClick={() => onChangePage("home")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default Login;
