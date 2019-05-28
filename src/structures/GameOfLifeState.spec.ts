import "jest";
import {
  GameOfLifeState,
  getCell,
  removeCell,
  setCell
} from "./GameOfLifeState";
import { Cell } from "./Cell";

const createDefaultContext = () => {
  const cell: Cell<boolean> = {
    x: 9,
    y: 9,
    value: true
  };
  const gameOfLifeState: GameOfLifeState<boolean> = {
    xs: 10,
    ys: 10,
    values: {
      99: cell
    }
  };

  return {
    cell,
    gameOfLifeState
  };
};

describe("getCell", () => {
  it("returns cell if exists", () => {
    const { gameOfLifeState, cell } = createDefaultContext();

    expect(getCell(gameOfLifeState, 9, 9)).toEqual(cell);
  });

  it("returns undefined if not exists", () => {
    const { gameOfLifeState, cell } = createDefaultContext();

    expect(getCell(gameOfLifeState, 100, 100)).toBeUndefined();
  });
});

describe("setCell", () => {
  it("set cell if not exists", () => {
    const { gameOfLifeState } = createDefaultContext();
    const newCell: Cell<boolean> = {
      x: 0,
      y: 0,
      value: true
    };

    expect(setCell(gameOfLifeState, newCell)).toEqual({
      ...gameOfLifeState,
      values: {
        ...gameOfLifeState.values,
        0: newCell
      }
    });
  });

  it("update cell if exists", () => {
    const { gameOfLifeState, cell } = createDefaultContext();
    const updatedCell = {
      ...cell,
      value: false
    };

    expect(setCell(gameOfLifeState, updatedCell)).toEqual({
      ...gameOfLifeState,
      values: {
        99: updatedCell
      }
    });
  });
});

describe("removeCell", () => {
  it("delete cell if exists", () => {
    const { gameOfLifeState } = createDefaultContext();

    expect(removeCell(gameOfLifeState, 9, 9)).toEqual({
      ...gameOfLifeState,
      values: {}
    });
  });

  it("effects none if not exists", () => {
    const { gameOfLifeState } = createDefaultContext();

    expect(removeCell(gameOfLifeState, 0, 0)).toEqual(gameOfLifeState);
  });
});
