"use client";

import React, { useState } from "react";

import useShortcut from "../../hooks/useShortcut";

import styles from "./FocusedReading.module.css";

interface FocusedReadingProps {
  children: React.ReactNode;
}

export default function FocusedReading({ children }: FocusedReadingProps) {
  const [isFocused, setIsFocused] = useState(false);

  useShortcut("F", () => setIsFocused((prev) => !prev), {
    pressDelay: 300,
  });

  return (
    <div
      className={styles.focusedReading}
      data-focus-mode={isFocused && "enabled"}
    >
      {children}
    </div>
  );
}
