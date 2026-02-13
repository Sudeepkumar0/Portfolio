import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import { FaBars, FaTimes, FaCode } from "react-icons/fa";

export default function Navbar({ onPlaygroundClick }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);

      // on small screens, hide the navbar when the user scrolls down and
      // reveal it when they scroll up. Use a small threshold to avoid
      // jitter from minor scrolls.
      try {
        const isMobile = window.matchMedia("(max-width: 720px)").matches;
        if (isMobile) {
          const delta = y - lastY;
          if (delta > 12) {
            // scrolling down
            setHiddenOnScroll(true);
            setOpen(false);
          } else if (delta < -12) {
            // scrolling up
            setHiddenOnScroll(false);
          }
        } else {
          // ensure visible on larger screens
          setHiddenOnScroll(false);
        }
      } catch (e) {
        // graceful fallback: do nothing
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`site-navbar ${scrolled ? "scrolled" : ""} ${
        hiddenOnScroll ? "nav-hidden" : ""
      }`}
    >
      <div className="nav-container">
        {/* Left pill - Playground */}
        <button
          className="nav-pill nav-left playground-pill"
          onClick={() => onPlaygroundClick && onPlaygroundClick()}
        >
          <FaCode className="pill-icon" />
          <span className="pill-text">Playground</span>
        </button>

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
            <li role="none" className="mobile-only">
              <button
                role="menuitem"
                className="nav-playground-btn"
                onClick={() => {
                  setOpen(false);
                  onPlaygroundClick && onPlaygroundClick();
                }}
              >
                <FaCode /> Playground
              </button>
            </li>
            <li role="none" className="mobile-only">
              <a
                role="menuitem"
                href="https://leetcode.com/u/G_Sudeep_kumar/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                leatcode
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
