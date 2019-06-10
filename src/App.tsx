import React, { useEffect, useState } from "react";
import { getRandomGameOfLifeState } from "./structures/GameOfLifeState";
import { useCellularAutomaton } from "./hooks/useCellularAutomaton";
import { Field } from "./components/Field";
import { css } from "emotion";
import { Stats } from "./components/Stats";
import { Controls } from "./components/Controls";

const CELL_SIZE = 4;

export const App: React.FC = () => {
  const [size, setSize] = useState(100);
  const [generation, setGeneration] = useState(1);
  const [running, setRunning] = useState(false);
  const [density, setDensity] = useState(0.5);
  const [state, setState] = useState(
    getRandomGameOfLifeState(size, size, density)
  );
  const [born, setBorn] = useState("3");
  const [survive, setSurvive] = useState("23");
  const ruleString = `B${born}/S${survive}`;
  const { evolve } = useCellularAutomaton(state, ruleString);
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
          size={size}
          onChangeSize={setSize}
          running={running}
          onChangeRunning={setRunning}
          onReset={() => {
            setState(getRandomGameOfLifeState(size, size, density));
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
            width: size * CELL_SIZE,
            height: size * CELL_SIZE
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
