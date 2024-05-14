import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Kruskal } from "../Algorithms/Kruskal";
import { BFS } from "../Algorithms/BFS";
import "./Maze.css";
import "react-toastify/dist/ReactToastify.css";

const Maze = ({ width, height, walls, setWalls }) => {
  const toastId = React.useRef(null);
  const [clickedCells, setClickedCells] = useState([]);

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
  };

  const data = generateData();
  const winningPath = BFS(walls, width, height, hasWall);

  // Render the table rows
  const renderRows = () => {
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

  // Check if user has won the game
  useEffect(() => {
    if (hasWon(winningPath)) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast("Congratulations! You solved the maze!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setClickedCells([]);
          },
        });
      }
    }
  }, [clickedCells]);

  return (
    <>
      <table className="grid-table">
        <tbody>{renderRows()}</tbody>
      </table>
      <div>
        <button
          className="button"
          onClick={() => {
            setClickedCells([]);
          }}
        >
          clear
        </button>
        <button
          className="button"
          onClick={() => {
            setWalls(Kruskal(width, height));
            setClickedCells([]);
          }}
        >
          new maze
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Maze;
