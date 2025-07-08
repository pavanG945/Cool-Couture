import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [clearCartCallback, setClearCartCallback] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    // Clear all user-specific data
    const oldToken = token;
    if (oldToken) {
      try {
        const payload = JSON.parse(atob(oldToken.split('.')[1]));
        const userId = payload.userId;
        localStorage.removeItem(`cartItems_${userId}`); // Remove user's cart
      } catch (e) {
        // If token decode fails, clear generic cart
        localStorage.removeItem('cartItems');
      }
    }
    
    setToken(null);
    localStorage.removeItem('token');
    
    // Clear cart state
    if (clearCartCallback) clearCartCallback();
  };

  const isLoggedIn = !!token;

  const setCartClearCallback = (cb) => setClearCartCallback(() => cb);

  return (
    <AuthContext.Provider value={{ 
      token, 
      login, 
      logout, 
      isLoggedIn, 
      setCartClearCallback 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
