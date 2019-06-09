import { GameOfLifeState } from "../structures/GameOfLifeState";
import { useCallback, useMemo } from "react";
import { Cell, cellProperties } from "../structures/Cell";

export type Stat = {
  born: number;
  survive: number;
  dead: number;
};

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
  const evolve = useCallback((): { stat: Stat; state: GameOfLifeState } => {
    const getNext = parseRuleString(ruleString);
    let newCells = [];
    let born = 0;
    let survive = 0;
    let dead = 0;

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
        const currentCell = state.cells[row][col];
        const nextCell: Cell = [
          getNext(currentCell[cellProperties.Value], sum)
        ];
        rowCells.push(nextCell);
        // stat
        if (
          currentCell[cellProperties.Value] === 0 &&
          nextCell[cellProperties.Value] === 1
        ) {
          born += 1;
        } else if (nextCell[cellProperties.Value] === 0) {
          dead += 1;
        } else {
          survive += 1;
        }
      }
      newCells.push(rowCells);
    }
    const stat = {
      born,
      survive,
      dead
    };

    return {
      state: {
        rows: state.rows,
        cols: state.cols,
        cells: newCells
      },
      stat
    };
  }, [state, ruleString]);

  return {
    evolve
  };
};
