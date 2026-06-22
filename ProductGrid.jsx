// src/components/ProductGrid.jsx
// ---------------------------------------------------------------------------
// Filters PRODUCTS by active category + search query, shows a brief skeleton
// loading state on filter change (simulates an API round-trip), then renders
// the grid of ProductCard components.
// ---------------------------------------------------------------------------
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { useStore } from "../context/StoreContext";

function SkeletonCard() {
  return (
    <div className="product-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-image" />
      <div className="product-body">
        <div className="skeleton skeleton-line" style={{ width: "90%" }} />
        <div className="skeleton skeleton-line" style={{ width: "50%" }} />
        <div className="skeleton skeleton-line" style={{ width: "70%" }} />
        <div className="skeleton skeleton-button" />
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const { activeCategory, searchQuery, setCategory } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Brief skeleton flash whenever the filter criteria changes — gives the
  // "Loading animations" requirement a real trigger instead of a fake demo.
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  return (
    <section className="product-grid-section" id="product-grid">
      <div className="section-heading">
        <h2>{searchQuery ? `Results for "${searchQuery}"` : "Today's Deals"}</h2>
        <p>Hand-picked picks across every category, refreshed daily.</p>
      </div>

      {/* Category filter pills — duplicated UI from the header, useful for
          users who scrolled past the nav and want to refine in-place. */}
      <div className="category-pills">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-pill ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : (
            <div className="empty-state">
              <p>😕 No products match your search.</p>
              <button onClick={() => setCategory("all")}>Clear filters</button>
            </div>
          )}
      </div>
    </section>
  );
}
