import * as PIXI from "pixi.js";
import { PixiComponent } from "@inlet/react-pixi";

export interface Props {
  fill: number;
  x: number;
  y: number;
  width: number;
  height: number;
  pointerDown?: (event: PIXI.interaction.InteractionEvent) => void;
  buttonMode?: boolean;
  interactive?: boolean;
}

export const Rectangle = PixiComponent<Props, PIXI.Graphics>("Rectangle", {
  create: props => {
    return new PIXI.Graphics();
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
  },
  willUnmount: (instance, parent) => {
    instance.removeAllListeners("pointerdown");
  },
  applyProps: (instance, oldProps, newProps) => {
    instance.clear();
    instance.beginFill(newProps.fill);
    instance.drawRect(newProps.x, newProps.y, newProps.width, newProps.height);
    instance.endFill();

    instance.buttonMode = newProps.buttonMode || false;
    instance.interactive = newProps.interactive || false;

    instance.removeAllListeners();
    if (newProps.pointerDown != null)
      instance.on("pointerdown", newProps.pointerDown);
  }
});
