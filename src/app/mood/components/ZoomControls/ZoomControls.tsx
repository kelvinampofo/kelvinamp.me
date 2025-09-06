"use client";
import styles from "./ZoomControls.module.css";

interface ZoomControlsProps {
  zoomPercent: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function ZoomControls({
  zoomPercent,
  onZoomIn,
  onZoomOut,
}: ZoomControlsProps) {
  return (
    <div
      className={styles.zoomControls}
      role="group"
      aria-label="Zoom controls"
    >
      <button
        type="button"
        className={styles.zoomButton}
        onMouseDown={onZoomIn}
        aria-label="Zoom in"
      >
        +
      </button>
      <span className={styles.zoomReadout} aria-live="polite">
        {zoomPercent}%
      </span>
      <button
        type="button"
        className={styles.zoomButton}
        onMouseDown={onZoomOut}
        aria-label="Zoom out"
      >
        −
      </button>
    </div>
  );
}
