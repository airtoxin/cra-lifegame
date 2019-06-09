import React from "react";
import {Stat} from "../hooks/useConwaysGameOfLife";

export interface Props {
  generation: number,
  stat: Stat
}

export const Stats: React.FunctionComponent<Props> = ({ generation, stat }) => {
  return (
    <>
      <div>gen: {generation}</div>
      <div>
        <div>Stat</div>
        <div>Born: {stat.born}</div>
        <div>Survive: {stat.survive}</div>
        <div>Dead: {stat.dead}</div>
        <div>Total: {stat.born + stat.survive + stat.dead}</div>
      </div></>
  );
};
