"use client";

import { type KeyboardEvent, type ReactNode, useState } from "react";

import { useBrowserInfo } from "../../hooks/useBrowserInfo";
import { useTime } from "../../hooks/useTime";
import { useWindowDimension } from "../../hooks/useWindowDimension";

import BrowserInfo from "./components/BrowserInfo";
import Clock from "./components/Clock";
import CurrentTime from "./components/CurrentTime";
import Dimensions from "./components/Dimensions";
import styles from "./StatusDisplay.module.css";

interface StatusItem {
  render: () => ReactNode;
}

export default function StatusDisplay() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { currentTime, timezoneOffset, timeParts } = useTime();
  const { width, height } = useWindowDimension({ debounceDelay: 100 });
  const { name, version } = useBrowserInfo();

  const statusItems: StatusItem[] = [
    {
      render: () => (
        <Clock
          currentTime={currentTime}
          timezoneOffset={timezoneOffset}
          timeParts={timeParts}
        />
      ),
    },
    { render: () => <CurrentTime time={currentTime} /> },
    { render: () => <Dimensions width={width} height={height} /> },
    { render: () => <BrowserInfo name={name} version={version} /> },
  ];

  const totalStatusItems = statusItems.length;
  if (totalStatusItems === 0) {
    return;
  }

  const normalizedActiveIndex = activeIndex % totalStatusItems;
  const activeStatusItem = statusItems[normalizedActiveIndex];

  function handleShowNextItem() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % totalStatusItems);
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
      style={{ "--stagger": "7" }}
    >
      {activeStatusItem.render()}
    </div>
  );
}
