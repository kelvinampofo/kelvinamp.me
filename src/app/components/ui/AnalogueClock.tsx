'use client';

import { useTime } from '@/app/hooks/useTime';
import c from 'clsx';

export default function AnalogClock() {
  const { currentTime } = useTime();

  const [hours, minutes, seconds] = currentTime.split(':').map((part) => parseInt(part, 10));

  const hoursDeg = (hours % 12) * 30 + (minutes / 60) * 30;
  const minutesDeg = minutes * 6 + (seconds / 60) * 6;
  const secondsDeg = seconds * 6;

  return (
    <div
      className="relative inline-flex size-5 rounded-full border border-neutral-400 dark:border-neutral-600"
      aria-label="Analog clock showing the current time"
      role="img"
    >
      <ClockHand
        rotation={hoursDeg}
        height="25%"
        zIndex={10}
        color="bg-secondary dark:bg-neutral-500"
      />

      <ClockHand
        rotation={minutesDeg}
        height="35%"
        zIndex={20}
        color="bg-secondary dark:bg-neutral-500"
      />

      <ClockHand
        rotation={secondsDeg}
        height="40%"
        width="0.5px"
        zIndex={30}
        color="bg-[var(--focus-outer-colour)]"
      />
    </div>
  );
}

interface ClockHandProps {
  rotation: number;
  height: string;
  zIndex: number;
  color: string;
  width?: string;
}

function ClockHand({ rotation, height, width = '1px', zIndex, color }: ClockHandProps) {
  return (
    <div
      className={c('absolute left-1/2 top-1/2 origin-[bottom_center]', color)}
      style={{
        transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
        height,
        width,
        zIndex,
        borderRadius: '2px'
      }}
    />
  );
}
