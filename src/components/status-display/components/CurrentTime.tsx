"use client";

import Tooltip from "../../tooltip/Tooltip";

interface CurrentTimeProps {
  currentTime: string;
  timezoneOffset: string;
}

export default function CurrentTime({
  currentTime,
  timezoneOffset,
}: CurrentTimeProps) {
  return <Tooltip content={timezoneOffset}>{currentTime}</Tooltip>;
}
