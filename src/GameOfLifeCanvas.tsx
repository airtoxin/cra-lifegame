import React, { useState } from "react";
import { GameOfLifeState } from "./structures/GameOfLifeState";
import { Sprite, Stage } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";

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
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  return (
    <Stage width={width} height={height}>
      <Sprite
        texture={PIXI.Texture.from("https://i.imgur.com/IaUrttj.png")}
        interactive
        buttonMode
        x={x}
        y={y}
        pointerdown={() => {
          setX(Math.random() * width);
          setY(Math.random() * height);
        }}
      />
    </Stage>
  );
};
