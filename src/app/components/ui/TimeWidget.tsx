'use client';

import useTime from '@/app/hooks/useTime';
import React from 'react';
import Tooltip from './Tooltip';

export default function TimeWidget() {
  const { currentTime, timezoneOffset } = useTime();

  return (
    <Tooltip content={timezoneOffset} className="mt-16">
      <span
        className="inline-block cursor-crosshair font-mono text-xs text-secondary dark:text-secondary-dark"
        aria-live="off"
        role="status"
      >
        {currentTime}
      </span>
    </Tooltip>
  );
}
