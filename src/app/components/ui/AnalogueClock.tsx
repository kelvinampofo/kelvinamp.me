'use client';

import { useTime } from '@/app/hooks/useTime';

export default function AnalogClock() {
  const { currentTime } = useTime();

  const [hours, minutes, seconds] = currentTime.split(':').map((part) => parseInt(part, 10));

  const hoursDeg = (hours / 12) * 360 + (minutes / 60) * 30;
  const minutesDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const secondsDeg = (seconds / 60) * 360;

  return (
    <div
      className="relative inline-flex size-5 rounded-full border border-neutral-400 dark:border-neutral-600"
      aria-hidden="true"
    >
      <div
        className="absolute inset-x-1/2 top-[6px] z-10 ml-[-1.2px] h-1 w-px origin-[bottom_center] rounded-lg bg-secondary dark:bg-neutral-500"
        style={{
          transform: `rotate(${hoursDeg}deg)`
        }}
      />
      <div
        className="absolute left-1/2 top-[3px] z-20 ml-[-1.2px] h-[7px] w-px origin-[bottom_center] rounded-lg bg-secondary dark:bg-neutral-500"
        style={{
          transform: `rotate(${minutesDeg}deg)`
        }}
      />
      <div
        className="absolute left-1/2 top-[2.5px] z-30 -ml-px h-[7.5px] w-[0.5px] origin-[bottom_center] rounded-lg bg-[var(--focus-outer-colour)]"
        style={{
          transform: `rotate(${secondsDeg}deg)`
        }}
      />
    </div>
  );
}
