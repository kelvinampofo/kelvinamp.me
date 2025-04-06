'use client';

import { motion, AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import useSound from 'use-sound';

import { Icon } from '@/app/components/ui/Icon';

const Waveform = dynamic(() => import('./Waveform').then(({ Waveform }) => Waveform), {
  ssr: true
});

const buttonVariants = {
  default: { scale: 1 },
  pressed: { scale: 1.05 }
};

const contentVariants = {
  initial: { opacity: 0, scale: 0.98, filter: 'blur(1px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(1px)' }
};

const buttonTransition = {
  type: 'spring',
  stiffness: 500,
  damping: 13,
  bounce: 0.4
};

const contentTransition = { duration: 0.15 };

const soundUrl = '/assets/sounds/porsche-911.wav';

export default function HoldForSound() {
  const [isPressed, setIsPressed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [play, { stop }] = useSound(soundUrl, {
    volume: 0.5,
    onend: () => setIsPressed(false)
  });

  const triggerHaptic = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  }, []);

  const handlePress = useCallback(() => {
    setIsPressed(true);

    if (!hasInteracted) {
      setHasInteracted(true);
    }

    play();

    triggerHaptic();
  }, [hasInteracted, play, triggerHaptic]);

  const handleRelease = useCallback(() => {
    setIsPressed(false);
    stop();
  }, [stop]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if ((e.key === ' ' || e.key === 'Enter') && !isPressed) {
        e.preventDefault();
        handlePress();
      }
    },
    [isPressed, handlePress]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleRelease();
      }
    },
    [handleRelease]
  );

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-6">
      <motion.div
        variants={buttonVariants}
        animate={isPressed ? 'pressed' : 'default'}
        transition={buttonTransition}
      >
        <motion.button
          className="relative flex h-10 w-[150px] items-center justify-center rounded-md bg-[#fefefe] px-3 py-2 outline outline-1 outline-neutral-200 transition-all will-change-transform [box-shadow:0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-neutral-100 focus-visible:[box-shadow:0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_2px_var(--focus-inner-colour),0_0_0_4px_var(--focus-outer-colour)] dark:bg-[#1A1A1A] dark:outline-neutral-800 hover:dark:bg-neutral-800 hover:dark:outline-neutral-700 dark:focus-visible:[box-shadow:0_1px_2px_0_rgba(0,0,0,0.25),0_0_0_2px_var(--focus-inner-colour-dark),0_0_0_4px_var(--focus-outer-colour)]"
          aria-label="press and hold the button to hear the engine revving sound of the Porsche 911"
          aria-pressed={isPressed}
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={handlePress}
          onTouchEnd={handleRelease}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isPressed ? (
              <motion.div
                key="default"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={contentTransition}
                className="flex w-full items-center justify-center gap-1.5 text-primary dark:text-primary-dark"
              >
                <Icon name="play" className="text-secondary dark:text-secondary-dark" />
                <span className="text-sm">Hold for sound</span>
              </motion.div>
            ) : (
              <motion.div
                key="waveform"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={contentTransition}
                className="flex h-full items-center justify-center"
              >
                <Waveform />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
      <div className="min-h-4">
        <AnimatePresence initial={false}>
          {!hasInteracted && (
            <motion.span
              className="block text-xs text-secondary dark:text-secondary"
              key="visible"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={contentTransition}
            >
              (Sound on)
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
