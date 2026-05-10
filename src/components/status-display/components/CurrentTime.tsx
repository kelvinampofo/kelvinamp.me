"use client";

import Tooltip from "../../tooltip/Tooltip";

interface CurrentTimeProps {
  time: string;
  offset: string;
}

export default function CurrentTime({ time, offset }: CurrentTimeProps) {
  return <Tooltip content={offset}>{time}</Tooltip>;
}
