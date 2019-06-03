import React from "react";
import { GameOfLifeState } from "../structures/GameOfLifeState";
import { Sprite, Stage } from "@inlet/react-pixi";
import { cellProperties } from "../structures/Cell";

export type Props = {
  canvas: {
    width: number;
    height: number;
  };
  cellSize: number;
  state: GameOfLifeState;
};

export const Field: React.FunctionComponent<Props> = props => {
  return (
    <Stage width={props.canvas.width} height={props.canvas.height}>
      {renderCells(props.state, props.cellSize)}
    </Stage>
  );
};

const renderCells = (state: GameOfLifeState, cellSize: number) => {
  return state.cells.flatMap((cols, y) =>
    cols.map((cell, x) => (
      <Sprite
        key={`${x}_${y}`}
        image={cell[cellProperties.Value] ? "/live.png" : "/dead.png"}
        x={x * cellSize}
        y={y * cellSize}
        width={cellSize}
        height={cellSize}
      />
    ))
  );
};
