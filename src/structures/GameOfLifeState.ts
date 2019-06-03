import {Cell, emptyCell} from "./Cell";

export type GameOfLifeState = {
  rows: number;
  cols: number;
  cells: Cell[][];
};

export const getEmptyGameOfLifeState = (rows: number, cols: number): GameOfLifeState => {
  let cells: Cell[][] = [];
  for (let col = 0; col < cols; col++) {
    cells.push([]); // initial row preparation
    for (let row = 0; row < rows; row++) {
      cells[col][row] = emptyCell;
    }
  }

  return {
    rows,
    cols,
    cells
  }
};

export const getRandomGameOfLifeState = (rows: number, cols: number): GameOfLifeState => {
  let cells: Cell[][] = [];
  for (let col = 0; col < cols; col++) {
    cells.push([]); // initial row preparation
    for (let row = 0; row < rows; row++) {
      cells[col][row] = [~~(Math.random() < 0.5) as 0 | 1];
    }
  }

  return {
    rows,
    cols,
    cells
  }
};
