import React, { useState, useEffect } from "react";
import "./styles/Hero.css";

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false);
  // Typewriter role
  const roles = React.useMemo(
    () => [
      "Full-Stack Developer",
      "React • Node • SQL",
      "Open Source Enthusiast",
    ],
    []
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
  return (
    <header className="hero">
      <div className="container hero-inner">
        <div className="hero-content fade-up">
          <h1 className="hero-title">Hello</h1>
          <h3 className="hero-sub">
            It's G Sudeep Kumar, a sofware enthusiast!
          </h3>
          <div className="typewriter" aria-hidden="false">
            <span className="role-text">{displayed}</span>
            <span className="type-cursor">|</span>
          </div>
          <div className="hero-socials">
            <a href="mailto:sudeepkumar.connect@gmail.com" aria-label="email">
              ✉
            </a>
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noreferrer"
              aria-label="github"
            >
              G
            </a>
            <a
              href="https://linkedin.com/in/your-username"
              target="_blank"
              rel="noreferrer"
              aria-label="linkedin"
            >
              in
            </a>
          </div>
          <p className="hero-desc">
            Aspiring Full Stack Engineer with a strong foundation in Java,
            JavaScript, SQL, and React — blending technical depth with a
            creative mindset to build modern, scalable web solutions.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View My Projects
            </a>
            <a className="btn btn-ghost" href="#contact">
              Contact Me
            </a>
            <a className="btn btn-outline" href="/resume.pdf" download>
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
