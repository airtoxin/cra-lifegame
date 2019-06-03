import React, { useEffect, useState } from "react";
import { GameOfLifeCanvas } from "./GameOfLifeCanvas";

export const App: React.FC = () => {
  return (
    <GameOfLifeCanvas
      canvasSize={{
        width: 500,
        height: 500
      }}
      cellSize={5}
      state={{
        xs: 100,
        ys: 100,
        values: {}
      }}
    />
  );
};
