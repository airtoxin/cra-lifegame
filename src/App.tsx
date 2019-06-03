import React, { useEffect, useState } from "react";
import { GameOfLifeCanvas } from "./GameOfLifeCanvas";
import {GameOfLifeState} from "./structures/GameOfLifeState";

export const App: React.FC = () => {
  const [state, setState] = useState<GameOfLifeState<boolean>>({
    xs: 100,
    ys: 100,
    values: {}
  });

  return (
    <GameOfLifeCanvas
      canvasSize={{
        width: 500,
        height: 500
      }}
      cellSize={5}
      state={state}
      onUpdateState={setState}
    />
  );
};
