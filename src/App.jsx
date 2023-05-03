import React from "react";
import { createRoot } from "react-dom/client";
import Board from "./Board.jsx";
import GameOfLifeBanner from '../assets/GameOfLifeBanner.png';

const App = () => {
  return (
    <div>
      <img 
      src = { GameOfLifeBanner } 
      className = 'banner'
      alt = 'Game of Life Banner'></img>

      <Board rows={25} cols={30} />
      
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
