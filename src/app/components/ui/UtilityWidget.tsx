'use client';

import { useBrowserInfo } from '@/app/hooks/useBrowserInfo';
import { useTime } from '@/app/hooks/useTime';
import { useWindowDimension } from '@/app/hooks/useWindowDimension';
import { useState, ReactNode } from 'react';
import AnalogueClock from './AnalogueClock';
import Tooltip from './Tooltip';

enum Views {
  Clock,
  Dimensions,
  BrowserInfo
}

export default function UtilityWidget() {
  const [viewIndex, setViewIndex] = useState(Views.Clock);

  const { currentTime, timezoneOffset } = useTime();
  const { name, version } = useBrowserInfo();
  const { width, height } = useWindowDimension({ debounceDelay: 100 });

  const viewContentMap: Record<Views, ReactNode> = {
    [Views.Clock]: <AnalogueClock />,
    [Views.Dimensions]: `${width}x${height}`,
    [Views.BrowserInfo]: `${name} ${version}`
  };

  const tooltipContent = (
    <div className="flex gap-1 text-xs tabular-nums">
      {currentTime}
      <span className="text-secondary dark:text-secondary-dark">{timezoneOffset}</span>
    </div>
  );

  const viewElement = (
    <span
      className="inline-flex cursor-default gap-0.5 text-sm tabular-nums tracking-wider text-secondary dark:text-secondary-dark sm:text-xs"
      aria-live="polite"
      role="status"
      onMouseDown={toggleView}
    >
      {viewContentMap[viewIndex]}
    </span>
  );

  const totalViews = Object.keys(Views).length / 2;

  function toggleView() {
    setViewIndex((prevIndex) => (prevIndex + 1) % totalViews);
  }

  return (
    <div className="mt-16">
      {viewIndex === Views.Clock ? (
        <Tooltip content={tooltipContent}>{viewElement}</Tooltip>
      ) : (
        viewElement
      )}
    </div>
  );
}
