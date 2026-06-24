// src/context/StoreContext.jsx
// ---------------------------------------------------------------------------
// Lightweight global state via Context + useReducer.
// Holds: cart items, dark mode flag, active category filter, search query.
// Kept in one place so Header / ProductGrid / Footer can all read & write
// without prop-drilling through App.jsx.
// ---------------------------------------------------------------------------
import React, { createContext, useContext, useReducer, useEffect } from "react";

const StoreContext = createContext(null);

const initialState = {
  cart: [], // [{ id, title, price, image, qty }]
  isDarkMode: false,
  activeCategory: "all",
  searchQuery: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      const cart = existing
        ? state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...state.cart, { ...action.payload, qty: 1 }];
      return { ...state, cart };
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case "TOGGLE_DARK_MODE":
      return { ...state, isDarkMode: !state.isDarkMode };
    case "SET_CATEGORY":
      return { ...state, activeCategory: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Reflect dark mode on the root element so plain-CSS variables can react.
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      state.isDarkMode ? "dark" : "light"
    );
  }, [state.isDarkMode]);

  const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);

  const value = {
    ...state,
    cartCount,
    addToCart: (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
    removeFromCart: (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    toggleDarkMode: () => dispatch({ type: "TOGGLE_DARK_MODE" }),
    setCategory: (id) => dispatch({ type: "SET_CATEGORY", payload: id }),
    setSearchQuery: (q) => dispatch({ type: "SET_SEARCH", payload: q }),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}
