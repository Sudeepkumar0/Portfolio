import React, { useState, useEffect } from "react";
import "./styles/Hero.css";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { triggerConfetti } from "./utils/confetti";

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reveal, setReveal] = useState(false);
  // Typewriter role
  const roles = React.useMemo(
    () => [
      "Full-Stack Developer",
      "React • Node • SQL",
      "Vibe Coder",
      "Tech Enthusiast",
      "Open Source Enthusiast",
    ],
    [],
  );
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const fullText = roles[roleIndex];
    if (!deleting) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length + 1));
      }, 100);
      if (displayed === fullText) {
        timeout = setTimeout(() => setDeleting(true), 900);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length - 1));
      }, 50);
      if (displayed === "") {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, roles]);

  // landing animation and scroll-up reveal
  useEffect(() => {
    // respect reduced motion
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setMounted(true);
      return;
    }

    // mount animation on load
    // add a slightly longer delay so the page chrome settles before the
    // hero pops in; this produces a clearer initial entrance on slower devices
    const MOUNT_DELAY = 700; // ms — start hero after app-level pop finishes
    const t = setTimeout(() => setMounted(true), MOUNT_DELAY);

    let lastY = window.scrollY;
    let revealTimer = null;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY;
      // if scrolling up (delta < 0) and near the top, show reveal
      if (delta < 0 && y < 220) {
        setReveal(true);
        clearTimeout(revealTimer);
        revealTimer = setTimeout(() => setReveal(false), 700);
      }
      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(revealTimer);
    };
  }, []);
  return (
    <header
      className={`hero ${mounted ? "hero--entered" : "hero--entering"} ${
        reveal ? "hero--reveal" : ""
      }`}
    >
      <div className="container hero-inner">
        <div className="hero-content fade-up">
          <h1 className="hero-title">Hello</h1>
          <h3 className="hero-sub">
            It's <span className="hero-name">G Sudeep Kumar</span> <br></br>
            <span className="hero-sub-desc">a software enthusiast!</span>
          </h3>
          <div className="typewriter" aria-hidden="false">
            <span className="role-text">{displayed}</span>
            <span className="type-cursor">|</span>
          </div>
          <div className="hero-socials">
            <a href="mailto:sudeepkumar.connect@gmail.com" aria-label="email">
              <FaEnvelope aria-hidden="true" />
            </a>
            <a
              href="https://github.com/sudeepkumar0"
              target="_blank"
              rel="noreferrer"
              aria-label="github"
            >
              <FaGithub aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/g-sudeep-kumar-aa1bb6253/"
              target="_blank"
              rel="noreferrer"
              aria-label="linkedin"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
          </div>
          <p className="hero-desc">
            Aspiring Full Stack Engineer with a strong foundation in Java,
            JavaScript, SQL, and React — blending technical depth with a
            creative mindset to build modern, scalable web solutions.
          </p>

          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href="#projects"
              onClick={triggerConfetti}
            >
              View My Projects
            </a>
            <a
              className="btn btn-ghost"
              href="#contact"
              onClick={triggerConfetti}
            >
              Contact Me
            </a>
            <a
              className="btn btn-outline"
              href="docs/resume.pdf"
              download
              onClick={triggerConfetti}
            >
              Download CV
            </a>
          </div>

          <div className="hero-scroll">Scroll down ↓</div>
        </div>

        <div className="hero-visual fade-up">
          <div className="avatar">
            {/* Avatar image served from public/images/avatar.jpg. If it's not present or fails to load, the initials fallback is shown. */}
            <img
              className="avatar-img"
              src={`${process.env.PUBLIC_URL}/images/filled.png`}
              alt="G Sudeep Kumar"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(false)}
              style={{ display: imgLoaded ? "block" : "none" }}
            />

            <div
              className="avatar-inner"
              style={{ display: imgLoaded ? "none" : "flex" }}
            >
              GS
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
