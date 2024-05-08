import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = (props) => {
  const { difficulty, setDifficulty, setDifficultySelected } = props;

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setDifficultySelected(true);
  };

  return (
    <nav className="navbar">  
      <div className="dropdown">
        <div className="dropdown-content">
        <label className="dropdown-title">DIFFICULTY</label>
          <select value={difficulty} onChange={handleDifficultyChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
            <option value="insane">Insane</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
