import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Colors from "./Colors";
import "./styles/styles.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Colors />

      <main className="container main-content">
        <section id="about" className="section">
          <div className="card fade-up">
            <h2>About</h2>
            <p>
              Short bio or description goes here. Replace with your detailed
              introduction.
            </p>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="card fade-up">
            <h2>Skills</h2>
            <p>Java · JavaScript · React · SQL · Node.js</p>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="card fade-up">
            <h2>Projects</h2>
            <p>Project cards and details will be shown here.</p>
          </div>
        </section>

        <section id="contact" className="section section-bottom">
          <div className="card fade-up">
            <h2>Contact</h2>
            <p>Get in touch via email or LinkedIn.</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
