import type { PropsWithChildren } from "react";

import styles from "./ProgressiveBlur.module.css";

export default function ProgressiveBlur({ children }: PropsWithChildren) {
  return (
    <div
      className={styles.maskGradient}
      aria-label="scrolling text with a progressive linear blur effect"
      role="marquee"
    >
      <span className={styles.marquee} aria-hidden="true">
        {children}
      </span>
    </div>
  );
}
