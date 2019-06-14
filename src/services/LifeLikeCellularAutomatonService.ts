import { GameOfLifeState } from "../structures/GameOfLifeState";
import { Stat } from "../structures/Stat";
import { Cell, cellProperties } from "../structures/Cell";

export class LifeLikeCellularAutomatonService {
  constructor(
    private ruleString: string,
    private state: GameOfLifeState
  ) {}

  evolve: () => { stat: Stat; state: GameOfLifeState } = () => {
    let newCells = [];
    let born = 0;
    let survive = 0;
    let dead = 0;

    for (let row = 0; row < this.state.rows; row++) {
      let rowCells = [];
      for (let col = 0; col < this.state.cols; col++) {
        let sum = 0;
        for (const [x, y] of LifeLikeCellularAutomatonService.neighbourCellCoordinates) {
          const cell =
            this.state.cells[(row + y + this.state.rows) % this.state.rows][
            (col + x + this.state.cols) % this.state.cols
              ];
          sum += cell[cellProperties.Value];
        }
        const currentCell = this.state.cells[row][col];
        const nextCell: Cell = [
          this.getNext(currentCell[cellProperties.Value], sum)
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
        rows: this.state.rows,
        cols: this.state.cols,
        cells: newCells
      },
      stat
    };
  };

  private getNext = (() => {
    const bornString = this.ruleString.split("/")[0];
    const surviveString = this.ruleString.split("/")[1];

    return (current: number, neighboursCount: number): 0 | 1 =>
      current
        ? (~~surviveString.includes(neighboursCount.toString()) as 0 | 1)
        : (~~bornString.includes(neighboursCount.toString()) as 0 | 1);
  })();

  private static neighbourCellCoordinates = [
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
}
