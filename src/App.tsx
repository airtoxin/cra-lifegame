import React, { useEffect, useState } from "react";
import { Field } from "./components/Field";
import { css } from "emotion";
import { Stats } from "./components/Stats";
import { Controls } from "./components/Controls";
import { useLifeLikeCellularAutomaton } from "./hooks/useLifeLikeCellularAutomaton";
import { useBornSurviveRule } from "./hooks/useBornSurviveRule";

const CELL_SIZE = 4;

export const App: React.FC = () => {
  const [size, setSize] = useState(100);
  const [running, setRunning] = useState(false);
  const {
    born,
    setBorn,
    survive,
    setSurvive,
    ruleString
  } = useBornSurviveRule();

  const {
    evolve,
    reset,
    generation,
    state,
    stat,
    density,
    setDensity
  } = useLifeLikeCellularAutomaton(size, ruleString);

  useEffect(() => {
    if (running) {
      evolve();
    }
  }, [running, evolve]);

  return (
    <div className={grid}>
      <div className="controls">
        <Controls
          size={size}
          onChangeSize={setSize}
          running={running}
          onChangeRunning={setRunning}
          onReset={reset}
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
