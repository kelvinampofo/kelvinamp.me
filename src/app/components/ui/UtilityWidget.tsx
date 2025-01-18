'use client';

import { useBrowserInfo } from '@/app/hooks/useBrowserInfo';
import { useTime } from '@/app/hooks/useTime';
import { useWindowDimension } from '@/app/hooks/useWindowDimension';
import { format } from 'date-fns';
import { useState } from 'react';
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
  const { width, height } = useWindowDimension({ debounceDelay: 100 });

  const totalViews = Object.keys(Views).length / 2;

  const content = {
    [Views.Time]: currentTime,
    [Views.Clock]: <AnalogueClock />,
    [Views.Dimensions]: `${width}x${height}`,
    [Views.CurrentDate]: format(new Date(), 'EEE dd MMMM, yyyy'),
    [Views.BrowserInfo]: `${name} ${version}`
  };

  const handleView = () => setViewIndex((prevIndex) => (prevIndex + 1) % totalViews);

  const children = (
    <span
      className="inline-flex cursor-default gap-0.5 text-[10px] tabular-nums tracking-wider text-secondary dark:text-secondary-dark sm:text-xs"
      aria-live="polite"
      role="status"
      onMouseDown={handleView}
    >
      {content[viewIndex]}
    </span>
  );

  return (
    <div className="mt-12">
      {viewIndex === Views.Time ? <Tooltip content={timezoneOffset}>{children}</Tooltip> : children}
    </div>
  );
}
