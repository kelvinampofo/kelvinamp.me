'use client';

import { useTime } from '@/app/hooks/useTime';

export default function AnalogClock() {
  const { currentTime } = useTime();

  const timeParts = currentTime.split(':');

  // parse as base-10 numbers
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;

  return (
    <div className="relative inline-flex size-5 rounded-full border border-secondary dark:border-neutral-600">
      <div
        className="absolute left-1/2 top-[6.1px] z-10 ml-[-0.25px] h-1 w-px bg-secondary dark:bg-neutral-500"
        style={{
          transform: `rotateZ(${hourAngle}deg)`,
          transformOrigin: '50% 4px'
        }}
      />
      <div
        className="absolute left-1/2 top-[3.1px] z-20 ml-[-0.25px] h-[7px] w-px bg-secondary/80 dark:bg-neutral-500"
        style={{
          transform: `rotateZ(${minuteAngle}deg)`,
          transformOrigin: '50% 7px'
        }}
      />
    </div>
  );
}
