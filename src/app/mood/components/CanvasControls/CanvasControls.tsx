"use client";

import EnterFullscreenIcon from "../../../../components/icons/EnterFullscreen";
import ExitFullscreenIcon from "../../../../components/icons/ExitFullscreen";
import MinusIcon from "../../../../components/icons/Minus";
import PlusIcon from "../../../../components/icons/Plus";
import ReloadIcon from "../../../../components/icons/Reload";
import Tooltip from "../../../../components/tooltip/Tooltip";
import useFullscreen from "../../../../hooks/useFullscreen";
import useShortcuts from "../../../../hooks/useShortcuts";

import styles from "./CanvasControls.module.css";

interface CanvasControlsProps {
  zoomPercent: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomToFit: () => void;
  onZoomTo100: () => void;
}

export default function CanvasControls({
  zoomPercent,
  onZoomIn,
  onZoomOut,
  onZoomToFit,
  onZoomTo100,
}: CanvasControlsProps) {
  const { isFullscreen, canFullscreen, toggleFullscreen } = useFullscreen();

  useShortcuts("F", toggleFullscreen, { preventDefault: true });

  useShortcuts(["Equal", "NumpadAdd"], onZoomIn, {
    preventDefault: true,
    modifiers: "Meta",
    matchBy: "code",
  });

  useShortcuts(["Minus", "NumpadSubtract"], onZoomOut, {
    preventDefault: true,
    modifiers: "Meta",
    matchBy: "code",
  });

  useShortcuts("Digit0", onZoomTo100, {
    preventDefault: true,
    modifiers: "Meta",
    matchBy: "code",
  });

  useShortcuts("Digit1", onZoomToFit, {
    preventDefault: true,
    modifiers: "Shift",
    matchBy: "code",
  });

  return (
    <div
      className={styles.canvasControls}
      role="group"
      aria-label="Canvas controls"
    >
      <Tooltip
        content={isFullscreen ? "Exit fullscreen (F)" : "Enter fullscreen (F)"}
        triggerProps={{
          className: styles.canvasButton,
          type: "button",
          onClick: toggleFullscreen,
          "aria-label": isFullscreen ? "Minimize" : "Maximize",
          disabled: !canFullscreen,
        }}
      >
        {isFullscreen ? <ExitFullscreen /> : <EnterFullscreen />}
      </Tooltip>
      <Tooltip
        content="Zoom to fit (⇧ 1)"
        triggerProps={{
          className: styles.canvasButton,
          type: "button",
          onClick: onZoomToFit,
          "aria-label": "Zoom to fit",
        }}
      >
        <Reload />
      </Tooltip>
      <Tooltip
        content="Zoom in"
        triggerProps={{
          className: styles.canvasButton,
          type: "button",
          onClick: onZoomIn,
          "aria-label": "Zoom in",
        }}
      >
        <Plus />
      </Tooltip>
      <span className="sr-only" aria-live="polite">
        {zoomPercent}%
      </span>
      <Tooltip
        content="Zoom out"
        triggerProps={{
          className: styles.canvasButton,
          type: "button",
          onClick: onZoomOut,
          "aria-label": "Zoom out",
        }}
      >
        <Minus />
      </Tooltip>
    </div>
  );
}

function EnterFullscreen() {
  return (
    <EnterFullscreenIcon
      size={15}
      aria-hidden="true"
      focusable="false"
      className={styles.enterIcon}
    />
  );
}

function ExitFullscreen() {
  return (
    <ExitFullscreenIcon
      size={15}
      aria-hidden="true"
      focusable="false"
      className={styles.exitIcon}
    />
  );
}

function Reload() {
  return (
    <ReloadIcon
      size={15}
      aria-hidden="true"
      focusable="false"
      className={styles.resetIcon}
    />
  );
}

function Plus() {
  return (
    <PlusIcon
      size={15}
      aria-hidden="true"
      focusable="false"
      className={styles.plusIcon}
    />
  );
}

function Minus() {
  return (
    <MinusIcon
      size={15}
      aria-hidden="true"
      focusable="false"
      className={styles.minusIcon}
    />
  );
}
