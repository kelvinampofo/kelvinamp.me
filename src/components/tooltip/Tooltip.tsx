import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import PopupArrow from "../icons/PopupArrow";

import styles from "./Tooltip.module.css";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const DEFAULT_SIDE_OFFSET = 12;

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger className={styles.trigger}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner sideOffset={DEFAULT_SIDE_OFFSET}>
          <TooltipPrimitive.Popup className={styles.popup}>
            <TooltipPrimitive.Arrow className={styles.arrow}>
              <PopupArrow
                fillClassName={styles.arrowFill}
                outerStrokeClassName={styles.arrowOuterStroke}
                innerStrokeClassName={styles.arrowInnerStroke}
              />
            </TooltipPrimitive.Arrow>

            {content}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
