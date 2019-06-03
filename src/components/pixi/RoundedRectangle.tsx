import * as PIXI from "pixi.js";
import { PixiComponent } from "@inlet/react-pixi";

export interface Props {
  fill: number;
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  pointerDown?: (event: PIXI.interaction.InteractionEvent) => void;
  buttonMode?: boolean;
  interactive?: boolean;
}

export const RoundedRectangle = PixiComponent<Props, PIXI.Graphics>(
  "RoundedRectangle",
  {
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
      instance.lineStyle(1, newProps.fill);
      instance.drawRoundedRect(
        newProps.x,
        newProps.y,
        newProps.width,
        newProps.height,
        newProps.radius || 20
      );
      instance.endFill();

      instance.buttonMode = newProps.buttonMode || false;
      instance.interactive = newProps.interactive || false;

      instance.removeAllListeners();
      if (newProps.pointerDown != null)
        instance.on("pointerdown", newProps.pointerDown);
    }
  }
);
