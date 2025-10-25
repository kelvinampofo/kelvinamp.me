"use client";

import clsx from "clsx";

import { useTime } from "../../hooks/useTime";

import styles from "./AnalogueClock.module.css";

export default function AnalogueClock() {
  const { currentTime } = useTime();

  // default to midnight server-side, hydrate to the live time once available
  const displayTime = currentTime || "00:00:00";

  const [hh = "0", mm = "0", ss = "0"] = displayTime.split(":");

  const hours = parseInt(hh, 10) || 0;
  const minutes = parseInt(mm, 10) || 0;
  const seconds = parseInt(ss, 10) || 0;

  // include minute and second contribution for smoother hands
  const hoursDeg = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;
  const minutesDeg = (minutes + seconds / 60) * 6;
  const secondsDeg = seconds * 6;

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
  type: "hours" | "minutes" | "seconds";
}
function ClockHand({ rotation, type }: ClockHandProps) {
  const typeClass =
    type === "hours"
      ? styles.clockHandHours
      : type === "minutes"
        ? styles.clockHandMinutes
        : styles.clockHandSeconds;

  return (
    <div
      className={clsx(styles.clockHand, typeClass)}
      style={{ "--rotation": `${rotation}deg` }}
    />
  );
}
