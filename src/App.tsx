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
  const [born, setBorn] = useState("3");
  const [survive, setSurvive] = useState("23");
  const ruleString = `B${born}/S${survive}`;
  const { evolve } = useConwaysGameOfLife(state, ruleString);

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
      <div>B <input type="text" value={born} onChange={e => setBorn(e.target.value)}/> / S <input type="text" value={survive} onChange={e => setSurvive(e.target.value)}/></div>
      <div>{ruleString}</div>
      <div>gen: {generation}</div>
    </div>
  );
};
