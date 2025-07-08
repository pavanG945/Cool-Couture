import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { isLoggedIn, setCartClearCallback, token } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Get user ID from token (you'll need to decode JWT or get user info)
  const getUserId = () => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      return payload.userId;
    } catch {
      return null;
    }
  };

  const userId = getUserId();

  // Load cart from localStorage on mount/user change
  useEffect(() => {
    if (isLoggedIn && userId) {
      const userCartKey = `cartItems_${userId}`;
      const savedCart = localStorage.getItem(userCartKey);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]); // Clear cart if not logged in
    }
  }, [isLoggedIn, userId]);

  // Save cart to localStorage with user-specific key
  useEffect(() => {
    if (isLoggedIn && userId) {
      const userCartKey = `cartItems_${userId}`;
      localStorage.setItem(userCartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn, userId]);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart');
      return;
    }
    
    setCartItems(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item._id === product._id);
      if (existingItemIndex !== -1) {
        return prevCart.map((item, idx) =>
          idx === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item._id !== id));

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  // Memoize clearCart to prevent infinite loop
  const clearCart = useCallback(() => setCartItems([]), []);

  // Register clearCart with AuthContext
  useEffect(() => {
    setCartClearCallback(() => clearCart);
  }, [setCartClearCallback, clearCart]);

  const getCartTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}
