'use client';

import { useTime } from '@/app/hooks/useTime';
import React, { useState } from 'react';
import AnalogueClock from './AnalogueClock';
import Tooltip from './Tooltip';

export default function TimeWidget() {
  const [showAnalogueClock, setShowAnalogueClock] = useState(false);
  const { currentTime, timezoneOffset } = useTime();

  const toggleDisplay = () => {
    setShowAnalogueClock((prevState) => !prevState);
  };

  return (
    <Tooltip content={timezoneOffset} className="mt-12" onClick={toggleDisplay}>
      <span
        className="inline-flex cursor-default gap-0.5 text-[10px] tabular-nums tracking-wider text-secondary dark:text-secondary-dark sm:text-xs"
        aria-live="off"
        role="status"
      >
        {showAnalogueClock ? <AnalogueClock /> : currentTime}
      </span>
    </Tooltip>
  );
}
