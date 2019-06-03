import React, {useCallback} from "react";
import {GameOfLifeState, getCell, setCell} from "./structures/GameOfLifeState";
import {Stage} from "@inlet/react-pixi";
import {Rectangle} from "./components/pixi/Rectangle";

export interface Props {
  canvasSize: {
    width: number;
    height: number;
  };
  cellSize: number;
  state: GameOfLifeState<boolean>;
  onUpdateState: (newState: GameOfLifeState<boolean>) => void;
}

export const GameOfLifeCanvas: React.FunctionComponent<Props> = ({
  canvasSize: { width, height },
  cellSize,
  state,
  onUpdateState
}) => {
  const handlePointerDown = useCallback((x: number, y: number) => {
    onUpdateState(setCell(state, { x, y, value: true }));
  }, [state, onUpdateState]);

  return (
    <Stage width={width} height={height}>
      {
        [...Array(state.ys)].map((_, gridY) => [...Array(state.xs)].map((_, gridX) => {
          const cell = getCell(state, gridX, gridY);

          return (
            <Rectangle
              key={`${gridX}_${gridY}`}
              fill={cell ? 0xffffff : 0x000000}
              x={gridX * cellSize}
              y={gridY * cellSize}
              width={cellSize}
              height={cellSize}
              interactive
              buttonMode
              onPointerDown={() => handlePointerDown(gridX, gridY)}
            />
          );
        }))
      }
    </Stage>
  );
};
