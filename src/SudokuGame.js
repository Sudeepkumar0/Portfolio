import React, { useState } from "react";
import "./styles/TicTacToe.css";

const initialBoard = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];

function isValid(board, row, col, value) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === value || board[i][col] === value) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === value) return false;
    }
  }
  return true;
}

export default function SudokuGame({ onClose }) {
  const [board, setBoard] = useState(initialBoard.map((row) => row.slice()));
  const [selected, setSelected] = useState(null);
  const [won, setWon] = useState(false);
  const [errorCell, setErrorCell] = useState(null);

  // Keyboard input handler
  React.useEffect(() => {
    function onKeyDown(e) {
      if (!selected) return;
      if (e.key >= "1" && e.key <= "9") {
        handleInput(Number(e.key));
      }
      if (e.key === "Backspace" || e.key === "Delete") {
        const [row, col] = selected;
        if (initialBoard[row][col] !== null) return;
        const newBoard = board.map((r) => r.slice());
        newBoard[row][col] = null;
        setBoard(newBoard);
      }
      // Arrow keys navigation
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        const [row, col] = selected;
        let nr = row,
          nc = col;
        if (e.key === "ArrowUp") nr = Math.max(0, row - 1);
        if (e.key === "ArrowDown") nr = Math.min(8, row + 1);
        if (e.key === "ArrowLeft") nc = Math.max(0, col - 1);
        if (e.key === "ArrowRight") nc = Math.min(8, col + 1);
        setSelected([nr, nc]);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, board]);

  function handleSelect(row, col) {
    setSelected([row, col]);
  }

  function handleInput(value) {
    if (!selected) return;
    const [row, col] = selected;
    if (initialBoard[row][col] !== null) return;
    if (value === 0) {
      // Allow clearing cell with 0
      const newBoard = board.map((r) => r.slice());
      newBoard[row][col] = null;
      setBoard(newBoard);
      setErrorCell(null);
      return;
    }
    if (value < 1 || value > 9) return;
    if (!isValid(board, row, col, value)) {
      setErrorCell([row, col]);
      setTimeout(() => setErrorCell(null), 900);
      return;
    }
    const newBoard = board.map((r) => r.slice());
    newBoard[row][col] = value;
    setBoard(newBoard);
    setErrorCell(null);
    // Keep cell selected after input for fast entry
    setSelected([row, col]);
    if (newBoard.every((row) => row.every((cell) => cell !== null))) {
      setWon(true);
    }
  }

  function resetGame() {
    setBoard(initialBoard.map((row) => row.slice()));
    setSelected(null);
    setWon(false);
  }

  return (
    <div className="ttt-overlay" onClick={onClose}>
      <div className="ttt-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ttt-close" onClick={onClose}>
          ×
        </button>
        <div className="ttt-header">
          <span role="img" aria-label="sudoku">
            🔢
          </span>
          <h3>Sudoku Game</h3>
        </div>
        <div className="sudoku-board">
          {board.map((row, r) => (
            <div className="sudoku-row" key={r}>
              {row.map((cell, c) => (
                <button
                  key={c}
                  className={`sudoku-cell ${selected && selected[0] === r && selected[1] === c ? "selected" : ""} ${initialBoard[r][c] !== null ? "fixed" : ""} ${errorCell && errorCell[0] === r && errorCell[1] === c ? "error" : ""}`}
                  style={{
                    borderTop: r % 3 === 0 ? "3px solid #333" : undefined,
                    borderLeft: c % 3 === 0 ? "3px solid #333" : undefined,
                    borderBottom: r === 8 ? "3px solid #333" : undefined,
                    borderRight: c === 8 ? "3px solid #333" : undefined,
                  }}
                  onClick={() => handleSelect(r, c)}
                  disabled={initialBoard[r][c] !== null}
                >
                  {cell !== null ? cell : ""}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="sudoku-inputs">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              className="sudoku-input-btn"
              onClick={() => handleInput(n)}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="sudoku-info">
          {won && <div className="sudoku-win">You solved it! 🎉</div>}
          <button className="ttt-restart" onClick={resetGame}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
