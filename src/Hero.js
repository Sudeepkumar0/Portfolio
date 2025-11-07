import React from "react";
import "./styles/Hero.css";

export default function Hero() {
  return (
    <header className="hero">
      <div className="container hero-inner">
        <div className="hero-content fade-up">
          <div className="hero-stats">
            <div className="stat">
              <div className="num">+200</div>
              <div className="label">Project completed</div>
            </div>
            <div className="stat">
              <div className="num">+50</div>
              <div className="label">Startup raised</div>
            </div>
          </div>

          <h1 className="hero-title">Hello</h1>
          <h3 className="hero-sub">It's G Sudeep Kumar, a design wizard</h3>
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
          </div>

          <div className="hero-scroll">Scroll down ↓</div>
        </div>

        <div className="hero-visual fade-up">
          <div className="avatar card">
            <div className="avatar-inner">GS</div>
          </div>
        </div>
      </div>
    </header>
  );
}
