"use client";

import type { TimeParts } from "../../../hooks/useTime";
import AnalogueClock from "../../analogue-clock/AnalogueClock";
import Tooltip from "../../tooltip/Tooltip";

interface ClockProps {
  currentTime: string;
  timeParts: TimeParts;
}

export default function Clock({ currentTime, timeParts }: ClockProps) {
  return (
    <Tooltip
      content={currentTime}
      triggerProps={{
        style: { "--tooltip-trigger-radius": "50%" },
      }}
    >
      <AnalogueClock timeParts={timeParts} />
    </Tooltip>
  );
}
