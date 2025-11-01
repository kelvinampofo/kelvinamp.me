"use client";

import { useEffect, useRef } from "react";

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
        <svg
          height={20}
          width={20}
          aria-label="trash icon"
          viewBox="0 0 15 15"
          fill="none"
        >
          <path
            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <span>Hold to Delete</span>
      </div>
    </button>
  );
}
