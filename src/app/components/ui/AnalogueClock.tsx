'use client';

import { useTime } from '@/app/hooks/useTime';

export default function AnalogClock() {
  const { currentTime } = useTime();

  const [hours, minutes, seconds] = currentTime.split(':').map((part) => parseInt(part, 10));

  const hourAngle = (hours % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60);
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <div className="relative inline-flex size-5 rounded-full border border-neutral-400 dark:border-neutral-600">
      <div
        className="absolute inset-x-1/2 top-[6px] z-10 ml-[-1.2px] h-1 w-px origin-[bottom_center] rounded-lg bg-secondary dark:bg-neutral-500"
        style={{
          transform: `rotate(${hourAngle}deg)`
        }}
      />
      <div
        className="absolute left-1/2 top-[3px] z-20 ml-[-1.2px] h-[7px] w-px origin-[bottom_center] rounded-lg bg-secondary dark:bg-neutral-500"
        style={{
          transform: `rotate(${minuteAngle}deg)`
        }}
      />
      <div
        className="absolute left-1/2 top-[2.5px] z-30 -ml-px h-[7.5px] w-[0.5px] origin-[bottom_center] rounded-lg bg-[var(--focus-outer-colour)]"
        style={{
          transform: `rotate(${secondAngle}deg)`
        }}
      />
    </div>
  );
}
