import React, {useState} from "react";
import { GameOfLifeState } from "./structures/GameOfLifeState";
import { Stage, Sprite } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";

export interface Props {
  cellSize: number;
  state: GameOfLifeState<boolean>;
}

export const GameOfLifeCanvas: React.FunctionComponent<Props> = ({
  cellSize,
  state: { xs, ys, values }
}) => {

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  return (
    <Stage
      width={500}
      height={500}
    >
      <Sprite
        texture={PIXI.Texture.from("https://i.imgur.com/IaUrttj.png")}
        interactive
        buttonMode
        x={x}
        y={y}
        pointerdown={() => {
          setX(Math.random() * 100);
          setY(Math.random() * 100);
        }}
      />
    </Stage>
  );
};
