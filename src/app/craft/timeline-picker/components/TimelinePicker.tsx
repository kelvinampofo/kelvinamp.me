"use client";

import { motion, type Target, type Transition } from "motion/react";
import { useState, type SVGProps, useCallback } from "react";
import useSound from "use-sound";

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
  const [mode, setMode] = useState<"none" | "default" | "increased">("none");

  const [play] = useSound(SOUND_URL, {
    volume: 0.25,
  });

  const ticks = Array.from({ length: TICK_COUNT }, (_, index) => index);

  const selectIndex = useCallback(
    (index: number) => {
      if (index !== currentIndex) {
        setCurrentIndex(index);
        onSelect?.(index);
        play();
      }
    },
    [currentIndex, onSelect, play]
  );

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      selectIndex(currentIndex - 1);
    }
  }, [currentIndex, selectIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < ticks.length - 1) {
      selectIndex(currentIndex + 1);
    }
  }, [currentIndex, ticks.length, selectIndex]);

  useShortcuts("ArrowLeft", handlePrev, {
    preventDefault: true,
  });

  useShortcuts("ArrowRight", handleNext, {
    preventDefault: true,
  });

  useShortcuts("I", () =>
    setMode((prevMode) => (prevMode === "increased" ? "none" : "increased"))
  );
  useShortcuts("D", () =>
    setMode((prevMode) => (prevMode === "default" ? "none" : "default"))
  );

  return (
    <div className={styles.timelineWrapper} data-mode={mode}>
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

type ChevronDirection = "left" | "right";
type SvgPropsNoDir = Omit<SVGProps<SVGSVGElement>, "dir">;

interface ChevronProps extends SvgPropsNoDir {
  direction?: ChevronDirection;
}

function Chevron({
  direction = "right",
  width = 20,
  height = 20,
  ...props
}: ChevronProps) {
  const dirRight =
    "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z";

  const dirLeft =
    "M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d={direction === "left" ? dirLeft : dirRight}
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
