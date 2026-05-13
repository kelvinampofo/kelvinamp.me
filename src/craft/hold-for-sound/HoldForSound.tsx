"use client";

import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  type Transition,
  type TargetAndTransition,
} from "motion/react";
import dynamic from "next/dynamic";
import { useState, useEffect, type KeyboardEvent } from "react";
import useSound from "use-sound";

import PlayIcon from "../../components/icons/Play";

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

  function triggerHaptic() {
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  }

  function handlePress() {
    setIsPressed(true);

    if (!hasInteracted) {
      setHasInteracted(true);
    }

    play();

    triggerHaptic();
  }

  function handleRelease() {
    setIsPressed(false);
    stop();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if ((event.key === " " || event.key === "Enter") && !isPressed) {
      event.preventDefault();
      handlePress();
    }
  }

  function handleKeyUp(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleRelease();
    }
  }

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.container}>
        <m.div
          variants={buttonVariants}
          animate={isPressed ? "pressed" : "default"}
          transition={buttonTransition}
          className={styles.wrapper}
        >
          <m.button
            className={styles.button}
            aria-label="press and hold the button to hear the engine revving sound of the Porsche 911"
            aria-pressed={isPressed}
            onPointerDown={handlePress}
            onPointerUp={handleRelease}
            onPointerLeave={handleRelease}
            onPointerCancel={handleRelease}
            onContextMenu={(event) => event.preventDefault()}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            title="porsche-911.wav"
          >
            <AnimatePresence mode="wait" initial={false}>
              {!isPressed ? (
                <m.div
                  key="default"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={contentTransition}
                  className={styles.contentDefault}
                >
                  <PlayIcon size={16} aria-hidden />
                  <span className="text-sm">Hold for sound</span>
                </m.div>
              ) : (
                <m.div
                  key="waveform"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={contentTransition}
                  className={styles.contentPressed}
                >
                  <Waveform />
                </m.div>
              )}
            </AnimatePresence>
          </m.button>
        </m.div>

        <div className={styles.tooltipWrapper}>
          <AnimatePresence initial={false}>
            {!hasInteracted && (
              <m.span
                className={styles.tooltip}
                key="visible"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={contentTransition}
              >
                (Sound on)
              </m.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LazyMotion>
  );
}
