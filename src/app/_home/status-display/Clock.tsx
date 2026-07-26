"use client";

import AnalogueClock from "../../../components/analogue-clock/AnalogueClock";
import Tooltip from "../../../components/tooltip/Tooltip";
import type { TimeParts } from "../../../hooks/useTime";

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
