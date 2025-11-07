import React from "react";
import "./styles/Projects.css";

const projects = [
  {
    id: 1,
    title: "Sweet Shop",
    desc: "A demo e-commerce app with product listings, a client-side cart, and a Node/Express backend for serving data.",
    image: "/images/sweet_shop.png",
    repo: "https://github.com/Sudeepkumar0/Sweet-shop",
    // poster will be provided later; using CSS background for now
  },
  {
    id: 2,
    title: "Node Farm",
    desc: "A small Node.js/Express app that provides a REST API and simple UI to manage farm produce and inventory.",
    image: "/images/node_farm.png",
    repo: "https://github.com/Sudeepkumar0/NODE_FARM",
  },
  {
    id: 3,
    title: "News App",
    desc: "A responsive news aggregator that fetches articles from public APIs, supports category filtering, and presents headlines with thumbnails.",
    image: "/images/news.png",
    repo: "https://github.com/Sudeepkumar0/News_app",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <h2 className="section-title fade-up">Projects</h2>

      <div className="projects-grid">
        {projects.map((p) => (
          <article key={p.id} className="project-card fade-up">
            <div className={`project-visual visual-${p.id}`} aria-hidden>
              {p.image && (
                <img
                  className="project-poster"
                  src={process.env.PUBLIC_URL + p.image}
                  alt={p.title}
                />
              )}
              <div className="project-number">{p.id}</div>
            </div>

            <div className="project-body">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              {p.repo && (
                <a
                  className="project-cta"
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
