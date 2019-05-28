import React, {useEffect, useMemo, useRef} from "react";
import { GameOfLifeState } from "./structures/GameOfLifeState";

export interface Props {
  cellSize: number;
  state: GameOfLifeState<boolean>;
}

export const GameOfLifeCanvas: React.FunctionComponent<Props> = ({
  cellSize,
  state: { xs, ys, values }
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(
          0,
          0,
          cellSize * xs,
          cellSize * ys
        );

        ctx.strokeStyle = "blue";

        [...Array(ys)].forEach((_, y) => {
          [...Array(xs)].forEach((_, x) => {
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
          });
        });
      }
    }
  }, [xs, ys, cellSize]);

  return <canvas ref={canvasRef} width={500} height={500} style={{ backgroundColor: "white" }} />;
};
