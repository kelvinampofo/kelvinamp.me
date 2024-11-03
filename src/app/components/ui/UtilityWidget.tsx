'use client';

import { useBrowserInfo } from '@/app/hooks/useBrowserInfo';
import { useTime } from '@/app/hooks/useTime';
import { useWindowDimension } from '@/app/hooks/useWindowDimension';
import { format } from 'date-fns';
import React, { useState } from 'react';
import AnalogueClock from './AnalogueClock';
import Tooltip from './Tooltip';

enum Views {
  Time,
  Clock,
  CurrentDate,
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
      case Views.CurrentDate:
        return `${format(new Date(), 'EEEE dd MMMM')}`;
      case Views.BrowserInfo:
        return `${name} ${version}`;
      default:
        return null;
    }
  };

  const children = (
    <span
      className="inline-flex cursor-default gap-0.5 text-[10px] tabular-nums tracking-wider text-secondary dark:text-secondary-dark sm:text-xs"
      aria-live="off"
      role="status"
      onMouseDown={handleView}
    >
      {renderView()}
    </span>
  );

  return (
    <div className="mt-12">
      {viewIndex === Views.Time ? <Tooltip content={timezoneOffset}>{children}</Tooltip> : children}
    </div>
  );
}
