"use client";

import clsx from "clsx";

import type { TimeParts } from "../../hooks/useTime";

import styles from "./AnalogueClock.module.css";

const SECONDS_PER_MINUTE = 60;
const HOURS_PER_HALF_DAY = 12;
const DEGREES_PER_HOUR = 30;
const DEGREES_PER_MINUTE_OR_SECOND = 6;

interface AnalogueClockProps {
  timeParts: TimeParts;
}

export default function AnalogueClock({ timeParts }: AnalogueClockProps) {
  const secondsProgress = timeParts.seconds;
  const minutesProgress =
    timeParts.minutes + secondsProgress / SECONDS_PER_MINUTE;
  const hoursProgress =
    (timeParts.hours % HOURS_PER_HALF_DAY) +
    minutesProgress / SECONDS_PER_MINUTE;

  const hoursDeg = hoursProgress * DEGREES_PER_HOUR;
  const minutesDeg = minutesProgress * DEGREES_PER_MINUTE_OR_SECOND;
  const secondsDeg = secondsProgress * DEGREES_PER_MINUTE_OR_SECOND;

  return (
    <div
      className={styles.analogueClock}
      aria-label="Analogue clock showing the current time"
      role="img"
    >
      <ClockHand rotation={hoursDeg} type="hours" />
      <ClockHand rotation={minutesDeg} type="minutes" />
      <ClockHand rotation={secondsDeg} type="seconds" />
    </div>
  );
}

interface ClockHandProps {
  rotation: number;
  type: Exclude<keyof TimeParts, "milliseconds">;
}

function ClockHand({ rotation, type }: ClockHandProps) {
  return (
    <div
      className={clsx(styles.clockHand, {
        [styles.clockHandHours]: type === "hours",
        [styles.clockHandMinutes]: type === "minutes",
        [styles.clockHandSeconds]: type === "seconds",
      })}
      style={{ "--rotation": `${rotation}deg` }}
    />
  );
}
