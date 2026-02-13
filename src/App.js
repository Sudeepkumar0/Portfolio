import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import "./styles/styles.css";
import "./styles/cursor.css";
import Contact from "./Contact";
import Footer from "./Footer";
import Projects from "./Projects";
import { initCustomCursor } from "./utils/customCursor";
import Splash from "./Splash";
import ChatBot from "./ChatBot";
import TechNews from "./TechNews";
import {
  FaGraduationCap,
  FaGithub,
  FaLinkedin,
  FaCode,
  FaProjectDiagram,
  FaBookReader,
} from "react-icons/fa";
import { SiSpringboot, SiReact } from "react-icons/si";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    "/crimages/cr1.jpeg",
    "/crimages/cr2.jpeg",
    "/crimages/cr3.jpeg",
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // initialize custom cursor only after splash hides (so it doesn't show through)
  useEffect(() => {
    if (showSplash) return undefined;
    const cleanup = initCustomCursor({
      interactiveSelector: "a,button,.btn,.project-cta",
    });
    return () => cleanup && cleanup();
  }, [showSplash]);
  return (
    <>
      {showSplash && (
        <Splash duration={1200} onFinish={() => setShowSplash(false)} />
      )}

      <div
        className={`app-root ${
          showSplash ? "app-root--hidden" : "app-root--visible"
        }`}
      >
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
                {/* Education Timeline */}
                <div className="education-timeline">
                  <h3 className="education-title">
                    <FaGraduationCap className="education-icon" />
                    Education
                  </h3>
                  <div className="timeline">
                    {[
                      {
                        year: "2024 - Present",
                        degree: "Master of Computer Applications",
                        school: "NMIT Bangalore",
                        detail: "Full Stack Development",
                      },
                      {
                        year: "2021 - 2024",
                        degree: "Bachelor of Vocational Courses",
                        school: "SDM College Ujire",
                        detail: "Software & Application Development",
                      },
                      {
                        year: "2019 - 2021",
                        degree: "Pre-University Course (PUC)",
                        school: "SDM PU College Ujire",
                        detail: "PCMS",
                      },
                    ].map((edu, i) => (
                      <div
                        className="timeline-item"
                        key={i}
                        style={{ "--delay": `${i * 0.15}s` }}
                      >
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <span className="timeline-year">{edu.year}</span>
                          <h4 className="timeline-degree">{edu.degree}</h4>
                          <p className="timeline-school">{edu.school}</p>
                          <span className="timeline-detail">{edu.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="about-center fade-up">
                <div className="profile-card card">
                  {/* Image Carousel */}
                  <div className="carousel">
                    <div
                      className="carousel-track"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      {carouselImages.map((img, i) => (
                        <div className="carousel-slide" key={i}>
                          <img
                            src={process.env.PUBLIC_URL + img}
                            alt={`Profile ${i + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="carousel-dots">
                      {carouselImages.map((_, i) => (
                        <button
                          key={i}
                          className={`carousel-dot ${currentSlide === i ? "active" : ""}`}
                          onClick={() => setCurrentSlide(i)}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* About Me Text */}
                  <div className="profile-bio">
                    <p>
                      I'm a Computer Science student pursuing MCA at NMIT
                      Bangalore, passionate about building scalable web
                      applications. With hands-on experience in React, Node.js,
                      and SQL databases, I love transforming ideas into
                      functional, user-friendly products. Currently diving
                      deeper into TypeScript, containerization, and CI/CD
                      pipelines. Open to internships and exciting collaboration
                      opportunities.
                    </p>

                    {/* Social Links + CTA */}
                    <div className="profile-actions">
                      <div className="social-icons">
                        <a
                          href="https://github.com/Sudeepkumar0"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon github"
                          aria-label="GitHub"
                        >
                          <FaGithub />
                        </a>
                        <a
                          href="https://linkedin.com/in/yourprofile"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon linkedin"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin />
                        </a>
                      </div>
                      <a href="#contact" className="cta-btn">
                        Let's Connect
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-right fade-up">
                <div className="skills-card card">
                  <h3 className="skills-card-title">My Skills</h3>
                  <div className="skills-list">
                    {[
                      { name: "JavaScript", level: 90 },
                      { name: "React", level: 85 },
                      { name: "Node.js", level: 85 },
                      { name: "Python", level: 80 },
                      { name: "SQL", level: 75 },
                    ].map((skill, i) => (
                      <div
                        className="skill-row"
                        key={skill.name}
                        style={{ "--delay": `${i * 0.1}s` }}
                      >
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percent">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div
                            className="skill-fill"
                            style={{ "--width": `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats + Currently Learning */}
                <div className="stats-learning-card card">
                  <div className="quick-stats-grid">
                    <div className="stat-box">
                      <FaProjectDiagram className="stat-box-icon" />
                      <span className="stat-box-num">5+</span>
                      <span className="stat-box-label">Projects</span>
                    </div>
                    <div className="stat-box">
                      <FaCode className="stat-box-icon" />
                      <span className="stat-box-num">200+</span>
                      <span className="stat-box-label">Commits</span>
                    </div>
                  </div>

                  <div className="currently-learning">
                    <h4 className="learning-title">
                      <FaBookReader className="learning-icon" />
                      Currently Learning
                    </h4>
                    <div className="learning-tags">
                      <span className="learning-tag springboot">
                        <SiSpringboot /> Spring Boot
                      </span>
                      <span className="learning-tag react">
                        <SiReact /> React
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <TechNews />

          <Projects />

          <Contact />
        </main>
        <Footer />
      </div>

      {/* AI Chat Assistant */}
      {!showSplash && <ChatBot />}
    </>
  );
}

export default App;
