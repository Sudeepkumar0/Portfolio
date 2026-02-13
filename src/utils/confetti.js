// Simple confetti animation
export function triggerConfetti() {
  const colors = [
    "#3c78c8",
    "#64b4ff",
    "#ff6b6b",
    "#ffd93d",
    "#6bcb77",
    "#9b59b6",
  ];
  const confettiCount = 100;
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99999;
    overflow: hidden;
  `;
  document.body.appendChild(container);

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 2 + 2;
    const delay = Math.random() * 0.5;

    confetti.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      top: -20px;
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      animation: confettiFall ${animationDuration}s ease-out ${delay}s forwards;
      transform: rotate(${Math.random() * 360}deg);
    `;
    container.appendChild(confetti);
  }

  // Add keyframes if not already present
  if (!document.getElementById("confetti-keyframes")) {
    const style = document.createElement("style");
    style.id = "confetti-keyframes";
    style.textContent = `
      @keyframes confettiFall {
        0% {
          transform: translateY(0) rotate(0deg) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg) scale(0.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Cleanup
  setTimeout(() => {
    container.remove();
  }, 4000);
}
