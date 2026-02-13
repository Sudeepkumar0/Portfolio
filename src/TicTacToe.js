import React, { useState, useEffect, useCallback } from "react";
import "./styles/TicTacToe.css";
import { FaTimes, FaCircle, FaRedo, FaGamepad, FaRobot } from "react-icons/fa";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

export default function TicTacToe({ onClose }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winLine, setWinLine] = useState([]);
  const [botThinking, setBotThinking] = useState(false);

  const checkWinner = (squares) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: combo };
      }
    }
    return null;
  };

  // Bot AI - Simple minimax-like strategy
  const getBotMove = useCallback((currentBoard) => {
    const emptyCells = currentBoard
      .map((cell, i) => (cell === null ? i : null))
      .filter((i) => i !== null);

    // Check if bot can win
    for (let i of emptyCells) {
      const testBoard = [...currentBoard];
      testBoard[i] = "O";
      if (checkWinner(testBoard)?.winner === "O") return i;
    }

    // Block player from winning
    for (let i of emptyCells) {
      const testBoard = [...currentBoard];
      testBoard[i] = "X";
      if (checkWinner(testBoard)?.winner === "X") return i;
    }

    // Take center if available
    if (currentBoard[4] === null) return 4;

    // Take a corner
    const corners = [0, 2, 6, 8].filter((i) => currentBoard[i] === null);
    if (corners.length > 0)
      return corners[Math.floor(Math.random() * corners.length)];

    // Take any available
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }, []);

  // Bot plays after player
  useEffect(() => {
    if (!isPlayerTurn && !winner && !botThinking) {
      setBotThinking(true);
      const timer = setTimeout(() => {
        const botMove = getBotMove(board);
        if (botMove !== undefined) {
          const newBoard = [...board];
          newBoard[botMove] = "O";
          setBoard(newBoard);

          const result = checkWinner(newBoard);
          if (result) {
            setWinner(result.winner);
            setWinLine(result.line);
          } else if (newBoard.every((cell) => cell)) {
            setWinner("draw");
          }
          setIsPlayerTurn(true);
        }
        setBotThinking(false);
      }, 200); // Reduced delay for faster response

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, board, botThinking, getBotMove]);

  const handleClick = (i) => {
    if (board[i] || winner || !isPlayerTurn || botThinking) return;

    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinLine(result.line);
    } else if (newBoard.every((cell) => cell)) {
      setWinner("draw");
    } else {
      setIsPlayerTurn(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinLine([]);
    setBotThinking(false);
  };

  const renderCell = (i) => {
    const isWinCell = winLine.includes(i);
    return (
      <button
        key={i}
        className={`ttt-cell ${board[i] ? "filled" : ""} ${isWinCell ? "win" : ""}`}
        onClick={() => handleClick(i)}
        disabled={!!winner || !isPlayerTurn || botThinking}
      >
        {board[i] === "X" && <FaTimes className="ttt-x" />}
        {board[i] === "O" && <FaCircle className="ttt-o" />}
      </button>
    );
  };

  return (
    <div className="ttt-overlay" onClick={onClose}>
      <div className="ttt-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ttt-close" onClick={onClose}>
          ×
        </button>

        <div className="ttt-header">
          <FaGamepad className="ttt-game-icon" />
          <h3>Tic Tac Toe</h3>
        </div>

        <div className="ttt-players">
          <span className="ttt-player you">
            <FaTimes /> You
          </span>
          <span className="ttt-vs">vs</span>
          <span className="ttt-player bot">
            <FaRobot /> Bot
          </span>
        </div>

        <div className="ttt-status">
          {winner === "draw" ? (
            <span>It's a Draw!</span>
          ) : winner === "X" ? (
            <span className="ttt-winner you-win">You Win! 🎉</span>
          ) : winner === "O" ? (
            <span className="ttt-winner bot-win">Bot Wins! 🤖</span>
          ) : botThinking ? (
            <span className="bot-thinking">Bot is thinking...</span>
          ) : (
            <span>
              Your turn <FaTimes className="ttt-x-small" />
            </span>
          )}
        </div>

        <div className="ttt-board">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => renderCell(i))}
        </div>

        <button className="ttt-reset" onClick={resetGame}>
          <FaRedo /> Play Again
        </button>
      </div>
    </div>
  );
}
