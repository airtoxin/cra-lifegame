import React, { useEffect, useRef, useState } from "react";
import { Stat } from "../structures/Stat";

export interface Props {
  generation: number;
  stat: Stat;
}

const PIXEL_SIZE = 2;

export const Stats: React.FunctionComponent<Props> = ({ generation, stat }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(1);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const imageData = context.getImageData(
          PIXEL_SIZE,
          0,
          context.canvas.width,
          context.canvas.height
        );
        context.putImageData(imageData, 0, 0);

        if (generation === 1 || generation % 100 === 0) {
          context.fillStyle = "white";
          context.fillRect(
            context.canvas.width - PIXEL_SIZE,
            0,
            context.canvas.width - PIXEL_SIZE,
            context.canvas.height
          );
        }

        const basePixel =
          context.canvas.height / (stat.born + stat.survive + stat.dead);

        const bornY = context.canvas.height - basePixel * stat.born;
        context.fillStyle = "#00ffff";
        context.fillRect(
          context.canvas.width - PIXEL_SIZE,
          bornY,
          PIXEL_SIZE,
          PIXEL_SIZE
        );

        const surviveY = context.canvas.height - basePixel * stat.survive;
        context.fillStyle = "#aaff00";
        context.fillRect(
          context.canvas.width - PIXEL_SIZE,
          surviveY,
          PIXEL_SIZE,
          PIXEL_SIZE
        );

        const deadY = context.canvas.height - basePixel * stat.dead;
        context.fillStyle = "red";
        context.fillRect(
          context.canvas.width - PIXEL_SIZE,
          deadY,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    }
  }, [generation, stat]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (containerRef.current) {
      setCanvasWidth(containerRef.current.clientWidth);
    }
  });

  return (
    <>
      <div ref={containerRef} style={{ width: "100%" }}>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={300}
          style={{ backgroundColor: "black" }}
        />
        <div>Generation: {generation}</div>
        <div>Born: {stat.born}</div>
        <div>Survive: {stat.survive}</div>
        <div>Dead: {stat.dead}</div>
        <div>Total: {stat.born + stat.survive + stat.dead}</div>
      </div>
    </>
  );
};
