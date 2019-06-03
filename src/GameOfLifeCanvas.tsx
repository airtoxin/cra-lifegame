import React from "react";
import {GameOfLifeState} from "./structures/GameOfLifeState";
import {Stage} from "@inlet/react-pixi";
import {Rectangle} from "./components/pixi/Rectangle";

export interface Props {
  canvasSize: {
    width: number;
    height: number;
  };
  cellSize: number;
  state: GameOfLifeState<boolean>;
}

export const GameOfLifeCanvas: React.FunctionComponent<Props> = ({
  canvasSize: { width, height },
  cellSize,
  state: { xs, ys, values }
}) => {
  return (
    <Stage width={width} height={height}>
      {
        [...Array(ys)].map((_, gridY) => [...Array(xs)].map((_, gridX) => (
          <Rectangle
            key={`${gridX}_${gridY}`}
            fill={Math.random() * 0xffffff}
            x={gridX * cellSize}
            y={gridY * cellSize}
            width={cellSize}
            height={cellSize}
            interactive
            buttonMode
          />
        )))
      }
    </Stage>
  );
};
