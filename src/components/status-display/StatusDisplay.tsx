"use client";

import { Children, ReactNode, useState } from "react";

import BrowserInfoView from "./components/BrowserInfo";
import ClockView from "./components/Clock";
import CurrentTimeView from "./components/CurrentTime";
import DimensionsView from "./components/Dimensions";
import Principle from "./components/Principle";
import styles from "./StatusDisplay.module.css";

interface StatusDisplayRootProps {
  children: ReactNode;
}

function StatusDisplayRoot({ children }: StatusDisplayRootProps) {
  const [index, setIndex] = useState(0);

  const items = Children.toArray(children);
  const totalItems = items.length;
  const activeIndex = totalItems > 0 ? index % totalItems : 0;

  function showNextItem() {
    if (totalItems === 0) {
      return;
    }

    setIndex((currentIndex) => (currentIndex + 1) % totalItems);
  }

  if (totalItems === 0) {
    return null;
  }

  return (
    <div
      className={styles.statusDisplay}
      data-animate
      onMouseDown={showNextItem}
      style={{ "--stagger": "7" }}
    >
      {items[activeIndex]}
    </div>
  );
}

export default function StatusDisplay() {
  return (
    <StatusDisplayRoot>
      <ClockView />
      <CurrentTimeView />
      <Principle />
      <DimensionsView />
      <BrowserInfoView />
    </StatusDisplayRoot>
  );
}
