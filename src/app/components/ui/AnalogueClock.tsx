'use client';

import { useTime } from '@/app/hooks/useTime';

export default function AnalogClock() {
  const { currentTime } = useTime();

  const [hours, minutes] = currentTime.split(':').map((timePart) => parseInt(timePart, 10));

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;

  return (
    <div className="relative inline-flex size-5 rounded-full border border-secondary dark:border-neutral-600">
      <div
        className="absolute left-1/2 top-[6px] z-10 ml-[-0.25px] h-1 w-px origin-[bottom_center] rounded-t-sm bg-secondary dark:bg-neutral-500"
        style={{
          transform: `rotateZ(${hourAngle}deg)`
        }}
      />
      <div
        className="absolute left-1/2 top-[3px] z-20 ml-[-0.25px] h-[7px] w-px origin-[bottom_center] rounded-t-sm bg-secondary/80 dark:bg-neutral-500"
        style={{
          transform: `rotateZ(${minuteAngle}deg)`
        }}
      />
    </div>
  );
}
