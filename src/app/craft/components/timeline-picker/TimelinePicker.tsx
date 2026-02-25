"use client";

import { motion, type Target, type Transition } from "motion/react";
import { useState } from "react";
import useSound from "use-sound";

import Chevron from "../../../../components/icons/Chevron";
import useShortcuts from "../../../../hooks/useShortcuts";

import styles from "./TimelinePicker.module.css";

const SOUND_URL = "/assets/sounds/tick.mp3";

const TICK_COUNT = 20;

const ACTIVE_PROPS: Target = {
  scaleY: 1.6,
  marginBottom: 12,
};

const INACTIVE_PROPS: Target = {
  scaleY: 1,
  marginBottom: 0,
};

const SPRING_CONFIG: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 25,
  bounce: 0.22,
  duration: 0.22,
};

interface TimelinePickerProps {
  onSelect?: (tick: number) => void;
}

export default function TimelinePicker({ onSelect }: TimelinePickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [debugOverlay, setDebugOverlay] = useState<
    "none" | "default" | "increased"
  >("none");

  const [play] = useSound(SOUND_URL, {
    volume: 0.25,
  });

  const ticks = Array.from({ length: TICK_COUNT }, (_, index) => index);

  function selectIndex(index: number) {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      onSelect?.(index);
      play();
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      selectIndex(currentIndex - 1);
    }
  }

  function handleNext() {
    if (currentIndex < ticks.length - 1) {
      selectIndex(currentIndex + 1);
    }
  }

  useShortcuts({
    ArrowLeft: handlePrev,
    ArrowRight: handleNext,
    I: () =>
      setDebugOverlay((prevMode) =>
        prevMode === "increased" ? "none" : "increased"
      ),
    D: () =>
      setDebugOverlay((prevMode) =>
        prevMode === "default" ? "none" : "default"
      ),
  });

  return (
    <div className={styles.timelineWrapper} data-debug-overlay={debugOverlay}>
      <div className={styles.timelineContainer}>
        <button
          className={styles.timelineButton}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous selection"
        >
          <Chevron direction="left" />
        </button>

        <div className={styles.timelineTicks}>
          {ticks.map((_, index) => (
            <Tick
              key={index}
              index={index}
              isActive={index === currentIndex}
              onSelect={selectIndex}
            />
          ))}
        </div>

        <button
          className={styles.timelineButton}
          onClick={handleNext}
          disabled={currentIndex === ticks.length - 1}
          aria-label="Next selection"
        >
          <Chevron direction="right" />
        </button>
      </div>
    </div>
  );
}

function Tick({
  index,
  isActive,
  onSelect,
}: {
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.div
      initial={false}
      className={styles.timelineTick}
      data-active={isActive}
      onClick={() => onSelect(index)}
      aria-hidden
      animate={isActive ? ACTIVE_PROPS : INACTIVE_PROPS}
      transition={SPRING_CONFIG}
    />
  );
}
