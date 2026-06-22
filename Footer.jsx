// src/components/Footer.jsx
// ---------------------------------------------------------------------------
// Multi-column footer + copyright bar. Column data is defined inline since
// it's static content, not app state.
// ---------------------------------------------------------------------------
import React from "react";

const FOOTER_COLUMNS = [
  {
    heading: "Get to Know Us",
    links: ["About ShopSphere", "Careers", "Press Releases", "Sustainability"],
  },
  {
    heading: "Connect with Us",
    links: ["Facebook", "Twitter / X", "Instagram", "YouTube"],
  },
  {
    heading: "Make Money with Us",
    links: ["Sell on ShopSphere", "Become an Affiliate", "Advertise Your Products", "Self-Publish"],
  },
  {
    heading: "Let Us Help You",
    links: ["Your Account", "Returns Centre", "100% Purchase Protection", "Help"],
  },
];

const SOCIALS = [
  { label: "Facebook", icon: "📘" },
  { label: "Twitter", icon: "🐦" },
  { label: "Instagram", icon: "📷" },
  { label: "YouTube", icon: "▶️" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>

      <div className="footer-columns">
        {FOOTER_COLUMNS.map((col) => (
          <div className="footer-col" key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-col footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            {SOCIALS.map((s) => (
              <a href="#" key={s.label} aria-label={s.label} className="social-icon">
                {s.icon}
              </a>
            ))}
          </div>
          <p className="footer-newsletter-note">
            Get deals straight to your inbox — no spam, ever.
          </p>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <span className="logo-mark small">S</span>
        <p>&copy; {new Date().getFullYear()} ShopSphere, Inc. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Notice</a>
          <a href="#">Conditions of Use</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
