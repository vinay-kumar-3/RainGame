import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Grid from "./Grid";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: #fff;
  text-shadow: 1px 0px 3px white;
`;

const Controls = styled.div`
  margin: 10px;
  display: flex;
  gap: 15px;

  button {
    border: none;
    border-radius: 5px;
    font-family: "Rajdhani", serif;
    font-size: 16px;
    font-weight: 900;
    cursor: pointer;
    background: #4caf50;
    color: white;
    text-shadow: 1px 0px 0px white;
    letter-spacing:0.09rem;
    padding:15px;
    transition: background-color 0.3s ease;
  }
  button:hover{
  border:1px solid white;
  padding:14px;
  background:#6fdc6f;
  }
`;

const App = () => {
  const rows = 15;
  const cols = 20;
  const [grid, setGrid] = useState([]);
  const [globalColor, setGlobalColor] = useState("rgb(255, 255, 255)"); // Initial color
  const [isRunning, setIsRunning] = useState(true);

  // Initialize the grid
  useEffect(() => {
    setGrid(
      Array(rows)
        .fill()
        .map(() => Array(cols).fill(null))
    );
  }, [rows, cols]);

  // Update rain drops
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.slice());

        for (let col = 0; col < cols; col++) {
          // Randomly start a drop in the column from the top
          if (Math.random() > 0.95 && !newGrid[0][col]) {
            const dropLength = Math.max(3, Math.floor(Math.random() * 5) + 3);
            for (let i = 0; i < dropLength && i < rows; i++) {
              newGrid[i][col] = {
                color: globalColor,
                opacity: i * 0.2 + 0.2, // Increasing opacity for lower cells
              };
            }
          }

          // Move drops down
          for (let row = rows - 1; row >= 0; row--) {
            if (newGrid[row][col]) {
              const nextRow = row + 1;
              if (nextRow < rows && !newGrid[nextRow][col]) {
                newGrid[nextRow][col] = newGrid[row][col];
                newGrid[row][col] = null;
              } else if (nextRow >= rows) {
                newGrid[row][col] = null; // Remove drop when it exits the grid
              }
            }
          }
        }
        return newGrid;
      });
    }, 200); // Faster update speed (200ms interval for movement)

    return () => clearInterval(interval);
  }, [cols, rows, globalColor, isRunning]);

  // Change global color every 10 seconds and update existing drops
  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      const newColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      setGlobalColor(newColor);

      // Update existing drops to match the new color with smooth transition
      setGrid((prevGrid) =>
        prevGrid.map((row) =>
          row.map((cell) => (cell ? { ...cell, color: newColor } : null))
        )
      );
    }, 10000); // Change colors every 10 seconds (10000ms)

    return () => clearInterval(colorChangeInterval);
  }, []);

  // Toggle simulation
  const toggleRunning = () => setIsRunning(!isRunning);

  return (
    <AppContainer>
      <h1>Falling Rain Simulation</h1>
      <Controls>
        <button onClick={toggleRunning}>
          {isRunning ? "PAUSE" : "START"}
        </button>
      </Controls>
      <Grid gridData={grid} />
    </AppContainer>
  );
};

export default App;
