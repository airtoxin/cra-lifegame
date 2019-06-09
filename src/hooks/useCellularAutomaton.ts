import React, { useCallback } from "react";

export const useCellularAutomaton = () => {
  const getPreset = useCallback((presetName: string):
    | [string, string]
    | undefined => {
    switch (presetName) {
      case "Replicator":
        return ["1357", "1357"];
      case "Seeds":
        return ["2", ""];
      case "B25/S4":
        return ["25", "4"];
      case "Life without Death":
        return ["3", "012345678"];
      case "Life":
        return ["3", "23"];
      case "34 Life":
        return ["34", "34"];
      case "Diamoeba":
        return ["35678", "5678"];
      case "2x2":
        return ["36", "125"];
      case "HighLife":
        return ["36", "23"];
      case "Day & Night":
        return ["3678", "34678"];
      case "Morley":
        return ["368", "245"];
      case "Anneal":
        return ["4678", "35678"];
    }
  }, []);

  return {
    getPreset
  };
};
