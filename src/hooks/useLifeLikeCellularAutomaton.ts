import { useCallback, useMemo, useState } from "react";
import { getRandomGameOfLifeState } from "../structures/GameOfLifeState";
import { LifeLikeCellularAutomatonService } from "../services/LifeLikeCellularAutomatonService";

export const useLifeLikeCellularAutomaton = (size: number, ruleString: string) => {
  const [generation, setGeneration] = useState(1);
  const [density, setDensity] = useState(0.5);
  const [state, setState] = useState(getRandomGameOfLifeState(size, size, density));
  const [stat, setStat] = useState({ born: 0, survive: 0, dead: 0 });

  const lifeLikeCellularAutomatonService = useMemo(() =>
    new LifeLikeCellularAutomatonService(ruleString, state), [ruleString, state]);

  const evolve = useCallback(() => {
    setGeneration(generation + 1);
    const { state: nextState, stat: nextStat } = lifeLikeCellularAutomatonService.evolve();
    setState(nextState);
    setStat(nextStat);
  }, [generation]);

  const reset = useCallback(() => {
    setState(getRandomGameOfLifeState(size, size, density));
    setGeneration(1);
  }, [density]);

  return {
    evolve,
    reset,
    generation,
    state,
    stat,
    density,
    setDensity
  };
};
