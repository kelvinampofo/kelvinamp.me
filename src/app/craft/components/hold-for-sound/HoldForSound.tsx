"use client";

import {
  motion,
  AnimatePresence,
  type Transition,
  TargetAndTransition,
} from "motion/react";
import dynamic from "next/dynamic";
import { useState, useEffect, type KeyboardEvent } from "react";
import useSound from "use-sound";

import PlayIcon from "../../../../components/icons/Play";

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

  const triggerHaptic = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const handlePress = () => {
    setIsPressed(true);

    if (!hasInteracted) {
      setHasInteracted(true);
    }

    play();

    triggerHaptic();
  };

  const handleRelease = () => {
    setIsPressed(false);
    stop();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === " " || e.key === "Enter") && !isPressed) {
      e.preventDefault();
      handlePress();
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleRelease();
    }
  };

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
                <PlayIcon size={16} aria-label="play icon" />
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
