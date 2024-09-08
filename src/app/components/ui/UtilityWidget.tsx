'use client';

import { useBrowserInfo } from '@/app/hooks/useBrowserInfo';
import { useTime } from '@/app/hooks/useTime';
import { useWindowDimension } from '@/app/hooks/useWindowDimension';
import React, { useState } from 'react';
import AnalogueClock from './AnalogueClock';
import Tooltip from './Tooltip';

export default function UtilityWidget() {
  const [viewIndex, setViewIndex] = useState(0);

  const { currentTime, timezoneOffset } = useTime();
  const { name, version } = useBrowserInfo();
  const { width, height } = useWindowDimension();

  const handleView = () => {
    setViewIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  const renderView = () => {
    switch (viewIndex) {
      case 0:
        return currentTime;
      case 1:
        return <AnalogueClock />;
      case 2:
        return `${width}x${height}`;
      case 3:
        return `${name} ${version}`;
      default:
        return null;
    }
  };

  return (
    <Tooltip content={timezoneOffset} className="mt-12" onClick={handleView}>
      <span
        className="inline-flex cursor-default gap-0.5 text-[10px] tabular-nums tracking-wider text-secondary dark:text-secondary-dark sm:text-xs"
        aria-live="off"
        role="status"
      >
        {renderView()}
      </span>
    </Tooltip>
  );
}
