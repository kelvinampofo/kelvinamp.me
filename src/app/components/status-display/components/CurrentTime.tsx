"use client";

import React from "react";

import { useTime } from "../../../hooks/useTime";
import Tooltip from "../../tooltip/Tooltip";

export default function CurrentTimeView() {
  const { currentTime, timezoneOffset } = useTime();

  return <Tooltip content={timezoneOffset}>{currentTime}</Tooltip>;
}
