import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import "./styles/styles.css";
import Skills from "./Skills";
import Contact from "./Contact";
import Projects from "./Projects";
import Footer from "./Footer";

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
                I'm a Computer Science student currently pursuing an MCA at NMIT
                Bangalore with a focus on web development and software
                engineering. I enjoy building practical, well-tested projects
                using React, Node.js and SQL, and I like exploring modern
                tooling such as TypeScript, containerization, and CI/CD. Through
                coursework in algorithms, databases and software engineering,
                and via personal and open-source projects, I&nbsp;build and ship
                end-to-end features. I'm actively seeking internships and
                collaborative opportunities to grow as a full-stack developer.
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
                    src={process.env.PUBLIC_URL + "/images/avatar1.png"}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "0%",
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
                  className="mini-av-img"
                  src={process.env.PUBLIC_URL + "/images/avatar1.png"}
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
      <Footer />
    </>
  );
}

export default App;
