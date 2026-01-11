import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import clsx from "clsx";

import PopupArrow from "../icons/PopupArrow";

import styles from "./Tooltip.module.css";

type RootSlotProps = Omit<TooltipPrimitive.Root.Props, "children">;
type TriggerSlotProps = Omit<TooltipPrimitive.Trigger.Props, "children">;
type PortalSlotProps = Omit<TooltipPrimitive.Portal.Props, "children">;
type PositionerSlotProps = Omit<TooltipPrimitive.Positioner.Props, "children">;
type PopupSlotProps = Omit<TooltipPrimitive.Popup.Props, "children">;

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  rootProps?: RootSlotProps;
  triggerProps?: TriggerSlotProps;
  portalProps?: PortalSlotProps;
  positionerProps?: PositionerSlotProps;
  popupProps?: PopupSlotProps;
}

const DEFAULT_SIDE_OFFSET = 12;

export default function Tooltip({
  children,
  content,
  rootProps,
  triggerProps,
  portalProps,
  positionerProps,
  popupProps,
}: TooltipProps) {
  const { ...restRootProps } = rootProps ?? {};
  const { className: triggerClassName, ...restTriggerProps } =
    triggerProps ?? {};
  const { className: popupClassName, ...restPopupProps } = popupProps ?? {};
  const { sideOffset, ...restPositionerProps } = positionerProps ?? {};
  const { ...restPortalProps } = portalProps ?? {};

  return (
    <TooltipPrimitive.Root {...restRootProps}>
      <TooltipPrimitive.Trigger
        className={clsx(styles.tooltipTrigger, triggerClassName)}
        {...restTriggerProps}
      >
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal {...restPortalProps}>
        <TooltipPrimitive.Positioner
          sideOffset={sideOffset ?? DEFAULT_SIDE_OFFSET}
          {...restPositionerProps}
        >
          <TooltipPrimitive.Popup
            className={clsx(styles.tooltipPopup, popupClassName)}
            {...restPopupProps}
          >
            <TooltipPrimitive.Arrow className={styles.tooltipArrow}>
              <PopupArrow
                fillClassName={styles.tooltipArrowFill}
                outerStrokeClassName={styles.tooltipArrowOuterStroke}
                innerStrokeClassName={styles.tooltipArrowInnerStroke}
              />
            </TooltipPrimitive.Arrow>

            {content}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
