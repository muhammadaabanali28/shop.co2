import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }

    api
      .getCart()
      .then((data) => setCartItems(data))
      .catch(() => setCartItems([]));
  }, [user]);

  const addToCart = async (product, quantity = 1, selectedColor = 0, selectedSize = 1) => {
    if (!user) return false;

    const colors = ["#4a4a4a", "#1a1a2e", "#8b7355", "#c4a882"];
    const sizes = ["XS", "S", "M", "L", "XL"];
    const productName = product.title || product.name || "Product";
    const productId = product._id || product.id;

    const updatedCart = await api.addToCart({
      productId,
      title: productName,
      image: product.image,
      price: product.price,
      quantity,
      color: colors[selectedColor],
      size: sizes[selectedSize],
    });

    setCartItems(updatedCart);
    return true;
  };

  const updateQuantity = async (index, quantity) => {
    if (!user || quantity < 1) return;
    const updatedCart = await api.updateCartItem(index, quantity);
    setCartItems(updatedCart);
  };

  const removeFromCart = async (index) => {
    if (!user) return;
    const updatedCart = await api.removeFromCart(index);
    setCartItems(updatedCart);
  };

  const clearCart = async () => {
    if (!user) return;
    const updatedCart = await api.clearCart();
    setCartItems(updatedCart);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
