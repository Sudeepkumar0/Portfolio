import React from "react";
import "./styles/Colors.css";

export default function Colors() {
  const colors = [
    { name: "Primary", hex: "#222222" },
    { name: "Secondary", hex: "#7B7B7B" },
    { name: "Tertiary", hex: "#F8F8F8" },
    { name: "White", hex: "#FFFFFF" },
  ];

  return (
    <section className="container section colors-section">
      <h2 className="fade-up">Colors</h2>
      <p className="fade-up" style={{ marginTop: 12 }}>
        Brand palette used across the site.
      </p>

      <div className="colors-grid fade-up">
        {colors.map((c) => (
          <div className="color-card" key={c.hex}>
            <div className="swatch" style={{ background: c.hex }} />
            <div className="meta">
              <div className="label">{c.name}</div>
              <div className="hex">{c.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
