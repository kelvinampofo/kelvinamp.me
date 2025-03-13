'use client';

import { format } from 'date-fns';
import { useState, ReactNode } from 'react';

import { useBrowserInfo } from '@/app/hooks/useBrowserInfo';
import { useTime } from '@/app/hooks/useTime';
import { useWindowDimension } from '@/app/hooks/useWindowDimension';

import AnalogueClock from './AnalogueClock';
import Tooltip from './Tooltip';

enum Views {
  CurrentTime,
  Clock,
  Dimensions,
  BrowserInfo
}

export default function StatusDisplay() {
  const [viewIndex, setViewIndex] = useState(Views.CurrentTime);

  const { currentTime, timezoneOffset } = useTime();
  const { name, version } = useBrowserInfo();
  const { width, height } = useWindowDimension({ debounceDelay: 100 });

  const viewContentMap: Record<Views, ReactNode> = {
    [Views.CurrentTime]: currentTime,
    [Views.Clock]: <AnalogueClock />,
    [Views.Dimensions]: `${width}x${height}`,
    [Views.BrowserInfo]: `${name} ${version}`
  };

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

  const currentDate = format(new Date(), 'dd MMM, yyyy');

  function toggleView() {
    setViewIndex((prevIndex) => (prevIndex + 1) % totalViews);
  }

  return (
    <div className="mt-16">
      {viewIndex === Views.Clock || viewIndex === Views.CurrentTime ? (
        <Tooltip
          content={
            viewIndex === Views.Clock ? (
              <span className="tabular-nums">{currentTime}</span>
            ) : (
              `${currentDate} ${timezoneOffset}`
            )
          }
        >
          {viewElement}
        </Tooltip>
      ) : (
        viewElement
      )}
    </div>
  );
}
