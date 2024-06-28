'use client';

import { useTime } from '@/app/hooks/useTime';
import React, { useState } from 'react';
import AnalogueClock from './AnalogueClock';
import Tooltip from './Tooltip';

export default function TimeWidget() {
  const [showAnalogueClock, setShowAnalogueClock] = useState(false);
  const { currentTime, meridiem, timezoneOffset } = useTime();

  const toggleDisplay = () => {
    setShowAnalogueClock((prevState) => !prevState);
  };

  return (
    <Tooltip content={timezoneOffset} className="mt-12" onClick={toggleDisplay}>
      <span
        className="inline-flex cursor-default gap-1 text-[10px] tabular-nums tracking-wider text-secondary dark:text-secondary-dark sm:text-xs"
        aria-live="off"
        role="status"
      >
        {showAnalogueClock ? (
          <AnalogueClock />
        ) : (
          <>
            {currentTime}
            <span className="font-sans">{meridiem}</span>
          </>
        )}
      </span>
    </Tooltip>
  );
}
