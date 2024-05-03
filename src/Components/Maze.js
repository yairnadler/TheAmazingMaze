import React, { useEffect, useState } from "react";
import { KruskalMaze } from "../Algorithms/KruskalMaze";
import "./Maze.css";

const Maze = ({ width, height }) => {
  const [clickedCells, setClickedCells] = useState([]);
  const [walls, setWalls] = useState(KruskalMaze(width, height));

  // Generate dummy data for the table according to kruskalMaze
  const generateData = () => {
    const data = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push('*');
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

  // Handle click event on cell
  const handleClick = (cellIndex) => {
    if (clickedCells.includes(cellIndex)) {
      // If cell is already clicked, remove it from clicked cells
      setClickedCells(clickedCells.filter((index) => index !== cellIndex));
    } else {
      // If cell is not clicked, add it to clicked cells
      setClickedCells([...clickedCells, cellIndex]);
    }
  };

  // Render the table rows
  const renderRows = () => {
    const data = generateData();
    return data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <td
            key={cellIndex}
            onClick={() => handleClick(getCellIndex(rowIndex, cellIndex))}
            className={`${
              clickedCells.includes(getCellIndex(rowIndex, cellIndex))
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
