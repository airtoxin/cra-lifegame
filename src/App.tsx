import React, {useEffect, useState} from "react";
import {getRandomGameOfLifeState} from "./structures/GameOfLifeState";
import {useConwaysGameOfLife} from "./hooks/useConwaysGameOfLife";
import {Field} from "./components/Field";

const SIZE = 100;
const CELL_SIZE = 4;

export const App: React.FC = () => {
  const [generation, setGeneration] = useState(1);
  const [running, setRunning] = useState(false);
  const [state, setState] = useState(getRandomGameOfLifeState(SIZE, SIZE));
  const { evolve } = useConwaysGameOfLife(state);

  useEffect(() => {
    if (running) {
      setGeneration(generation + 1);
      setState(evolve());
    }
  }, [running, generation]);

  return (
    <div>
      <Field
        canvas={{
          width: SIZE * CELL_SIZE,
          height: SIZE * CELL_SIZE
        }}
        cellSize={CELL_SIZE}
        state={state}
      />
      <button
        onClick={() => setRunning(!running)}
      >{running ? "stop" : "start"}</button>
      <div>gen: {generation}</div>
    </div>
  );
};
