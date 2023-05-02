import React, { useState } from "react";
import { createRoot } from "react-dom/client";
// import { Board } from './Board.jsx'

const App = () => {

    const row = 30, col = 30; 

    const randomGrid = () => {
        const rows = []; 
        for (let i = 0; i < row; i++){
            rows.push(Array.from(Array(col), () => 
                Math.floor(Math.random() * 2)
            ))
        }
        return rows; 
    };

    const [ grid, setGrid ] = useState(() => {
        return randomGrid(); 
    })

    const deadOrAlive = (row, col) =>{
        const newGrid = [ ... grid ]; 
        newGrid[row][col] = newGrid[row][col] ? 0 : 1; 
        setGrid(newGrid); 
    }

    //Accessibility: allows users to navigate through grid cells using keyboard (tab and arrows)
    //Toggle with 'Enter' key 
    const tabDeadOrAlive = (e, row, col ) => {
        let newRow = row, newCol = col;
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' 
        || e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
            e.preventDefault(); 
            switch (e.key) { 
                case 'ArrowUp':
                    newRow = newRow === 0 ? grid.length - 1 : newRow - 1;
                    break;
                case 'ArrowDown':
                    newRow = newRow === grid.length - 1 ? 0 : newRow + 1;
                    break;
                case 'ArrowLeft':
                    newCol = newCol === 0 ? grid[0].length - 1 : newCol - 1;
                    break;
                case 'ArrowRight':
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
        if (e.key === 'Enter'){
            e.preventDefault();
            deadOrAlive(newRow, newCol)
        }
    }

    return (
    <div>
        <h1> Game of Life </h1>
        <div className = 'board'>
        {
        grid.map((rows, rowIndex) => 
        rows.map((col, colIndex) => 
            <div className = {`cell ${col ? 'alive' : ''}`}
            id = {`cell-${rowIndex}-${colIndex}`}
            role = 'button'
            key = {`${rowIndex}${colIndex}`}
            aria-label = {col ? 'alive cell' : 'dead cell'}
            onClick = {() => {
                deadOrAlive(rowIndex, colIndex)
            }}
            tabIndex={0}
            onKeyDown = {(e) => {
                tabDeadOrAlive(e, rowIndex, colIndex)
            }}
            style = {{
                width: 20,
                height: 20, 
                border: '1px solid #071E22'
            }}
            />
        ))
      }
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);