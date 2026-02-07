import React, { useRef, useEffect } from "react";
import "./styles/Skills.css";
import {
  FaJsSquare,
  FaReact,
  FaServer,
  FaGitAlt,
  FaDatabase,
  FaMobileAlt,
} from "react-icons/fa";

// Concise skills list — add or remove entries as needed
const skills = [
  {
    title: "JavaScript",
    icon: <FaJsSquare />,
    desc: "ES6+, DOM, async/await",
    slug: "javascript",
  },
  {
    title: "React",
    icon: <FaReact />,
    desc: "Hooks, component-driven UI",
    slug: "react",
  },
  {
    title: "Node.js",
    icon: <FaServer />,
    desc: "Express, REST APIs",
    slug: "nodejs",
  },
  { title: "Git", icon: <FaGitAlt />, desc: "Version control", slug: "git" },
  {
    title: "SQL",
    icon: <FaDatabase />,
    desc: "Postgres, queries",
    slug: "postgresql",
  },
  {
    title: "HTML & CSS",
    icon: <FaMobileAlt />,
    desc: "Responsive layouts",
    slug: "html-css",
  },
];

export default function Skills() {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const resumeTimer = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const speed = 0.5; // pixels per frame

    function step() {
      if (!pausedRef.current) {
        el.scrollLeft += speed;
        // Reset to beginning when we've scrolled through half (the duplicated content)
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    const clearResume = () => {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
        resumeTimer.current = null;
      }
    };

    const scheduleResume = (delay = 700) => {
      clearResume();
      resumeTimer.current = setTimeout(() => {
        pausedRef.current = false;
        resumeTimer.current = null;
      }, delay);
    };

    // Wheel: translate vertical wheel into horizontal scroll and mark interaction
    const onWheel = (e) => {
      if (e.cancelable) e.preventDefault();
      pausedRef.current = true;
      el.scrollLeft += e.deltaY;
      scheduleResume(700);
    };

    // Mouse drag (desktop)
    const onMouseDown = (e) => {
      dragRef.current.isDown = true;
      dragRef.current.startX = e.pageX - el.offsetLeft;
      dragRef.current.scrollLeft = el.scrollLeft;
      pausedRef.current = true;
    };
    const onMouseMove = (e) => {
      if (!dragRef.current.isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - dragRef.current.startX) * 1; // multiplier controls drag sensitivity
      el.scrollLeft = dragRef.current.scrollLeft - walk;
    };
    const onMouseUp = () => {
      if (!dragRef.current.isDown) return;
      dragRef.current.isDown = false;
      scheduleResume(800);
    };

    // Touch drag (mobile) - use passive listeners for better iOS performance
    const onTouchStart = (e) => {
      dragRef.current.isDown = true;
      dragRef.current.startX = e.touches[0].pageX - el.offsetLeft;
      dragRef.current.scrollLeft = el.scrollLeft;
      pausedRef.current = true;
    };
    const onTouchMove = (e) => {
      if (!dragRef.current.isDown) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - dragRef.current.startX) * 1;
      el.scrollLeft = dragRef.current.scrollLeft - walk;
    };
    const onTouchEnd = () => {
      if (!dragRef.current.isDown) return;
      dragRef.current.isDown = false;
      scheduleResume(800);
    };

    // Pause when an element inside receives focus (accessibility) and resume when blurred
    const onFocusIn = () => {
      pausedRef.current = true;
    };
    const onFocusOut = () => {
      scheduleResume(700);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Use passive touch listeners for better scroll performance
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearResume();
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const getInitials = (title) => {
    if (!title) return "";
    // take up to first two meaningful groups (e.g., 'HTML & CSS' -> 'HTML', 'CSS' -> 'HTML')
    const parts = title
      .replace(/&/g, " ")
      .split(/\s+/)
      .filter((p) => p.length > 0);
    if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
    // for multi-word, prefer first and maybe second word initials or first 3 letters of first
    const initials = (
      parts[0].slice(0, 3) + (parts[1] ? parts[1].slice(0, 0) : "")
    ).toUpperCase();
    return initials;
  };

  return (
    <section className="skills-section">
      <div className="container">
        <div className="skills-header fade-up">
          <h2>Skill-Set</h2>
          <p className="muted">Tools and areas I work with most.</p>
        </div>

        <div
          className="card-loop fade-up"
          ref={containerRef}
          aria-label="Skills card loop"
        >
          <div className="card-track">
            {skills.concat(skills).map((s, i) => {
              const imgSrc = `${process.env.PUBLIC_URL}/images/skills/${s.slug}.svg`;
              return (
                <div className="card-item" key={s.slug + "-" + i}>
                  <div className="skill-card">
                    <div className="skill-icon">
                      <img
                        className="skill-logo"
                        src={imgSrc}
                        alt={s.title}
                        onLoad={(e) => {
                          // Hide the fallback icon when the image loads successfully
                          const fb = e.currentTarget.nextElementSibling;
                          if (fb) fb.style.display = "none";
                        }}
                        onError={(e) => {
                          // If image fails, hide it so fallback remains visible
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <span className="skill-icon-fallback" aria-hidden="true">
                        {s.slug === "git" ? s.icon : getInitials(s.title)}
                      </span>
                    </div>
                    <div className="skill-info">
                      <h3 className="skill-title">{s.title}</h3>
                      <p className="skill-desc">{s.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
