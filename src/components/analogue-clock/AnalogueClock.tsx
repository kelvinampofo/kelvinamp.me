"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";

import { useTime } from "../../hooks/useTime";

import styles from "./AnalogueClock.module.css";

export default function AnalogueClock() {
  const { currentTime } = useTime();

  // start at midnight for SSR/initial render, then update to real time after hydration
  const [displayTime, setDisplayTime] = useState("00:00:00");

  useEffect(() => {
    setDisplayTime(currentTime);
  }, [currentTime]);

  const [hours, minutes, seconds] = displayTime.split(":").map(Number);

  const hoursDeg = (hours % 12) * 30 + (minutes / 60) * 30;
  const minutesDeg = minutes * 6 + (seconds / 60) * 6;
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
