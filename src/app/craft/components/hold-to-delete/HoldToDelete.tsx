"use client";

import { useEffect, useRef } from "react";

import Trash from "../../../../components/icons/Trash";
import { animateThemeColor } from "../../../../utils/theme-color";

import styles from "./HoldToDelete.module.css";

const HOLD_TINT_COLOR = "rgba(255, 40, 40, 0.7)";

export default function HoldToDelete() {
  const cancelAnimationRef = useRef<null | (() => void)>(null);

  const handleDown = () => {
    cancelAnimationRef.current?.();
    cancelAnimationRef.current = animateThemeColor(HOLD_TINT_COLOR);
  };

  const handleUp = () => {
    cancelAnimationRef.current?.();
    cancelAnimationRef.current = animateThemeColor(
      getComputedStyle(document.body).backgroundColor
    );
  };

  useEffect(() => {
    return () => cancelAnimationRef.current?.();
  }, []);

  return (
    <button
      className={styles.button}
      aria-label="hold to delete"
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
      onPointerLeave={handleUp}
    >
      <div aria-hidden="true" className={styles.progress} />
      <div className={styles.content}>
        <Trash size={20} aria-label="trash icon" />
        <span>Hold to Delete</span>
      </div>
    </button>
  );
}
