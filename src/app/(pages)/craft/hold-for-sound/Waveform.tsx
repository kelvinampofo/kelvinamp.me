import { motion } from 'motion/react';
import { memo, useMemo } from 'react';

export const Waveform = memo(() => {
  const barAnimations = useMemo(() => {
    return Array.from({ length: 22 }).map(() => ({
      minScale: 0.2 + Math.random() * 0.2,
      maxScale: 0.7 + Math.random() * 0.3,
      duration: 0.8 + Math.random() * 0.5
    }));
  }, []);

  return (
    <div className="flex h-full items-center justify-center gap-[3px]">
      {barAnimations.map(({ minScale, maxScale, duration }, index) => (
        <motion.span
          key={index}
          className="h-3/5 w-[2px] origin-center rounded-full bg-secondary dark:bg-secondary-dark"
          animate={{ scaleY: [minScale, maxScale, minScale] }}
          transition={{
            repeat: Infinity,
            duration: duration,
            delay: index * 0.05,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
});

Waveform.displayName = 'Waveform';
