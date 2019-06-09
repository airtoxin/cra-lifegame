import React from "react";

export interface Props {
  size: number;
  onChangeSize: (size: number) => void;
  running: boolean;
  onChangeRunning: (running: boolean) => void;
  onReset: () => void;
  density: number;
  onChangeDensity: (density: number) => void;
  born: string;
  onChangeBorn: (born: string) => void;
  survive: string;
  onChangeSurvive: (survive: string) => void;
}

export const Controls: React.FunctionComponent<Props> = ({
  size,
  onChangeSize,
  running,
  onChangeRunning,
  onReset,
  density,
  onChangeDensity,
  born,
  onChangeBorn,
  survive,
  onChangeSurvive
}) => {
  return (
    <>
      <button onClick={() => onChangeRunning(!running)}>
        {running ? "stop" : "start"}
      </button>
      <button onClick={onReset}>reset</button>
      <div>
        Density: {density}
        <br />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={density}
          onChange={e => onChangeDensity(Number(e.target.value))}
        />
      </div>
      <div>
        Preset:{" "}
        <select
          onChange={event => {
            const [b, s] = event.target.value.split("/");
            onChangeBorn(b);
            onChangeSurvive(s);
          }}
        >
          <option value="/" />
          <option value="1357/1357">Replicator</option>
          <option value="2/">Seeds</option>
          <option value="25/4">B25/S4</option>
          <option value="3/012345678">Life without Death</option>
          <option value="2/23">Life</option>
          <option value="34/34">34 Life</option>
          <option value="35678/5678">Diamoeba</option>
          <option value="36/125">2x2</option>
          <option value="36/23">HighLife</option>
          <option value="3678/34678">Day & Night</option>
          <option value="368/245">Morley</option>
          <option value="4678/35678">Anneal</option>
        </select>
      </div>
      <div>
        Born:{" "}
        <input
          type="text"
          value={born}
          onChange={e => onChangeBorn(e.target.value)}
        />
      </div>
      <div>
        Survive{" "}
        <input
          type="text"
          value={survive}
          onChange={e => onChangeSurvive(e.target.value)}
        />
      </div>
      <hr />
      <div>
        Board size{" "}
        <input
          type="number"
          value={size}
          onChange={e => onChangeSize(Number(e.target.value))}
        />
      </div>
    </>
  );
};
