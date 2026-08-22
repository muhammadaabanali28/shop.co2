import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          return { _id: payload.id, name: "User", email: "user@email.com" };
        }
      } catch {}
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const verifyAuth = async () => {
    if (checked) return;
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      try {
        const data = await api.getMe();
        setUser(data);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
        setChecked(true);
      }
    } else {
      setChecked(true);
    }
  };

  const login = async (email, password) => {
    const data = await api.login(email, password);
    localStorage.setItem("token", data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api.register(name, email, password);
    localStorage.setItem("token", data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
