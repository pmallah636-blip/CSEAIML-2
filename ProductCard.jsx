// src/components/ProductCard.jsx
// ---------------------------------------------------------------------------
// Single reusable product card. Receives one `product` object as a prop —
// pure presentational component, no internal data fetching.
// ---------------------------------------------------------------------------
import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

// Renders 5 stars, filled proportionally to `rating` (e.g. 4.5 -> 4 full + 1 half)
function StarRating({ rating, reviews }) {
  // Simplification: ratings of x.5 and above render that star as fully
  // filled rather than drawing a distinct half-star glyph. Good enough for
  // a glanceable rating display; swap in an SVG half-star if pixel-perfect
  // partial fills are needed later.
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = rating >= i - 0.5;
    stars.push(
      <span key={i} className={`star ${isFilled ? "filled" : ""}`} aria-hidden="true">
        {isFilled ? "★" : "☆"}
      </span>
    );
  }
  return (
    <div className="rating" aria-label={`Rated ${rating} out of 5`}>
      <span className="stars">{stars}</span>
      <span className="review-count">({reviews.toLocaleString()})</span>
    </div>

  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const discountPct = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500); // revert button label after feedback flash
  };

  return (
    <article className="product-card">
      {product.badge && <span className="product-badge">{product.badge}</span>}

      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-body">
        <h3 className="product-title">{product.title}</h3>

        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="price-row">
          <span className="price-current">
            <sup>$</sup>
            {product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="price-original">${product.originalPrice.toFixed(2)}</span>
              <span className="price-discount">-{discountPct}%</span>
            </>
          )}
        </div>

        <button
          className={`add-to-cart-btn ${justAdded ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {justAdded ? "✓ Added" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
