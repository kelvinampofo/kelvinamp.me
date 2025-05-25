"use client";

import { useTime } from "../../../hooks/useTime";
import AnalogueClock from "../../analogue-clock/AnalogueClock";
import Tooltip from "../../tooltip/Tooltip";

export default function ClockView() {
  const { currentTime, timezoneName } = useTime();

  return (
    <Tooltip
      content={`${currentTime} ${timezoneName}`}
      triggerProps={{
        style: { "--tooltip-trigger-radius": "50%" },
      }}
    >
      <AnalogueClock />
    </Tooltip>
  );
}
