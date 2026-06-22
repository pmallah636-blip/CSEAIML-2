// src/App.jsx
// ---------------------------------------------------------------------------
// Root component. Wraps the page in StoreProvider so every child can read/
// write cart, dark mode, category filter, and search state via useStore().
// ---------------------------------------------------------------------------
import React from "react";
import { StoreProvider } from "./context/StoreContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import "./style.css";

export default function App() {
  return (
    <StoreProvider>
      <div className="app-shell">
        <Header />
        <main>
          <Hero />
          <ProductGrid />
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
}
