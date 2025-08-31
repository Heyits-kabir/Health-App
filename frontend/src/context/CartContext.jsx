// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Initialize state from localStorage to keep cart persistent
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Could not parse cart items from localStorage', error);
      return [];
    }
  });

  // 2. Persist cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. Function to add an item to the cart
  const addToCart = (product, quantity) => {
    const exist = cartItems.find((item) => item._id === product._id);

    if (exist) {
      // If item already exists, update its quantity
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...exist, qty: exist.qty + quantity } : item
        )
      );
    } else {
      // If item is new, add it to the cart
      setCartItems([...cartItems, { ...product, qty: quantity }]);
    }
  };

  // 4. Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 5. Custom hook for easy access to the context
export const useCart = () => {
  return useContext(CartContext);
};