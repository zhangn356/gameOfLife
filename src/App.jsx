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

    const deadOrAlive = (row, col) =>{
        const newGrid = [ ... grid ]; 
        newGrid[row][col] = newGrid[row][col] ? 0 : 1; 
        setGrid(newGrid); 
    }

    //Accessibility: allows users to navigate through grid cells using keyboard (tab and arrows)
    //Toggle with 'Enter' key 
    const tabDeadOrAlive = (e, row, col ) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' 
        || e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
            e.preventDefault(); 
            let newRow = row, newCol = col;
            switch (e.key) { 
                case 'ArrowUp':
                    newRow = row === 0 ? grid.length - 1 : row - 1;
                    break;
                case 'ArrowDown':
                    newRow = row === grid.length - 1 ? 0 : row + 1;
                    break;
                case 'ArrowLeft':
                    newCol = col === 0 ? grid[0].length - 1 : col - 1;
                    break;
                case 'ArrowRight':
                    newCol = col === grid[0].length - 1 ? 0 : col + 1;
                    break;
                default:
                    break;
                }
                
        if (newRow !== row || newCol !== col) { 
            const newCell = document.getElementById(`col${newRow}${newCol}`);
            newCell.focus();
            return; 
        }
    }
}


    const [ grid, setGrid ] = useState(() => {
        return randomGrid(); 
    })
    console.log(grid);

    return (
    <div>
        <h1> Game of Life </h1>
        <div className = 'board'>
        {
        grid.map((rows, rowIndex) => 
        rows.map((col, colIndex) => 
            <div className = {`col ${col ? 'alive' : ''}`}
            id = {`col${rowIndex}${colIndex}`}
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