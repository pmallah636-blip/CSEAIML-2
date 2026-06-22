// src/components/Hero.jsx
// ---------------------------------------------------------------------------
// Large promotional banner with gradient overlay + CTA button.
// scrollToProducts() gives the "Shop Now" button a real destination instead
// of a dead href="#" link.
// ---------------------------------------------------------------------------
import React from "react";

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-eyebrow">Summer Refresh · Up to 40% off</p>
        <h1 className="hero-title">
          Everything you need,
          <br /> delivered to your door.
        </h1>
        <p className="hero-subtitle">
          Electronics, fashion, home essentials, and more — all in one place,
          at prices that make sense.
        </p>
        <button className="cta-button" onClick={scrollToProducts}>
          Shop Now <span className="cta-arrow">→</span>
        </button>
      </div>

      {/* Decorative floating cards — purely visual, hidden from screen readers */}
      <div className="hero-decor" aria-hidden="true">
        <div className="floating-card card-1">⚡ Flash Deals</div>
        <div className="floating-card card-2">🚚 Free Delivery</div>
      </div>
    </section>
  );
}
