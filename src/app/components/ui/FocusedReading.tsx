'use client';

import useShortcut from '@/app/hooks/useShortcut';
import { useRef, useState, type PropsWithChildren } from 'react';

export default function FocusedReading({ children }: PropsWithChildren) {
  const [isFocusModeEnabled, setIsFocusModeEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleFocusMode = () => {
    setIsFocusModeEnabled((prev) => !prev);
  };

  useShortcut('f', toggleFocusMode);

  return (
    <div ref={ref} data-focus-mode={isFocusModeEnabled ? 'enabled' : 'disabled'}>
      {children}
    </div>
  );
}
