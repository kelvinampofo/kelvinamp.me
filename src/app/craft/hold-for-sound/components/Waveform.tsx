import { motion } from "motion/react";
import { memo, useMemo } from "react";

import styles from "./Waveform.module.css";

export const Waveform = memo(() => {
  const barAnimations = useMemo(() => {
    return Array.from({ length: 22 }).map(() => ({
      minScale: 0.2 + Math.random() * 0.2,
      maxScale: 0.7 + Math.random() * 0.3,
      duration: 0.8 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div className={styles.container}>
      {barAnimations.map(({ minScale, maxScale, duration }, index) => (
        <motion.span
          key={index}
          className={styles.bar}
          animate={{ scaleY: [minScale, maxScale, minScale] }}
          transition={{
            repeat: Infinity,
            duration: duration,
            delay: index * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

Waveform.displayName = "Waveform";
