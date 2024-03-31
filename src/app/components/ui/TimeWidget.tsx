'use client';

import { useTime } from '@/app/hooks/useTime';
import React from 'react';
import Tooltip from './Tooltip';

export default function TimeWidget() {
  const { currentTime, meridiem, timezoneOffset } = useTime();

  return (
    <Tooltip content={timezoneOffset} className="mt-16">
      <span
        className="inline-flex cursor-default gap-1 font-mono text-xs text-secondary dark:text-secondary-dark"
        aria-live="off"
        role="status"
      >
        {currentTime}
        <span className="font-sans">{meridiem}</span>
      </span>
    </Tooltip>
  );
}
