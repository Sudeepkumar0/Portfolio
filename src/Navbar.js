import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // run once in case page is already scrolled
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`site-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-brand">My Portfolio</div>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <a href="#home" onClick={() => setOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#projects" onClick={() => setOpen(false)}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
