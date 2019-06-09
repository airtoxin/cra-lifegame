import React, { useEffect, useState } from "react";
import {
  getEmptyGameOfLifeState,
  getRandomGameOfLifeState
} from "./structures/GameOfLifeState";
import { useConwaysGameOfLife } from "./hooks/useConwaysGameOfLife";
import { Field } from "./components/Field";
import { css } from "emotion";
import { Stats } from "./components/Stats";
import { Controls } from "./components/Controls";

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

  return (
    <div className={grid}>
      <div className="controls">
        <Controls
          running={running}
          onChangeRunning={setRunning}
          onReset={() => {
            setState(getRandomGameOfLifeState(SIZE, SIZE, density));
            setGeneration(1);
          }}
          density={density}
          onChangeDensity={setDensity}
          born={born}
          onChangeBorn={setBorn}
          survive={survive}
          onChangeSurvive={setSurvive}
        />
      </div>

      <div className="app">
        <Field
          canvas={{
            width: SIZE * CELL_SIZE,
            height: SIZE * CELL_SIZE
          }}
          cellSize={CELL_SIZE}
          state={state}
        />
      </div>

      <div className="stats">
        <Stats generation={generation} stat={stat} />
      </div>
    </div>
  );
};

const grid = css({
  display: "grid",
  gridTemplateColumns: "12em 1fr",
  gridTemplateRows: "1fr 16em",
  gridTemplateAreas: `"controls app" "controls stats"`,

  ".controls": {
    gridArea: "controls"
  },

  ".app": {
    gridArea: "app"
  },

  ".stats": {
    gridArea: "stats"
  }
});
