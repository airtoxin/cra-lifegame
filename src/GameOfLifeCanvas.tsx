import React, {useEffect, useMemo, useRef} from "react";
import { GameOfLifeState } from "./structures/GameOfLifeState";
import { Stage, Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

export interface Props {
  cellSize: number;
  state: GameOfLifeState<boolean>;
}

export const GameOfLifeCanvas: React.FunctionComponent<Props> = ({
  cellSize,
  state: { xs, ys, values }
}) => {
  return (
    <Stage
      width={500}
      height={500}
    >
      <Sprite texture={PIXI.Texture.from("https://i.imgur.com/IaUrttj.png")}/>
    </Stage>
  );
};
