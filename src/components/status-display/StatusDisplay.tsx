"use client";

import React, { useState } from "react";

import BrowserInfoView from "./components/BrowserInfo";
import ClockView from "./components/Clock";
import CurrentTimeView from "./components/CurrentTime";
import DimensionsView from "./components/Dimensions";
import Principle from "./components/Principle";
import styles from "./StatusDisplay.module.css";

const views = [
  ClockView,
  CurrentTimeView,
  Principle,
  DimensionsView,
  BrowserInfoView,
];

export default function StatusDisplay() {
  const [index, setIndex] = useState(0);

  const toggleView = () =>
    setIndex((prevIndex) => (prevIndex + 1) % views.length);

  const ActiveView = views[index];

  return (
    <div
      className={styles.statusDisplay}
      onMouseDown={toggleView}
      data-animate
      data-delay="450ms"
    >
      <ActiveView />
    </div>
  );
}
