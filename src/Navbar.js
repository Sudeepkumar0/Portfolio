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
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`site-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Left pill */}
        <div className="nav-pill nav-left" aria-hidden>
          <span className="status-dot" />
          <span className="pill-text">available for projects</span>
        </div>

        {/* Center rounded nav (brand circle + links) */}
        <div className="nav-center">
          <div className="brand-circle" aria-hidden>
            <span className="brand-initials">GS</span>
          </div>

          <ul className={`nav-links ${open ? "open" : ""}`} role="menu">
            <li role="none">
              <a role="menuitem" href="#home" onClick={() => setOpen(false)}>
                Home
              </a>
            </li>
            <li role="none">
              <a role="menuitem" href="#about" onClick={() => setOpen(false)}>
                About
              </a>
            </li>
            <li role="none">
              <a
                role="menuitem"
                href="#projects"
                onClick={() => setOpen(false)}
              >
                Projects
              </a>
            </li>
            <li role="none">
              <a role="menuitem" href="#contact" onClick={() => setOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right pill */}
        <div className="nav-pill nav-right">
          <a
            href="https://leetcode.com/u/G_Sudeep_kumar/"
            className="pill-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            sudeep@leatcode.com
          </a>
        </div>

        {/* Toggle (mobile) - keep it last for tab order */}
        <button
          className="nav-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}
