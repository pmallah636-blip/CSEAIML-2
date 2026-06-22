// src/components/Header.jsx
// ---------------------------------------------------------------------------
// Sticky top navigation: logo, search bar, account/orders/cart, dark toggle.
// A slim secondary row below it carries the category links (Amazon-style
// two-tier header) so the search bar in the primary row stays uncluttered.
// ---------------------------------------------------------------------------
import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { CATEGORIES } from "../data/products";

export default function Header() {
  const {
    cartCount,
    isDarkMode,
    toggleDarkMode,
    setCategory,
    activeCategory,
    setSearchQuery,
  } = useStore();

  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  return (
    <header className="site-header">
      {/* ----- Primary row: logo / search / account icons ----- */}
      <div className="header-primary">
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <a href="#home" className="logo" aria-label="ShopSphere home">
          <span className="logo-mark">S</span>
          <span className="logo-text">
            Shop<em>Sphere</em>
          </span>
        </a>

        <form className="search-bar" onSubmit={handleSearchSubmit} role="search">
          <select className="search-category" aria-label="Search category" defaultValue="all">
            <option value="all">All</option>
            {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search products, brands, and more"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" aria-label="Submit search">
            🔍
          </button>
        </form>

        <div className="header-actions">
          <button
            className="icon-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          <a href="#account" className="header-action">
            <span className="action-icon">👤</span>
            <span className="action-text">
              <small>Hello, sign in</small>
              <strong>Account</strong>
            </span>
          </a>

          <a href="#orders" className="header-action">
            <span className="action-icon">📦</span>
            <span className="action-text">
              <small>Returns</small>
              <strong>& Orders</strong>
            </span>
          </a>

          <a href="#cart" className="header-action cart-action">
            <span className="action-icon cart-icon">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </span>
            <span className="action-text cart-label">
              <strong>Cart</strong>
            </span>
          </a>
        </div>
      </div>

      {/* ----- Secondary row: category quick links ----- */}
      <nav className={`header-secondary ${menuOpen ? "is-open" : ""}`}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-link ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => {
              setCategory(cat.id);
              setMenuOpen(false);
            }}
          >
            <span aria-hidden="true">{cat.icon}</span> {cat.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
