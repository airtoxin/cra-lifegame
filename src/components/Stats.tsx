import React, {useEffect, useRef} from "react";
import { Stat } from "../hooks/useConwaysGameOfLife";

export interface Props {
  generation: number;
  stat: Stat;
}

export const Stats: React.FunctionComponent<Props> = ({ generation, stat }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const imageData = context.getImageData(1, 0, context.canvas.width, context.canvas.height);
        context.putImageData(imageData, 0, 0);

        const basePixel = context.canvas.height / (stat.born + stat.survive + stat.dead);

        const bornY = basePixel * stat.born;
        context.fillStyle = "#00ffff";
        context.fillRect(498, bornY, 2, 2);

        const surviveY = basePixel * stat.survive;
        context.fillStyle = "#aaff00";
        context.fillRect(498, surviveY, 2, 2);

        const deadY = basePixel * stat.dead;
        context.fillStyle = "red";
        context.fillRect(498, deadY, 2, 2);
      }
    }
  }, [stat]);

  return (
    <>
      <div>gen: {generation}</div>
      <div>
        <div>Stat</div>
        <div>Born: {stat.born}</div>
        <div>Survive: {stat.survive}</div>
        <div>Dead: {stat.dead}</div>
        <div>Total: {stat.born + stat.survive + stat.dead}</div>
        <canvas ref={canvasRef} width={500} height={100} style={{ backgroundColor: "black" }}/>
      </div>
    </>
  );
};
