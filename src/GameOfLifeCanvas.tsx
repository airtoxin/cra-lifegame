import React, {useEffect, useRef} from "react";

export interface Props {
  className: string
}

export const GameOfLifeCanvas: React.FunctionComponent<Props> = props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "blue";
        ctx.strokeText("青色でstrokText", 10, 25);
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={props.className}
    />
  );
};
