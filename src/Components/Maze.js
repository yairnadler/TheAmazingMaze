import React, { useEffect, useState } from "react";
import { Kruskal } from "../Algorithms/Kruskal";
import { BFS } from "../Algorithms/BFS";
import "./Maze.css";

const Maze = ({ width, height }) => {
  const [clickedCells, setClickedCells] = useState([]);
  const kruskal = Kruskal(width, height);
  const [maze, setMaze] = useState(kruskal[0]);
  const [walls, setWalls] = useState(kruskal[1]);

  const generateData = () => {
    const data = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push("*");
      }
      data.push(row);
    }
    return data;
  };

  // Convert tuple (i, j) into cell index
  const getCellIndex = (i, j) => {
    return i * width + j;
  };

  // Check if there is a wall between two cells
  const hasWall = (cellIndex, direction) => {
    const neighborIndex = cellIndex + direction;
    return walls.some(
      ([from, to]) =>
        (from === cellIndex && to === neighborIndex) ||
        (from === neighborIndex && to === cellIndex)
    );
  };

  // Check if there user has won the game
  const hasWon = (winningPath) => {
    if (!clickedCells.includes(0)) {
      // Add the start cell to clicked cells
      clickedCells.push(0);
    }
    if (!clickedCells.includes(width * height - 1)) {
      // Add the end cell to clicked cells
      clickedCells.push(width * height - 1);
    }
    console.log(clickedCells);
    if (clickedCells.length !== winningPath.length) {
      return false;
    } else {
      clickedCells.sort();
      winningPath.sort();
      for (let i = 0; i < clickedCells.length; i++) {
        if (clickedCells[i] !== winningPath[i]) {
          return false;
        }
      }
      return true;
    }
  };

  // Handle click event on cell
  const handleClick = (cellIndex, winningPath) => {
    if (clickedCells.includes(cellIndex)) {
      // If cell is already clicked, remove it from clicked cells
      setClickedCells(clickedCells.filter((index) => index !== cellIndex));
    } else {
      // If cell is not clicked, add it to clicked cells
      setClickedCells([...clickedCells, cellIndex]);
    }
    if (hasWon(winningPath)) {
      alert("You won!");
    }
  };

  // Render the table rows
  const renderRows = () => {
    const data = generateData();
    const winningPath = BFS(walls, width, height, data, hasWall);
    return data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <td
            key={cellIndex}
            onClick={() =>
              handleClick(getCellIndex(rowIndex, cellIndex), winningPath)
            }
            className={`${
              getCellIndex(rowIndex, cellIndex) === 0 ||
              getCellIndex(rowIndex, cellIndex) === width * height - 1
                ? "start-end"
                : clickedCells.includes(getCellIndex(rowIndex, cellIndex))
                ? "clicked"
                : ""
            }`}
          >
            {cell}
            {/* Check if there's a wall to the right of the current cell */}
            <div
              className={`wall-right ${
                hasWall(getCellIndex(rowIndex, cellIndex), 1) ? "wall" : ""
              }`}
            />
            {/* Check if there's a wall below the current cell */}
            <div
              className={`wall-bottom ${
                hasWall(getCellIndex(rowIndex, cellIndex), width) ? "wall" : ""
              }`}
            />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <table className="grid-table">
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default Maze;
