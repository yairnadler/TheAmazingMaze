import logo from "./logo.svg";
import "./App.css";
import Maze from "./Components/Maze";
import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { Kruskal } from "./Algorithms/Kruskal";

function App() {
  const [difficulty, setDifficulty] = useState();
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [walls, setWalls] = useState(Kruskal(width, height));

  useEffect(() => {
    if (difficultySelected) {
      switch (difficulty) {
        case "easy":
          setWidth(5);
          setHeight(5);
          setWalls(Kruskal(5, 5));
          break;
        case "medium":
          setWidth(10);
          setHeight(10);
          setWalls(Kruskal(10, 10));
          break;
        case "hard":
          setWidth(15);
          setHeight(15);
          setWalls(Kruskal(15, 15));
          break;
        case "expert":
          setWidth(20);
          setHeight(20);
          setWalls(Kruskal(20, 20));
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
        />
      </header>
    </div>
  );
}

export default App;
