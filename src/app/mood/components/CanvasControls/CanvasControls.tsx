"use client";
import useFullscreen from "../../../../hooks/useFullscreen";
import useShortcuts from "../../../../hooks/useShortcuts";

import styles from "./CanvasControls.module.css";

interface CanvasControlsProps {
  zoomPercent: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function CanvasControls({
  zoomPercent,
  onZoomIn,
  onZoomOut,
}: CanvasControlsProps) {
  const { isFullscreen, canFullscreen, toggleFullscreen } = useFullscreen();

  useShortcuts("f", toggleFullscreen, { preventDefault: true });

  return (
    <div
      className={styles.canvasControls}
      role="group"
      aria-label="Canvas controls"
    >
      <button
        type="button"
        className={styles.canvasButton}
        onMouseDown={toggleFullscreen}
        aria-label={isFullscreen ? "Minimize" : "Maximize"}
        title={isFullscreen ? "Exit fullscreen (F)" : "Enter fullscreen (F)"}
        disabled={!canFullscreen}
      >
        {isFullscreen ? <ExitFullscreen /> : <EnterFullscreen />}
      </button>
      <button
        type="button"
        className={styles.canvasButton}
        onMouseDown={onZoomIn}
        aria-label="Zoom in"
        title="Zoom in"
      >
        +
      </button>
      <span className="sr-only" aria-live="polite">
        {zoomPercent}%
      </span>
      <button
        type="button"
        className={styles.canvasButton}
        onMouseDown={onZoomOut}
        aria-label="Zoom out"
        title="Zoom out"
      >
        −
      </button>
    </div>
  );
}

function EnterFullscreen() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={styles.enterIcon}
    >
      <path
        d="M2 2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5C6 2.77614 5.77614 3 5.5 3H3V5.5C3 5.77614 2.77614 6 2.5 6C2.22386 6 2 5.77614 2 5.5V2.5ZM9 2.5C9 2.22386 9.22386 2 9.5 2H12.5C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3H9.5C9.22386 3 9 2.77614 9 2.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H2.5C2.22386 13 2 12.7761 2 12.5V9.5C2 9.22386 2.22386 9 2.5 9ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13H9.5C9.22386 13 9 12.7761 9 12.5C9 12.2239 9.22386 12 9.5 12H12V9.5C12 9.22386 12.2239 9 12.5 9Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ExitFullscreen() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5.5 2C5.77614 2 6 2.22386 6 2.5V5.5C6 5.77614 5.77614 6 5.5 6H2.5C2.22386 6 2 5.77614 2 5.5C2 5.22386 2.22386 5 2.5 5H5V2.5C5 2.22386 5.22386 2 5.5 2ZM9.5 2C9.77614 2 10 2.22386 10 2.5V5H12.5C12.7761 5 13 5.22386 13 5.5C13 5.77614 12.7761 6 12.5 6H9.5C9.22386 6 9 5.77614 9 5.5V2.5C9 2.22386 9.22386 2 9.5 2ZM2 9.5C2 9.22386 2.22386 9 2.5 9H5.5C5.77614 9 6 9.22386 6 9.5V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V10H2.5C2.22386 10 2 9.77614 2 9.5ZM9 9.5C9 9.22386 9.22386 9 9.5 9H12.5C12.7761 9 13 9.22386 13 9.5C13 9.77614 12.7761 10 12.5 10H10V12.5C10 12.7761 9.77614 13 9.5 13C9.22386 13 9 12.7761 9 12.5V9.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
