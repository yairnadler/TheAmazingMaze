import React, { useEffect } from "react";

const Hint = ({ clickedCells, winningPath, width, setHintCell }) => {
  const releventCells = clickedCells.filter((cell) =>
    winningPath.includes(cell)
  );
  for (let i = 1; i < releventCells.length; i++) {
    if (
      Math.abs(releventCells[i] - releventCells[i - 1]) !== 1 &&
      Math.abs(releventCells[i] - releventCells[i - 1]) !== width
    ) {
      releventCells.pop(i)
    }
  }
  let index = 0;
  for (let i = 0; i < releventCells.length; i++) {
    // if the clicked cell is in the winning path and is a neighbour of the last common cell
    if (
      winningPath.includes(releventCells[i]) &&
      (Math.abs(releventCells[i] - winningPath[i - 1]) === 1 ||
        Math.abs(releventCells[i] - winningPath[i - 1]) === width)
    ) {
      index = i;
    }
  }

  let hint = winningPath[winningPath.indexOf(releventCells[index]) + 1];

  const handleClick = () => {
    setHintCell(hint);
    console.log(releventCells, winningPath, hint, index);
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
