"use client";

import { type KeyboardEvent, use, useState } from "react";
import { browser } from "react-dom";

import { useTime } from "../../../hooks/useTime";
import { useWindowDimension } from "../../../hooks/useWindowDimension";
import { getBrowserInfo } from "../../../utils/browser-info";

import Clock from "./Clock";
import Principle from "./Principle";
import styles from "./StatusDisplay.module.css";

export default function StatusDisplay() {
  use(browser());

  const [activeIndex, setActiveIndex] = useState(0);

  const { currentTime, timezoneOffset, timeParts } = useTime({
    enabled: activeIndex < 2,
  });

  const { width, height } = useWindowDimension({ debounceDelay: 100 });

  const userAgent = navigator.userAgent;
  const { name, version } = getBrowserInfo(userAgent);

  const statusItems = [
    <Clock
      key="clock"
      currentTime={currentTime}
      timezoneOffset={timezoneOffset}
      timeParts={timeParts}
    />,
    currentTime,
    <span key="dimensions">{`${width}x${height}`}</span>,
    `${name} ${version}`,
    <Principle key="principle" />,
  ];

  function handleShowNextItem() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % statusItems.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleShowNextItem();
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.statusDisplay}
      data-animate
      onKeyDown={handleKeyDown}
      onMouseDown={handleShowNextItem}
      style={{ "--stagger": "6" }}
    >
      {statusItems[activeIndex]}
    </div>
  );
}
