import { useState, useRef, useCallback, useEffect } from "react";
import { AiFillCaretRight, AiOutlinePause } from "react-icons/ai";

export default function Board({ rows, cols }) {
  const [grid, setGrid] = useState(() => {
    const gridRows = [];
    for (let i = 0; i < rows; i++) {
      gridRows.push(Array.from(Array(cols), () => 0));
    }
    return gridRows;
  });

  const initialGridRef = useRef(grid);
  const [started, setStart] = useState(false);
  const startedRef = useRef(started);
  startedRef.current = started;

  //represents the eight neighbors surrounding a cell
  const positions = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  const startGame = useCallback(() => {
    if (!startedRef.current) return;
    setGrid((g) => {
      const newGrid = g.map((row, i) => {
        return row.map((cell, j) => {
          let neighbors = 0;
          positions.forEach((position) => {
            const x = i + position[0];
            const y = j + position[1];
            //if neighbor cell is within the bounds of board
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
              //reassign neighbors to the sum of itself and the neighbor cell
              neighbors += g[x][y];
            }
          });
          //any live cell with fewer than 2 live neighbors or more than 3 neighbors dies
          if (neighbors < 2 || neighbors > 3) return 0;
          //any dead cell with exactly three neighbors becomes alive
          if (neighbors === 3) return 1;
          return g[i][j];
        });
      });
      return newGrid;
    });
  });

  useEffect(() => {
    let intervalId;
    if (started) {
      intervalId = setInterval(() => {
        startGame();
      }, 500);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [started]);

  const deadOrAlive = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = newGrid[row][col] ? 0 : 1;
    setGrid(newGrid);
  };

  /* Accessibility: allows users to navigate through grid cells using keyboard (tab and arrows)
  Toggle Cell with 'Enter' key */

  const tabDeadOrAlive = (e, row, col) => {
    let newRow = row,
      newCol = col;
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          newRow = newRow === 0 ? grid.length - 1 : newRow - 1;
          break;
        case "ArrowDown":
          newRow = newRow === grid.length - 1 ? 0 : newRow + 1;
          break;
        case "ArrowLeft":
          newCol = newCol === 0 ? grid[0].length - 1 : newCol - 1;
          break;
        case "ArrowRight":
          newCol = newCol === grid[0].length - 1 ? 0 : newCol + 1;
          break;
        default:
          break;
      }

      if (newRow !== row || newCol !== col) {
        const newCell = document.getElementById(`cell-${newRow}-${newCol}`);
        newCell.focus();
      }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      deadOrAlive(newRow, newCol);
    }
  };

  return (
    <div>
      <div className="gameControls">
        <button
          className="gameButton"
          aria-label={started ? "Pause Game" : "Start Game"}
          title={started ? "Pause" : "Start"}
          onClick={() => {
            setStart(!started);
            if (!started) startedRef.current = true;
          }}
        >
          {started ? <AiOutlinePause /> : <AiFillCaretRight />}
        </button>

        <button
          className="gameButton"
          aria-label="Randomly Generates Cells on Board"
          title="Randomly Generates Cells on Board"
          data-testid="randomizer"
          onClick={() => {
            const gridRows = [];
            for (let i = 0; i < rows; i++) {
              gridRows.push(
                Array.from(Array(cols), () => Math.floor(Math.random() * 2))
              );
            }
            setGrid(gridRows);
          }}
        >
          Randomizer
        </button>

        <button
          className="gameButton"
          aria-label="Reset Game"
          data-testid="reset-button"
          title="Reset"
          onClick={() => {
            setGrid(initialGridRef.current);
          }}
        >
          Reset
        </button>
      </div>

      <div className="instructions">
        {started ? (
          <p> Enjoy Conway&#39;s Game of Life </p>
        ) : (
          <p>
            Instructions: To begin, draw some shapes on the board with your
            mouse
            <br /> or navigate through the board using your tab, arrow, and
            enter keys. <br />
            <em> Alternatively</em>, press the randomizer button for a
            randomized board of live cells.
            <br /> Click <em> Start </em> to see the Game of Life!
          </p>
        )}
      </div>

      <div className="board" data-testid="grid" role="grid">
        {grid.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div
              className={`cell ${col ? "alive" : ""}`}
              id={`cell-${rowIndex}-${colIndex}`}
              data-testid={`cell-${rowIndex}-${colIndex}`}
              role="gridcell"
              key={`${rowIndex}${colIndex}`}
              aria-label={col ? "alive cell" : "dead cell"}
              onClick={() => {
                deadOrAlive(rowIndex, colIndex);
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                tabDeadOrAlive(e, rowIndex, colIndex);
              }}
              style={{
                width: 20,
                height: 20,
                border: "1px solid #071E22",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
