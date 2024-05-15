import React, { useEffect } from "react";

const Hint = ({ clickedCells, winningPath, width, setHintCell }) => {
  let releventCells = [];
  let index = 0;

  for (let i = 0; i < clickedCells.length; i++) {
    if (winningPath.includes(clickedCells[i])) {
      releventCells.push(clickedCells[i]);
    }
  }

  for (let i = 1; i < releventCells.length - 1; i++) {
    // if the clicked cell is in the winning path and is a neighbour of the last common cell
    if (
      winningPath.includes(releventCells[i]) &&
      (Math.abs(releventCells[i] - winningPath[i - 1]) === 1 ||
        Math.abs(releventCells[i] - winningPath[i - 1]) === width)
    ) {
      index = i;
    }
  }

  let hint = winningPath[index + 1];

  const handleClick = () => {
    setHintCell(hint);
    setTimeout(() => {
      hint = -1;
      setHintCell(hint);
    }, 1000);
  };

  return (
    <button className="button" onClick={handleClick}>
      hint
    </button>
  );
};

export default Hint;
