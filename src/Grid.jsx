import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.cols}, 35px)`}; 
  grid-template-rows: ${(props) => `repeat(${props.rows}, 35px)`};
  gap: 5px; /* Adjusted spacing */
  background: #000;
  border: 2px solid #fff;
  margin : 20px;
`;

const Cell = styled.div`
  width: 35px; /* Increased size */
  height: 35px;
  background-color: ${(props) => props.color || "#1a1a1a"};
  opacity: ${(props) => props.opacity || 1};
  transition: background-color 1s ease, opacity 0.5s ease; /* Smooth transitions */
  box-shadow: ${(props) =>
    props.color ? `0px 0px 10px ${props.color}` : "none"}; /* Added shadow effect */
`;

const Grid = ({ gridData }) => {
  const rows = gridData.length;
  const cols = gridData[0]?.length || 0;

  return (
    <GridContainer rows={rows} cols={cols}>
      {gridData.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            color={cell?.color || null}
            opacity={cell?.opacity || null}
          />
        ))
      )}
    </GridContainer>
  );
};

export default Grid;
