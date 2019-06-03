import React, { useEffect, useState } from "react";
import { GameOfLifeCanvas } from "./GameOfLifeCanvas";

export const App: React.FC = () => {
  const [size, setSize] = useState<number>(10);
  useEffect(() => {
    const id = setInterval(() => {
      setSize(size + 1);
    }, 300);

    return () => clearInterval(id);
  }, [size]);

  return (
    <GameOfLifeCanvas
      canvasSize={{
        width: 500,
        height: 500
      }}
      cellSize={size}
      state={{
        xs: 10,
        ys: 10,
        values: {}
      }}
    />
  );
};
