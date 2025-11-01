import { motion } from "motion/react";

import styles from "./Waveform.module.css";

const BAR_COUNT = 22;

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const createBarAnimations = () => {
  return Array.from({ length: BAR_COUNT }).map((_, index) => {
    const baseSeed = index + 1;

    return {
      minScale: 0.2 + pseudoRandom(baseSeed) * 0.2,
      maxScale: 0.7 + pseudoRandom(baseSeed + BAR_COUNT) * 0.3,
      duration: 0.8 + pseudoRandom(baseSeed + BAR_COUNT * 2) * 0.5,
    };
  });
};

const BAR_ANIMATIONS = createBarAnimations();

export function Waveform() {
  return (
    <div className={styles.container}>
      {BAR_ANIMATIONS.map(({ minScale, maxScale, duration }, index) => (
        <motion.span
          key={index}
          className={styles.bar}
          animate={{ scaleY: [minScale, maxScale, minScale] }}
          transition={{
            repeat: Infinity,
            duration,
            delay: index * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
