import React, { useCallback, useEffect, useState } from "react";
import {
  getEmptyGameOfLifeState,
  getRandomGameOfLifeState
} from "./structures/GameOfLifeState";
import { useConwaysGameOfLife } from "./hooks/useConwaysGameOfLife";
import { Field } from "./components/Field";
import {useCellularAutomaton} from "./hooks/useCellularAutomaton";

const SIZE = 100;
const CELL_SIZE = 4;

export const App: React.FC = () => {
  const [generation, setGeneration] = useState(1);
  const [running, setRunning] = useState(false);
  const [density, setDensity] = useState(0.5);
  const [state, setState] = useState(
    getRandomGameOfLifeState(SIZE, SIZE, density)
  );
  const [born, setBorn] = useState("3");
  const [survive, setSurvive] = useState("23");
  const ruleString = `B${born}/S${survive}`;
  const { evolve } = useConwaysGameOfLife(state, ruleString);
  const [stat, setStat] = useState({ born: 0, survive: 0, dead: 0 });

  useEffect(() => {
    if (running) {
      setGeneration(generation + 1);
      const { state: nextState, stat: nextStat } = evolve();
      setState(nextState);
      setStat(nextStat);
    }
  }, [running, generation, evolve]);
  const { getPreset } = useCellularAutomaton();
  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const result = getPreset(value);
    if (result) {
      const [pBorn, pSurvive] = result;
      setBorn(pBorn);
      setSurvive(pSurvive);
    }
  }, [getPreset]);

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
      <button onClick={() => setRunning(!running)}>
        {running ? "stop" : "start"}
      </button>
      <button
        onClick={() => {
          setState(getRandomGameOfLifeState(SIZE, SIZE, density));
          setGeneration(1);
        }}
      >
        reset
      </button>
      <button
        onClick={() => {
          setState(getEmptyGameOfLifeState(SIZE, SIZE));
          setGeneration(1);
        }}
      >
        initialize
      </button>
      <div>
        Density: {density}
        <br />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={density}
          onChange={e => setDensity(Number(e.target.value))}
        />
      </div>
      <div>
        Preset:{" "}
        <select onChange={handleChange}>
          <option value="" />
          <option value="Replicator">Replicator</option>
          <option value="Seeds">Seeds</option>
          <option value="B25/S4">B25/S4</option>
          <option value="Life without Death">Life without Death</option>
          <option value="Life">Life</option>
          <option value="34 Life">34 Life</option>
          <option value="Diamoeba">Diamoeba</option>
          <option value="2x2">2x2</option>
          <option value="HighLife">HighLife</option>
          <option value="Day & Night">Day & Night</option>
          <option value="Morley">Morley</option>
          <option value="Anneal">Anneal</option>
        </select>
      </div>
      <div>
        Born:{" "}
        <input
          type="text"
          value={born}
          onChange={e => setBorn(e.target.value)}
        />
      </div>
      <div>
        Survive{" "}
        <input
          type="text"
          value={survive}
          onChange={e => setSurvive(e.target.value)}
        />
      </div>

      <div>gen: {generation}</div>
      <div>
        <div>Stat</div>
        <div>Born: {stat.born}</div>
        <div>Survive: {stat.survive}</div>
        <div>Dead: {stat.dead}</div>
        <div>Total: {stat.born + stat.survive + stat.dead}</div>
      </div>
    </div>
  );
};
