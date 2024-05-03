import React, { useState } from "react";
// import './Navbar.css';

const Navbar = ({ onDifficultyChange, onClear, onSubmit }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
    onDifficultyChange(event.target.value);
  };

  const handleClear = () => {
    onClear();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <nav className="navbar">
      <p>DIFFICULTY</p>
      <div className="dropdown">
        <div className="dropdown-content">
          <select value={selectedDifficulty} onChange={handleDifficultyChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <div className="buttons-container">
        <button className="clear-btn" onClick={handleClear}>
          Clear
        </button>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
