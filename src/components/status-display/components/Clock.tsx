"use client";

import type { TimeParts } from "../../../hooks/useTime";
import AnalogueClock from "../../analogue-clock/AnalogueClock";
import Tooltip from "../../tooltip/Tooltip";

interface ClockProps {
  currentTime: string;
  timezoneOffset: string;
  timeParts: TimeParts;
}

export default function Clock({
  currentTime,
  timezoneOffset,
  timeParts,
}: ClockProps) {
  return (
    <Tooltip content={`${currentTime} ${timezoneOffset}`}>
      <AnalogueClock timeParts={timeParts} />
    </Tooltip>
  );
}
