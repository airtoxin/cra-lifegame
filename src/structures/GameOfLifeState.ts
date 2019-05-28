import { Cell } from "./Cell";

export type GameOfLifeState<T> = {
  xs: number;
  ys: number;
  values: {
    [k: number]: Cell<T>;
  };
};

/*
  xs = 12 / ys = 5
        x0 x1 x2 x3 x4 ...
  [y=0]  0  1  2  3  4  5  6  7  8  9 10 11
  [y=1] 12 13 14 15 16 17 18 19 20 21 22 23
  [y=2] 24 25 26 27 28 29 30 31 32 33 34 35
  [y=3] 36 37 38 39 40 41 42 43 44 45 46 47
  [y=4] 48 49 50 51 52 53 54 55 56 57 58 59
 */
const getStateMapKey = (xs: number, x: number, y: number): number => xs * y + x;

export const getCell = <T>(
  self: GameOfLifeState<T>,
  x: number,
  y: number
): Cell<T> | undefined => self.values[getStateMapKey(self.xs, x, y)];

export const setCell = <T>(
  self: GameOfLifeState<T>,
  cell: Cell<T>
): GameOfLifeState<T> =>
  Object.assign({}, self, {
    values: Object.assign({}, self.values, {
      [getStateMapKey(self.xs, cell.x, cell.y)]: cell
    })
  });

export const removeCell = <T>(
  self: GameOfLifeState<T>,
  x: number,
  y: number
): GameOfLifeState<T> => {
  const values = Object.assign({}, self.values);
  delete values[getStateMapKey(self.xs, x, y)];
  return Object.assign({}, self, { values });
};
