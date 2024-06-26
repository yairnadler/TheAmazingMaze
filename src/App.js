import logo from "./logo.svg";
import "./App.css";
import Maze from "./Components/Maze";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Components/Navbar";
import { Kruskal } from "./Algorithms/Kruskal";

function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [walls, setWalls] = useState(Kruskal(width, height));
  const mazeRef = useRef();

  useEffect(() => {
    if (difficultySelected) {
      switch (difficulty) {
        case "easy":
          setWidth(10);
          setHeight(10);
          setWalls(Kruskal(10, 10));
          mazeRef.current.clearCells();
          break;
        case "medium":
          setWidth(15);
          setHeight(15);
          setWalls(Kruskal(15, 15));
          mazeRef.current.clearCells();
          break;
        case "hard":
          setWidth(20);
          setHeight(20);
          setWalls(Kruskal(20, 20));
          mazeRef.current.clearCells();
          break;
        case "expert":
          setWidth(30);
          setHeight(30);
          setWalls(Kruskal(30, 30));
          mazeRef.current.clearCells();
          break;
        case "insane":
          setWidth(40);
          setHeight(40);
          setWalls(Kruskal(40, 40));
          mazeRef.current.clearCells();
          break;
      }
      setDifficultySelected(false);
    }
  }, [difficultySelected]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Amazing Maze Game</h1>
        <Navbar
          setDifficulty={setDifficulty}
          setDifficultySelected={setDifficultySelected}
        />
        <Maze
          width={width}
          height={height}
          walls={walls}
          setWalls={setWalls}
          difficulty={difficulty}
          ref = {mazeRef}
        />
      </header>
    </div>
  );
}

export default App;
