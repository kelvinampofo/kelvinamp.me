"use client";

import { useEffect, useState } from "react";

import styles from "./FadeTransition.module.css";

interface FadeInUpProps {
  delay?: number;
  children: React.ReactNode;
}

export default function FadeTransition({ children, delay = 0 }: FadeInUpProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={styles.fadeTransition}
      data-animate={isMounted ? "" : undefined}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
