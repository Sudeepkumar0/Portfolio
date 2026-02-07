import React, { useState, useEffect, useRef } from "react";
import "./styles/TechNews.css";
import {
  FaNewspaper,
  FaRocket,
  FaCode,
  FaMicrochip,
  FaCloud,
  FaRobot,
} from "react-icons/fa";

// Fallback tech news/facts when API is unavailable
const fallbackNews = [
  {
    title: "React 19 introduces new compiler for automatic optimizations",
    icon: <FaCode />,
  },
  {
    title: "AI coding assistants are revolutionizing software development",
    icon: <FaRobot />,
  },
  {
    title: "WebAssembly adoption grows 40% in enterprise applications",
    icon: <FaRocket />,
  },
  {
    title: "Edge computing reduces latency by 75% for real-time apps",
    icon: <FaCloud />,
  },
  {
    title: "Rust becomes the most loved programming language for 8th year",
    icon: <FaCode />,
  },
  {
    title: "Quantum computing achieves new milestone in error correction",
    icon: <FaMicrochip />,
  },
  {
    title: "TypeScript 6.0 brings pattern matching and pipe operator",
    icon: <FaCode />,
  },
  {
    title: "Kubernetes 2.0 simplifies container orchestration",
    icon: <FaCloud />,
  },
  {
    title: "Neural networks can now generate production-ready code",
    icon: <FaRobot />,
  },
  {
    title: "Next.js 15 introduces revolutionary streaming SSR",
    icon: <FaRocket />,
  },
  {
    title: "GraphQL federation becomes industry standard for APIs",
    icon: <FaCode />,
  },
  {
    title: "5G enables new possibilities for IoT development",
    icon: <FaMicrochip />,
  },
];

export default function TechNews() {
  const [news, setNews] = useState(fallbackNews);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  // Try to fetch real news (optional - using fallback for reliability)
  useEffect(() => {
    // Using fallback news for now to avoid API key requirements
    // You can integrate a real news API here (e.g., NewsAPI, HackerNews)
    setNews(fallbackNews);
  }, []);

  return (
    <section
      className={`tech-news-section ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
      aria-label="Latest Tech News"
    >
      <div className="news-header">
        <FaNewspaper className="news-icon" />
        <span className="news-label">Latest in Tech</span>
        <div className="news-pulse"></div>
      </div>

      <div className="news-marquee">
        <div className="news-track">
          {news.concat(news).map((item, i) => (
            <div key={i} className="news-item">
              <span className="news-item-icon">{item.icon}</span>
              <span className="news-item-text">{item.title}</span>
              <span className="news-divider">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="news-glow"></div>
    </section>
  );
}
