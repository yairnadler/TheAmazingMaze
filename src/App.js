import logo from "./logo.svg";
import "./App.css";
import Maze from "./Components/Maze";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Amazing Maze Game</h1>
        {/* <Navbar /> */}
        <Maze width={4} height={4} />
      </header>
    </div>
  );
}

export default App;
