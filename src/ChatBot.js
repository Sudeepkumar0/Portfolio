import React, { useState, useRef, useEffect } from "react";
import "./styles/ChatBot.css";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

// Knowledge base about you
const knowledge = {
  name: "G Sudeep Kumar",
  email: "sudeepkumar.connect@gmail.com",
  phone: "+91 8431477305",
  location: "Bangalore, India",
  education: "MCA at NMIT Bangalore",
  roles: [
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Tech Enthusiast",
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "SQL",
    "PostgreSQL",
    "Git",
    "HTML",
    "CSS",
    "Java",
  ],
  about:
    "Computer Science student pursuing MCA at NMIT Bangalore with focus on web development and software engineering. Enjoys building practical, well-tested projects using React, Node.js and SQL. Exploring modern tooling such as TypeScript, containerization, and CI/CD.",
  projects: [
    {
      name: "Sweet Shop",
      desc: "A demo e-commerce app with product listings, a client-side cart, and a Node/Express backend for serving data.",
      github: "https://github.com/Sudeepkumar0/Sweet-shop",
    },
    {
      name: "Node Farm",
      desc: "A small Node.js/Express app that provides a REST API and simple UI to manage farm produce and inventory.",
      github: "https://github.com/Sudeepkumar0/NODE_FARM",
    },
    {
      name: "News App",
      desc: "A responsive news aggregator that fetches articles from public APIs, supports category filtering, and presents headlines with thumbnails.",
      github: "https://github.com/Sudeepkumar0/News_app",
    },
  ],
  socials: {
    github: "https://github.com/sudeepkumar0",
    linkedin: "https://www.linkedin.com/in/g-sudeep-kumar-aa1bb6253/",
    twitter: "https://x.com/Sudeep_kumar001",
  },
  resumeLink: "docs/resume.pdf",
};

// Simple AI response generator
function generateResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  // Greetings
  if (msg.match(/^(hi|hello|hey|hola|namaste|greetings)/i)) {
    return `Hello! 👋 I'm Sudeep's AI assistant. I can tell you about his skills, projects, education, and how to contact him. What would you like to know?`;
  }

  // Name
  if (msg.match(/name|who (are you|is sudeep|is he)|about (you|him|sudeep)/i)) {
    return `I'm the AI assistant for **${knowledge.name}**! ${knowledge.about}`;
  }

  // Skills
  if (
    msg.match(
      /skill|tech|stack|know|proficient|expertise|programming|language/i,
    )
  ) {
    return `**${knowledge.name}'s Technical Skills:**\n\n${knowledge.skills.map((s) => `• ${s}`).join("\n")}\n\nHe specializes in full-stack web development with React and Node.js!`;
  }

  // Projects
  if (msg.match(/project|work|portfolio|built|created|made|develop/i)) {
    let response = `**${knowledge.name}'s Projects:**\n\n`;
    knowledge.projects.forEach((p, i) => {
      response += `**${i + 1}. ${p.name}**\n${p.desc}\n🔗 [GitHub](${p.github})\n\n`;
    });
    return response;
  }

  // Education
  if (
    msg.match(
      /education|study|college|university|degree|qualification|mca|nmit/i,
    )
  ) {
    return `**Education:**\n\n${knowledge.name} is currently pursuing **${knowledge.education}** with a focus on web development and software engineering. He has coursework in algorithms, databases, and software engineering.`;
  }

  // Contact
  if (msg.match(/contact|email|phone|reach|connect|hire|message/i)) {
    return `**Contact ${knowledge.name}:**\n\n📧 Email: ${knowledge.email}\n📱 Phone: ${knowledge.phone}\n📍 Location: ${knowledge.location}\n\nOr use the contact form on this website!`;
  }

  // Location
  if (msg.match(/where|location|live|based|city|country/i)) {
    return `${knowledge.name} is based in **${knowledge.location}** 🇮🇳`;
  }

  // Resume/CV
  if (msg.match(/resume|cv|download|pdf/i)) {
    return `You can download ${knowledge.name}'s resume by clicking [here](${knowledge.resumeLink}) or using the "Download CV" button on the homepage!`;
  }

  // Social links
  if (msg.match(/social|github|linkedin|twitter|link|follow/i)) {
    return `**Connect with ${knowledge.name}:**\n\n🐙 [GitHub](${knowledge.socials.github})\n💼 [LinkedIn](${knowledge.socials.linkedin})\n🐦 [Twitter](${knowledge.socials.twitter})`;
  }

  // Experience / Internship
  if (msg.match(/experience|intern|job|work experience|career/i)) {
    return `${knowledge.name} is actively seeking **internships and collaborative opportunities** to grow as a full-stack developer. He has hands-on experience through personal and open-source projects. Feel free to reach out at ${knowledge.email}!`;
  }

  // Thanks
  if (msg.match(/thank|thanks|thx|appreciate/i)) {
    return `You're welcome! 😊 Is there anything else you'd like to know about ${knowledge.name}?`;
  }

  // Goodbye
  if (msg.match(/bye|goodbye|see you|later|exit|close/i)) {
    return `Goodbye! 👋 Feel free to come back if you have more questions. Have a great day!`;
  }

  // Help
  if (msg.match(/help|what can you|options|commands/i)) {
    return `I can help you with:\n\n• **Skills** - Technical expertise\n• **Projects** - Portfolio work\n• **Education** - Academic background\n• **Contact** - How to reach Sudeep\n• **Resume** - Download CV\n• **Socials** - GitHub, LinkedIn, Twitter\n\nJust ask me anything!`;
  }

  // Default response
  return `I'm not sure I understood that. You can ask me about:\n\n• Sudeep's **skills** and tech stack\n• His **projects** and portfolio\n• **Education** and background\n• How to **contact** him\n• His **resume/CV**\n• **Social media** links\n\nWhat would you like to know?`;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: `Hi there! 👋 I'm Sudeep's AI assistant. Ask me anything about his skills, projects, or how to get in touch!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay for natural feel
    setTimeout(
      () => {
        const botResponse = generateResponse(userMessage);
        setMessages((prev) => [...prev, { type: "bot", text: botResponse }]);
        setIsTyping(false);
      },
      500 + Math.random() * 500,
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple markdown-like rendering for bold and links
  const renderMessage = (text) => {
    // Process bold text
    let processed = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Process links
    processed = processed.replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
    );
    // Process line breaks
    processed = processed.replace(/\n/g, "<br/>");

    return <span dangerouslySetInnerHTML={{ __html: processed }} />;
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <FaRobot className="chatbot-header-icon" />
            <div>
              <div className="chatbot-header-title">AI Assistant</div>
              <div className="chatbot-header-status">Ask me about Sudeep</div>
            </div>
          </div>
          <button
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <FaTimes />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chatbot-message ${msg.type}`}>
              {msg.type === "bot" && <FaRobot className="message-avatar" />}
              <div className="message-bubble">{renderMessage(msg.text)}</div>
            </div>
          ))}
          {isTyping && (
            <div className="chatbot-message bot">
              <FaRobot className="message-avatar" />
              <div className="message-bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="chatbot-input"
          />
          <button
            className="chatbot-send"
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button
        className={`chatbot-fab ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
      >
        <FaRobot />
        <span className="fab-tooltip">Chat with AI</span>
      </button>
    </div>
  );
}
