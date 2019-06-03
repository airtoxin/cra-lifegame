import React, { useState } from "react";
import { GameOfLifeState } from "./structures/GameOfLifeState";
import { Stage, Container } from "@inlet/react-pixi";
import { RoundedRectangle } from "./components/pixi/RoundedRectangle";

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
      <Container>
        <RoundedRectangle
          fill={Math.random() * 0xffffff}
          x={x}
          y={y}
          width={50}
          height={50}
          interactive
          buttonMode
          pointerDown={() => {
            console.log("@1", 1);
            setX(Math.random() * 500);
            setY(Math.random() * 500);
          }}
        />
      </Container>
    </Stage>
  );
};
