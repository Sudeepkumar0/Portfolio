import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import "./styles/styles.css";
import Skills from "./Skills";
import Contact from "./Contact";
import Projects from "./Projects";

function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <main className="container main-content">
        <section
          id="about"
          className="section about-section"
          aria-labelledby="about-heading"
        >
          <h2 id="about-heading" className="fade-up">
            About Me
          </h2>
          <div className="about-grid">
            <div className="about-left fade-up">
              <p>
                I'm a Computer Science student focused on web development and
                software engineering. I enjoy building practical, well-tested
                projects while learning modern tools and best practices. I'm
                currently studying at NMIT Bangalore and actively working on
                coursework and personal projects to strengthen my full-stack
                skills.
              </p>
            </div>

            <div className="about-center fade-up">
              <div className="stat-card card">
                <div className="stat-top">
                  <div className="stat-num">6+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <p className="stat-desc">
                  Coursework and personal projects across frontend and backend.
                </p>

                <div className="stat-image card" style={{ marginTop: 16 }}>
                  <img
                    src={process.env.PUBLIC_URL + "/images/avatar.jpg"}
                    alt="avatar"
                    style={{
                      width: "100%",
                      display: "block",
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="about-right fade-up">
              <div className="mini-avatar card">
                <img
                  src={process.env.PUBLIC_URL + "/images/avatar.jpg"}
                  alt="avatar small"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </div>

              <ul className="about-bullets">
                <li>
                  With hands-on coursework and internships, I build user-focused
                  web apps.
                </li>
                <li>
                  I enjoy collaborating, learning new technologies, and shipping
                  features end-to-end.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Skills />

        <Projects />

        <Contact />
      </main>
    </>
  );
}

export default App;
