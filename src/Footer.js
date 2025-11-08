import React from "react";
import "./styles/Footer.css";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-left">
          <div>© {year} G Sudeep Kumar</div>
          <div className="footer-small">
            <a
              href={process.env.PUBLIC_URL + "/resume.pdf"}
              download="G_Sudeep_Kumar_Resume.pdf"
            >
              Resume
            </a>
            <span className="sep">·</span>
            <a href="/privacy.html">Privacy</a>
          </div>
        </div>

        <div className="footer-right">
          <a
            className="icon-link"
            href="https://github.com/Sudeepkumar0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            className="icon-link"
            href="https://leetcode.com/u/G_Sudeep_kumar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
          >
            <SiLeetcode />
          </a>

          <a
            className="icon-link"
            href="mailto:sudeep@leatcode.com"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
