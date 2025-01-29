import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

type Board = number[][];

const Game2048: React.FC = () => {
  const [board, setBoard] = useState<Board>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const initializeBoard = useCallback(() => {
    const newBoard: Board = Array(4).fill(null).map(() => Array(4).fill(0));
    addNewTile(newBoard);
    addNewTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  const addNewTile = (currentBoard: Board): void => {
    const emptyCells: [number, number][] = [];
    currentBoard.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) emptyCells.push([i, j]);
      });
    });

    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const move = (direction: 'up' | 'down' | 'left' | 'right'): void => {
    if (gameOver) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    let moved = false;
    let newScore = score;

    // Rotate board to simplify logic
    const rotateBoard = (b: Board, times: number): Board => {
      let result = [...b];
      for (let i = 0; i < times; i++) {
        result = result[0].map((_, index) =>
          result.map(row => row[index]).reverse()
        );
      }
      return result;
    };

    // Get rotation count based on direction
    const rotations = {
      up: 3,    // Changed from 1 to 3
      right: 2,
      down: 1,  // Changed from 3 to 1
      left: 0
    };

    // Rotate board to make all movements leftward
    let rotated = rotateBoard(newBoard, rotations[direction]);

    // Move and merge tiles
    for (let i = 0; i < 4; i++) {
      const row = rotated[i];
      const newRow = row.filter(cell => cell !== 0);
      
      for (let j = 0; j < newRow.length - 1; j++) {
        if (newRow[j] === newRow[j + 1]) {
          newRow[j] *= 2;
          newScore += newRow[j];
          newRow.splice(j + 1, 1);
          moved = true;
        }
      }
      
      while (newRow.length < 4) newRow.push(0);
      
      if (row.join(',') !== newRow.join(',')) moved = true;
      rotated[i] = newRow;
    }

    // Rotate back
    rotated = rotateBoard(rotated, (4 - rotations[direction]) % 4);

    if (moved) {
      addNewTile(rotated);
      setBoard(rotated);
      setScore(newScore);
      
      // Check for game over
      const isGameOver = !canMove(rotated);
      if (isGameOver) setGameOver(true);
    }
  };

  const canMove = (currentBoard: Board): boolean => {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) return true;
      }
    }

    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = currentBoard[i][j];
        if (
          (i < 3 && current === currentBoard[i + 1][j]) ||
          (j < 3 && current === currentBoard[i][j + 1])
        ) {
          return true;
        }
      }
    }

    return false;
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          move('up');
          break;
        case 'ArrowDown':
          move('down');
          break;
        case 'ArrowLeft':
          move('left');
          break;
        case 'ArrowRight':
          move('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [board, gameOver]);

  const getTileColor = (value: number): string => {
    const colors: { [key: number]: string } = {
      2: 'bg-gray-200',
      4: 'bg-orange-200',
      8: 'bg-orange-300',
      16: 'bg-orange-400',
      32: 'bg-orange-500',
      64: 'bg-orange-600',
      128: 'bg-yellow-400',
      256: 'bg-yellow-500',
      512: 'bg-yellow-600',
      1024: 'bg-yellow-700',
      2048: 'bg-yellow-800'
    };
    return colors[value] || 'bg-gray-800';
  };

  const getTextColor = (value: number): string => {
    return value <= 4 ? 'text-gray-800' : 'text-white';
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-lg">
          Score: {score}
        </div>
        <button
          onClick={initializeBoard}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw size={20} />
          New Game
        </button>
      </div>

      <div className="bg-gray-700 p-4 rounded-xl">
        <div className="grid grid-cols-4 gap-2">
          {board.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`
                  ${getTileColor(cell)}
                  ${getTextColor(cell)}
                  w-full aspect-square rounded-lg
                  flex items-center justify-center
                  text-2xl font-bold
                  transition-all duration-100
                `}
              >
                {cell !== 0 && cell}
              </div>
            ))
          )}
        </div>
      </div>

      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold text-red-600">Game Over!</p>
          <button
            onClick={initializeBoard}
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="mt-4 text-gray-600 text-center">
        <p>Use arrow keys to move tiles</p>
      </div>
    </div>
  );
};

export default Game2048;