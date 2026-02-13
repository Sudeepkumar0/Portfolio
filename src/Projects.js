import React from "react";
import "./styles/Projects.css";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Sweet Shop",
    desc: "A demo e-commerce app with product listings, a client-side cart, and a Node/Express backend for serving data.",
    image: "/images/sweet_shop.png",
    repo: "https://github.com/Sudeepkumar0/Sweet-shop",
    tech: ["React", "Node.js", "Express", "CSS"],
    featured: true,
  },
  {
    id: 2,
    title: "Node Farm",
    desc: "A small Node.js/Express app that provides a REST API and simple UI to manage farm produce and inventory.",
    image: "/images/node_farm.png",
    repo: "https://github.com/Sudeepkumar0/NODE_FARM",
    tech: ["Node.js", "Express", "HTML"],
    featured: false,
  },
  {
    id: 3,
    title: "News App",
    desc: "A responsive news aggregator that fetches articles from public APIs, supports category filtering, and presents headlines with thumbnails.",
    image: "/images/news.png",
    repo: "https://github.com/Sudeepkumar0/News_app",
    tech: ["React", "API", "CSS"],
    featured: false,
  },
];

export default function Projects() {
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section projects-section">
      <h2 className="section-title fade-up">Projects</h2>

      <div className="bento-grid">
        {/* Featured Project - Large Card */}
        {featuredProject && (
          <article className="bento-featured fade-up">
            <div className="bento-featured-image">
              <img
                src={process.env.PUBLIC_URL + featuredProject.image}
                alt={featuredProject.title}
              />
              <div className="featured-badge">
                <FaStar /> Featured
              </div>
            </div>
            <div className="bento-featured-content">
              <h3 className="bento-title">{featuredProject.title}</h3>
              <p className="bento-desc">{featuredProject.desc}</p>
              <div className="bento-tech">
                {featuredProject.tech.map((t, i) => (
                  <span key={i} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="bento-links">
                <a
                  href={featuredProject.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="bento-btn github"
                >
                  <FaGithub /> View Code
                </a>
              </div>
            </div>
          </article>
        )}

        {/* Other Projects - Stacked Cards */}
        <div className="bento-stack">
          {otherProjects.map((p) => (
            <article key={p.id} className="bento-card fade-up">
              <div className="bento-card-image">
                <img src={process.env.PUBLIC_URL + p.image} alt={p.title} />
              </div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">{p.title}</h3>
                <p className="bento-card-desc">{p.desc}</p>
                <div className="bento-tech small">
                  {p.tech.map((t, i) => (
                    <span key={i} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="bento-card-link"
                >
                  <FaGithub /> View Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
