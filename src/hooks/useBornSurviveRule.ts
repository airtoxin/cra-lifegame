import { useState } from "react";

export const useBornSurviveRule = () => {
  const [born, setBorn] = useState("3");
  const [survive, setSurvive] = useState("23");
  const ruleString = `B${born}/S${survive}`;

  return {
    born,
    setBorn,
    survive,
    setSurvive,
    ruleString
  }
};
