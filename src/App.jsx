import React from "react";
import { createRoot } from "react-dom/client";
import Board from "./Board.jsx";

const App = () => {
  return (
    <div>
      <h1> Game of Life </h1>
      <Board rows={30} cols={30} />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
