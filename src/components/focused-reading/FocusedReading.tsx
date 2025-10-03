"use client";

import { useState } from "react";

import useShortcuts from "../../hooks/useShortcuts";

import styles from "./FocusedReading.module.css";

interface FocusedReadingProps {
  children: React.ReactNode;
}

export default function FocusedReading({ children }: FocusedReadingProps) {
  const [isFocused, setIsFocused] = useState(false);

  useShortcuts("F", () => setIsFocused((prev) => !prev), {
    delay: 300,
  });

  return (
    <div
      className={styles.focusedReading}
      data-focus-mode={isFocused ? "enabled" : "disabled"}
    >
      {children}
    </div>
  );
}
