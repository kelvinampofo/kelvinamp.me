"use client";

import {
  motion,
  AnimatePresence,
  type Transition,
  TargetAndTransition,
} from "motion/react";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback, type KeyboardEvent } from "react";
import useSound from "use-sound";

import styles from "./HoldForSound.module.css";

const Waveform = dynamic(
  () => import("./Waveform").then(({ Waveform }) => Waveform),
  {
    ssr: true,
  }
);

const buttonVariants: Record<"default" | "pressed", TargetAndTransition> = {
  default: { scale: 1 },
  pressed: { scale: 1.05 },
};

const contentVariants: Record<
  "initial" | "animate" | "exit",
  TargetAndTransition
> = {
  initial: { opacity: 0, scale: 0.98, filter: "blur(1px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.98, filter: "blur(1px)" },
};

const buttonTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 13,
  bounce: 0.4,
};

const contentTransition: Transition = { duration: 0.15 };

const soundUrl = "/assets/sounds/porsche-911.wav";

export default function HoldForSound() {
  const [isPressed, setIsPressed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [play, { stop }] = useSound(soundUrl, {
    volume: 0.5,
    onend: () => setIsPressed(false),
  });

  const triggerHaptic = useCallback(() => {
    if ("vibrate" in navigator) {
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
      if ((e.key === " " || e.key === "Enter") && !isPressed) {
        e.preventDefault();
        handlePress();
      }
    },
    [isPressed, handlePress]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
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
    <div className={styles.container}>
      <motion.div
        variants={buttonVariants}
        animate={isPressed ? "pressed" : "default"}
        transition={buttonTransition}
        className={styles.wrapper}
      >
        <motion.button
          className={styles.button}
          aria-label="press and hold the button to hear the engine revving sound of the Porsche 911"
          aria-pressed={isPressed}
          onPointerDown={handlePress}
          onPointerUp={handleRelease}
          onPointerLeave={handleRelease}
          onPointerCancel={handleRelease}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          title="porsche-911.wav"
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
                className={styles.contentDefault}
              >
                <Play />
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
                className={styles.contentPressed}
              >
                <Waveform />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      <div className={styles.tooltipWrapper}>
        <AnimatePresence initial={false}>
          {!hasInteracted && (
            <motion.span
              className={styles.tooltip}
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

function Play() {
  return (
    <svg
      height={16}
      width={16}
      aria-label="play icon"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
