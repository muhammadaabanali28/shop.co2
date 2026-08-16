import { createContext, useContext, useState, useEffect } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { db } from "../firebase";
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

    const cartRef = ref(db, `cart/${user.uid}`);
    const unsubscribe = onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data).map(([key, val]) => ({
          cartId: key,
          ...val,
        }));
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const addToCart = async (product, quantity = 1, selectedColor = 0, selectedSize = 1) => {
    if (!user) return false;

    const colors = ["#4a4a4a", "#1a1a2e", "#8b7355", "#c4a882"];
    const sizes = ["XS", "S", "M", "L", "XL"];
    const productName = product.title || product.name || "Product";
    const productId = product._id || product.id;

    const cartRef = ref(db, `cart/${user.uid}/${productId}`);
    await set(cartRef, {
      id: productId,
      title: productName,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice || null,
      discount: product.discount || null,
      quantity,
      color: colors[selectedColor],
      size: sizes[selectedSize],
      addedAt: Date.now(),
    });

    return true;
  };

  const updateQuantity = async (cartId, quantity) => {
    if (!user || quantity < 1) return;
    const itemRef = ref(db, `cart/${user.uid}/${cartId}`);
    const item = cartItems.find((i) => i.cartId === cartId);
    if (item) {
      await set(itemRef, { ...item, quantity, cartId: undefined });
    }
  };

  const removeFromCart = async (cartId) => {
    if (!user) return;
    const itemRef = ref(db, `cart/${user.uid}/${cartId}`);
    await remove(itemRef);
  };

  const clearCart = async () => {
    if (!user) return;
    const cartRef = ref(db, `cart/${user.uid}`);
    await set(cartRef, null);
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
