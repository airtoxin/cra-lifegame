import React, { useCallback, useEffect, useState } from "react";
import {
  getEmptyGameOfLifeState,
  getRandomGameOfLifeState
} from "./structures/GameOfLifeState";
import { useConwaysGameOfLife } from "./hooks/useConwaysGameOfLife";
import { Field } from "./components/Field";

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

  const handleChangePreset = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case "Replicator": {
          setBorn("1357");
          setSurvive("1357");
          break;
        }
        case "Seeds": {
          setBorn("2");
          setSurvive("");
          break;
        }
        case "B25/S4": {
          setBorn("25");
          setSurvive("4");
          break;
        }
        case "Life without Death": {
          setBorn("3");
          setSurvive("012345678");
          break;
        }
        case "Life": {
          setBorn("3");
          setSurvive("23");
          break;
        }
        case "34 Life": {
          setBorn("34");
          setSurvive("34");
          break;
        }
        case "Diamoeba": {
          setBorn("35678");
          setSurvive("5678");
          break;
        }
        case "2x2": {
          setBorn("36");
          setSurvive("125");
          break;
        }
        case "HighLife": {
          setBorn("36");
          setSurvive("23");
          break;
        }
        case "Day & Night": {
          setBorn("3678");
          setSurvive("34678");
          break;
        }
        case "Morley": {
          setBorn("368");
          setSurvive("245");
          break;
        }
        case "Anneal": {
          setBorn("4678");
          setSurvive("35678");
          break;
        }
      }
    },
    []
  );

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
        <select onChange={handleChangePreset}>
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
