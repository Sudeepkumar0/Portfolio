import React, { useState } from "react";
import "./styles/CodePlayground.css";
import { FaPlay, FaTrash, FaCode, FaArrowLeft } from "react-icons/fa";

const defaultCode = `// Welcome to the Code Playground! 🚀
// Try writing some JavaScript:

function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));
console.log("2 + 2 =", 2 + 2);

// Try creating an array:
const numbers = [1, 2, 3, 4, 5];
console.log("Sum:", numbers.reduce((a, b) => a + b));
`;

export default function CodePlayground({ onClose }) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);

    // Capture console.log output
    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(
        args
          .map((arg) =>
            typeof arg === "object"
              ? JSON.stringify(arg, null, 2)
              : String(arg),
          )
          .join(" "),
      );
    };

    try {
      // eslint-disable-next-line no-new-func
      const result = new Function(code)();
      if (result !== undefined) {
        logs.push(`→ ${result}`);
      }
      setOutput(logs.map((log, i) => ({ type: "log", text: log, id: i })));
    } catch (error) {
      setOutput([{ type: "error", text: `Error: ${error.message}`, id: 0 }]);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  const clearCode = () => {
    setCode("");
    setOutput([]);
  };

  return (
    <div className="playground-page">
      <div className="playground-page-header">
        <button className="playground-back-btn" onClick={onClose}>
          <FaArrowLeft /> Back to Portfolio
        </button>
        <h1 className="playground-page-title">
          <FaCode className="playground-icon" />
          Code Playground
        </h1>
      </div>

      <div className="playground-page-content">
        <p className="playground-subtitle">
          Try writing some JavaScript - it runs right in your browser!
        </p>

        <div className="playground-container">
          <div className="playground-editor">
            <div className="editor-header">
              <span className="editor-dot red"></span>
              <span className="editor-dot yellow"></span>
              <span className="editor-dot green"></span>
              <span className="editor-title">script.js</span>
            </div>
            <textarea
              className="editor-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your JavaScript code here..."
              spellCheck="false"
            />
          </div>

          <div className="playground-output">
            <div className="output-header">
              <span>Console Output</span>
            </div>
            <div className="output-content">
              {output.length === 0 ? (
                <span className="output-placeholder">
                  Click "Run Code" to see output here...
                </span>
              ) : (
                output.map((item) => (
                  <div key={item.id} className={`output-line ${item.type}`}>
                    {item.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="playground-actions">
          <button
            className="playground-btn run"
            onClick={runCode}
            disabled={isRunning}
          >
            <FaPlay /> {isRunning ? "Running..." : "Run Code"}
          </button>
          <button className="playground-btn clear" onClick={clearCode}>
            <FaTrash /> Clear
          </button>
        </div>
      </div>
    </div>
  );
}
