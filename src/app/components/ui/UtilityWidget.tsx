'use client';

import { useBrowserInfo } from '@/app/hooks/useBrowserInfo';
import { useTime } from '@/app/hooks/useTime';
import { useWindowDimension } from '@/app/hooks/useWindowDimension';
import React, { useState } from 'react';
import AnalogueClock from './AnalogueClock';
import Tooltip from './Tooltip';

enum Views {
  Time,
  Clock,
  Dimensions,
  BrowserInfo
}

export default function UtilityWidget() {
  const [viewIndex, setViewIndex] = useState<Views>(Views.Time);

  const { currentTime, timezoneOffset } = useTime();
  const { name, version } = useBrowserInfo();
  const { width, height } = useWindowDimension();

  // dividing by 2 because enums create both string and number keys
  const totalViews = Object.keys(Views).length / 2;

  const handleView = () => setViewIndex((prevIndex) => (prevIndex + 1) % totalViews);

  const renderView = () => {
    switch (viewIndex) {
      case Views.Time:
        return currentTime;
      case Views.Clock:
        return <AnalogueClock />;
      case Views.Dimensions:
        return `${width}x${height}`;
      case Views.BrowserInfo:
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
