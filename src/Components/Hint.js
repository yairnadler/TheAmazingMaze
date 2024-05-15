import React, { useState } from "react";

const Hint = ({ releventCells, winningPath, setHintCell }) => {
  const rearrangedReleventCells = [];
  // update releventCells so that is in the order of the winning path
  for (const cell of winningPath) {
    const index = releventCells.indexOf(cell);
    if (index !== -1) {
        rearrangedReleventCells.push(cell);
    }
  }
  // find the index of the last common cell between the clicked cells and the winning path
  let lastCommonCell = -1;

  for (let i = 0; i < rearrangedReleventCells.length; i++) {
    if (rearrangedReleventCells[i] === winningPath[i]) {
      lastCommonCell = i;
    }
  }
  let hint = winningPath[lastCommonCell + 1];

  const handleClick = () => {
    setHintCell(hint);
    console.log(releventCells, winningPath, hint, lastCommonCell);
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
