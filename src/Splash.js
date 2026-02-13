import React, { useEffect, useRef } from "react";
import "./styles/splash.css";

export default function Splash({ duration = 2500, onFinish }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(60, 120, 200, 0.7)";
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = Math.min(
      80,
      Math.floor((canvas.width * canvas.height) / 15000),
    );
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw connections
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(60, 120, 200, ${0.4 - (dist / 150) * 0.4})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawConnections();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Finish timeout
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = prefersReduced ? 0 : duration;
    const t = setTimeout(() => {
      onFinish && onFinish();
    }, ms);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [duration, onFinish]);

  return (
    <div className="splash-overlay" role="status" aria-hidden="false">
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="splash-content">
        <div className="splash-code">
          <span className="code-bracket">&lt;</span>
          <span className="code-text">Hello World</span>
          <span className="code-bracket"> /&gt;</span>
          <span className="code-cursor">|</span>
        </div>
      </div>
    </div>
  );
}
