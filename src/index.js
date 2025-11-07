import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize scroll-triggered reveal animations for elements with .fade-up
function initScrollReveal() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window))
    return;

  const opts = { root: null, rootMargin: "0px", threshold: 0.12 };

  // core observer that toggles the reveal class when elements enter/leave viewport
  // We intentionally DO NOT unobserve so animations can replay every time the
  // element re-enters the viewport. To opt-out of replays, add class 'once'
  // to the element; to opt-out entirely add 'no-animate'.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (!el || el.classList.contains("no-animate")) return;
      if (entry.isIntersecting) {
        el.classList.add("in-view");
        // if element explicitly only wants to animate once, stop observing after first reveal
        if (el.classList.contains("once")) {
          io.unobserve(el);
        }
      } else {
        // remove the in-view class when it leaves viewport so animation can replay
        el.classList.remove("in-view");
      }
    });
  }, opts);

  // which elements should receive the .fade-up helper automatically
  const autoSelectors = [
    "header",
    "main",
    "section",
    ".card",
    ".hero",
    ".hero-inner",
    ".hero-content",
    "nav",
    ".container > *",
    ".skill-card",
    ".about-grid",
  ];

  // add fade-up class to matching elements if not already present
  function addFadeUpToAll() {
    const nodes = document.querySelectorAll(autoSelectors.join(","));
    nodes.forEach((n) => {
      if (!(n instanceof HTMLElement)) return;
      if (
        !n.classList.contains("fade-up") &&
        !n.classList.contains("no-animate")
      ) {
        n.classList.add("fade-up");
        io.observe(n);
      } else if (n.classList.contains("fade-up")) {
        io.observe(n);
      }
    });

    // also observe any explicit .fade-up elements already in DOM
    document.querySelectorAll(".fade-up").forEach((el) => {
      if (!el.classList.contains("in-view")) io.observe(el);
    });
  }

  // initial pass
  addFadeUpToAll();

  // watch for future DOM additions (single-page apps may add nodes dynamically)
  const mo = new MutationObserver((muts) => {
    muts.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        // if the added node matches our selectors, add fade-up and observe it
        try {
          if (node.matches && autoSelectors.some((sel) => node.matches(sel))) {
            if (
              !node.classList.contains("fade-up") &&
              !node.classList.contains("no-animate")
            ) {
              node.classList.add("fade-up");
            }
            io.observe(node);
          }
        } catch (e) {
          // ignore invalid selector errors
        }

        // also check descendants
        autoSelectors.forEach((sel) => {
          node.querySelectorAll &&
            node.querySelectorAll(sel).forEach((n) => {
              if (
                n instanceof HTMLElement &&
                !n.classList.contains("fade-up") &&
                !n.classList.contains("no-animate")
              ) {
                n.classList.add("fade-up");
                io.observe(n);
              }
            });
        });
      });
    });
  });

  mo.observe(document.body, { childList: true, subtree: true });
}

// Delay initialization so that initial render finishes and elements are present
setTimeout(initScrollReveal, 120);
