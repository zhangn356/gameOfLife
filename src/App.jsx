import { createRoot } from "react-dom/client";
import Board from "./Board.jsx";
import GameOfLifeBanner from "../assets/GameOfLifeBanner.png";

export default function App() {
  return (
    <div>
      <img
        src={GameOfLifeBanner.toString()}
        className="banner"
        alt="Game of Life Banner"
        data-testid="banner"
      ></img>

      <Board rows={25} cols={30} />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
