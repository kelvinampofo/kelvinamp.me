"use client";

import clsx from "clsx";
import { useState } from "react";
import useSound from "use-sound";

import styles from "./TimelinePicker.module.css";

const SOUND_URL = "/assets/sounds/tick.mp3";
const TICK_COUNT = 21;

interface TimelinePickerProps {
  onSelect?: (tick: number) => void;
}

export default function TimelinePicker({ onSelect }: TimelinePickerProps) {
  const [currentIndex, setCurrentIndex] = useState(10);
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

  return (
    <div className={styles.timelineContainer}>
      <button
        className={clsx(styles.timelineButton, {
          [styles.disabled]: currentIndex === 0,
        })}
        onClick={handlePrev}
        disabled={currentIndex === 0}
        aria-label="Previous"
      >
        <ChevronLeftIcon />
      </button>

      <div className={styles.timelineTicks}>
        {ticks.map((_, index) => (
          <Tick
            key={index}
            index={index}
            tick={index}
            isActive={index === currentIndex}
            onSelect={selectIndex}
          />
        ))}
      </div>

      <button
        className={clsx(styles.timelineButton, {
          [styles.disabled]: currentIndex === ticks.length - 1,
        })}
        onClick={handleNext}
        disabled={currentIndex === ticks.length - 1}
        aria-label="Next"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

function Tick({
  tick,
  index,
  isActive,
  onSelect,
}: {
  tick: number;
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className={styles.timelineTick}
      data-active={isActive}
      key={tick}
      onClick={() => onSelect(index)}
    />
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
