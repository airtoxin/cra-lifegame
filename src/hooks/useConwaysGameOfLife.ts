import { GameOfLifeState } from "../structures/GameOfLifeState";
import { useCallback, useMemo } from "react";
import { Cell, cellProperties } from "../structures/Cell";

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

const parseRuleString = (rule: string) => {
  const bornString = rule.split("/")[0];
  const surviveString = rule.split("/")[1];

  return (current: number, counts: number): 0 | 1 =>
    current
      ? (~~surviveString.includes(counts.toString()) as 0 | 1)
      : (~~bornString.includes(counts.toString()) as 0 | 1);
};

export const useConwaysGameOfLife = (
  state: GameOfLifeState,
  ruleString: string
) => {
  const evolve = useCallback((): GameOfLifeState => {
    const getNext = parseRuleString(ruleString);
    let newCells = [];

    for (let row = 0; row < state.rows; row++) {
      let rowCells = [];
      for (let col = 0; col < state.cols; col++) {
        let sum = 0;
        for (const [x, y] of neighbourCellCoordinates) {
          const cell =
            state.cells[(row + y + state.rows) % state.rows][
              (col + x + state.cols) % state.cols
            ];
          sum += cell[cellProperties.Value];
        }
        const newCell: Cell = [
          getNext(state.cells[row][col][cellProperties.Value], sum)
        ];
        rowCells.push(newCell);
      }
      newCells.push(rowCells);
    }

    return {
      rows: state.rows,
      cols: state.cols,
      cells: newCells
    };
  }, [state, ruleString]);

  return {
    evolve
  };
};
