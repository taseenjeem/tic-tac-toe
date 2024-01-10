import { useState } from "react";

// Square component represents each square in the game board
const Square = ({ value, onSquareClick }) => {
  return (
    <button
      className="bg-slate-500 size-32 rounded-lg border-gray-600 border-4 text-5xl font-semibold text-white relative m-2"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

// Function to check the winner based on the squares filled
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Checking each possible winning line combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Returns the winner (either 'X' or 'O')
    }
  }
  return null; // Returns null if no winner is found
};

// Board component represents the game board layout
const Board = ({ winningStatus, squares, handleClick }) => {
  return (
    <>
      {/* Game Title */}
      <h1 className="text-4xl font-bold italic text-gray-600 text-center underline underline-offset-8">
        Tic-Tac-Toe
      </h1>

      {/* Display Winning Status or Next Player's Turn */}
      <h2 className="text-2xl font-semibold text-center my-5">
        {winningStatus}
      </h2>

      {/* Game Board Squares */}
      <section className="flex justify-center">
        <div>
          <div className="flex">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="flex">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="flex">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
      </section>
    </>
  );
};

// Game component
export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null)); // State for game squares
  const [turn, setTurn] = useState(true); // State to determine player turn

  const winner = calculateWinner(squares); // Check if there's a winner
  let winningStatus;

  if (winner) {
    winningStatus = `Winner is: ${winner} 🥳`; // Display the winner
  } else {
    winningStatus = `Next Player is ${turn ? "X" : "O"}`; // Display next player's turn
  }

  // Function to handle square clicks
  const handleClick = (index) => {
    const newSquares = squares.slice(); // Create a copy of the squares array

    // If square is already filled or game has a winner, do nothing
    if (squares[index] || calculateWinner(squares)) return;

    // Set 'X' or 'O' based on the player's turn
    newSquares[index] = turn ? "X" : "O";

    setSquares([...newSquares]); // Update the squares array
    setTurn(!turn); // Change player turn
  };

  // Render the game components
  return (
    <>
      <Board
        winningStatus={winningStatus}
        squares={squares}
        handleClick={handleClick}
      />
    </>
  );
}
