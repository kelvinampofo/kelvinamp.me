"use client";

import { useEffect, useState } from "react";

import styles from "./ShimmerText.module.css";

const DURATION = 4000;

interface ShimmerTextProps {
  children: React.ReactNode;
  ariaLabel?: string;
}

export default function ShimmerText({
  children,
  ariaLabel = "Shimmer text loop",
}: ShimmerTextProps) {
  const [viewIndex, setViewIndex] = useState(0);

  const phrases = Array.isArray(children) ? children : [children];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setViewIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, DURATION);

    return () => clearInterval(intervalId);
  }, [phrases.length]);

  return (
    <div className={styles.container} aria-label={ariaLabel}>
      {phrases.map((phrase, index) => (
        <div
          key={phrase}
          aria-hidden={index !== viewIndex}
          className={`${styles.textContainer} ${index === viewIndex ? styles.visible : styles.hidden}`}
        >
          <span className={styles.shimmer}>{phrase}</span>
        </div>
      ))}
    </div>
  );
}
