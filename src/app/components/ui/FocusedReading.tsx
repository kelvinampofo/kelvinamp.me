'use client';

import { useShortcut } from '@/app/hooks/useShortcut';
import { isMacOS } from '@/app/utils/os';
import { useRef, useState, type ModifierKey, type PropsWithChildren } from 'react';

export default function FocusedReading({ children }: PropsWithChildren) {
  const [isFocusModeEnabled, setIsFocusModeEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleFocusMode = () => {
    setIsFocusModeEnabled((prev) => !prev);
  };

  const modifierKey: ModifierKey = isMacOS ? 'Control' : 'Shift';
  useShortcut(modifierKey, 'F', toggleFocusMode);

  return (
    <div ref={ref} data-focus-mode={isFocusModeEnabled ? 'enabled' : 'disabled'}>
      {children}
    </div>
  );
}
