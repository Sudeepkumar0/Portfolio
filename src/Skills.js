import React, { useRef, useEffect, useState } from "react";
import "./styles/Skills.css";
import {
  FaJsSquare,
  FaReact,
  FaServer,
  FaGitAlt,
  FaDatabase,
  FaMobileAlt,
  FaPython,
  FaAws,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiDocker,
  SiTailwindcss,
} from "react-icons/si";

// Skills with proficiency levels and colors
const skills = [
  {
    title: "JavaScript",
    icon: <FaJsSquare />,
    desc: "ES6+, DOM, async/await",
    slug: "javascript",
    level: 90,
    color: "#f7df1e",
  },
  {
    title: "React",
    icon: <FaReact />,
    desc: "Hooks, Redux, Next.js",
    slug: "react",
    level: 85,
    color: "#61dafb",
  },
  {
    title: "TypeScript",
    icon: <SiTypescript />,
    desc: "Type-safe development",
    slug: "typescript",
    level: 80,
    color: "#3178c6",
  },
  {
    title: "Node.js",
    icon: <FaServer />,
    desc: "Express, REST APIs",
    slug: "nodejs",
    level: 85,
    color: "#339933",
  },
  {
    title: "Python",
    icon: <FaPython />,
    desc: "Django, Flask, ML",
    slug: "python",
    level: 75,
    color: "#3776ab",
  },
  {
    title: "MongoDB",
    icon: <SiMongodb />,
    desc: "NoSQL database",
    slug: "mongodb",
    level: 80,
    color: "#47a248",
  },
  {
    title: "SQL",
    icon: <FaDatabase />,
    desc: "PostgreSQL, MySQL",
    slug: "postgresql",
    level: 75,
    color: "#336791",
  },
  {
    title: "Git",
    icon: <FaGitAlt />,
    desc: "Version control, CI/CD",
    slug: "git",
    level: 85,
    color: "#f05032",
  },
  {
    title: "Docker",
    icon: <SiDocker />,
    desc: "Containerization",
    slug: "docker",
    level: 70,
    color: "#2496ed",
  },
  {
    title: "AWS",
    icon: <FaAws />,
    desc: "Cloud services",
    slug: "aws",
    level: 65,
    color: "#ff9900",
  },
  {
    title: "Tailwind CSS",
    icon: <SiTailwindcss />,
    desc: "Utility-first CSS",
    slug: "tailwind",
    level: 80,
    color: "#06b6d4",
  },
  {
    title: "HTML & CSS",
    icon: <FaMobileAlt />,
    desc: "Responsive layouts",
    slug: "html-css",
    level: 95,
    color: "#e34f26",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`skills-section ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
      id="skills"
    >
      {/* Animated background particles */}
      <div className="skills-particles">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              "--delay": `${i * 0.5}s`,
              "--x": `${Math.random() * 100}%`,
            }}
          ></span>
        ))}
      </div>

      <div className="container">
        <div className="skills-header">
          <h2 className="skills-title">
            <span className="title-word">Skills</span>
            <span className="title-word accent">&</span>
            <span className="title-word">Technologies</span>
          </h2>
          <p className="skills-subtitle">
            Tools and technologies I use to bring ideas to life
          </p>
          <div className="title-decoration">
            <span className="line"></span>
            <span className="diamond"></span>
            <span className="line"></span>
          </div>
        </div>

        {/* Scrolling Marquee */}
        <div className="skills-marquee">
          <div className="marquee-track">
            {skills.concat(skills).map((s, i) => (
              <span
                key={i}
                className="marquee-item"
                style={{ "--color": s.color }}
              >
                {s.icon}
                <span>{s.title}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Animated Skill Bars */}
        <div className="skill-bars-container">
          <h3 className="skill-bars-title">Proficiency Levels</h3>
          <div className="skill-bars-grid">
            {skills.slice(0, 6).map((s, i) => (
              <div key={s.slug} className="skill-bar-item">
                <div className="skill-bar-header">
                  <span className="skill-bar-icon" style={{ color: s.color }}>
                    {s.icon}
                  </span>
                  <span className="skill-bar-name">{s.title}</span>
                  <span className="skill-bar-percent">{s.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: isVisible ? `${s.level}%` : "0%",
                      background: s.color,
                      transitionDelay: `${i * 0.1}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
