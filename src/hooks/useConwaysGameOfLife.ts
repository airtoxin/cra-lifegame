import {GameOfLifeState} from "../structures/GameOfLifeState";
import {useCallback} from "react";
import {Cell, cellProperties} from "../structures/Cell";

const neighbourCellCoordinates = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  // [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
];

export const useConwaysGameOfLife = (state: GameOfLifeState) => {
  const evolve = useCallback((): GameOfLifeState => {
    let newCells = [];

    for (let row = 0; row < state.rows; row++) {
      let rowCells = [];
      for (let col = 0; col < state.cols; col++) {

        let sum = 0;
        for (const [x, y] of neighbourCellCoordinates) {
          const cell = state.cells[(row + y + state.rows) % state.rows][(col + x + state.cols) % state.cols];
          sum += cell[cellProperties.Value];
        }
        const newCell: Cell = sum === 3 ? [1] : sum <= 1 || sum >= 4 ? [0] : state.cells[row][col];
        rowCells.push(newCell);
      }
      newCells.push(rowCells);
    }

    return {
      rows: state.rows,
      cols: state.cols,
      cells: newCells
    };
  }, [state]);

  return {
    evolve
  };
};
