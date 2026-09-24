"use client";

import type { ComponentProps } from "react";

import AnalogueClock from "../../../components/analogue-clock/AnalogueClock";
import Tooltip from "../../../components/tooltip/Tooltip";

interface ClockProps extends ComponentProps<typeof AnalogueClock> {
  currentTime: string;
  timezoneOffset: string;
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
