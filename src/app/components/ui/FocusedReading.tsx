'use client';

import { useShortcut } from '@/app/hooks/useShortcut';
import { isMacOS } from '@/app/lib/utils';
import c from 'clsx';
import { useRef, useState } from 'react';

interface FocusedReadingProps {
  children: React.ReactNode;
}

export default function FocusedReading({ children }: FocusedReadingProps) {
  const [isFocusModeEnabled, setIsFocusModeEnabled] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const modifierkey = isMacOS ? 'Control' : 'Alt';
  useShortcut(modifierkey, 'F', toggleFocusMode);

  function toggleFocusMode() {
    setIsFocusModeEnabled(true);
    divRef.current?.classList.toggle('focus-mode');
  }

  return (
    <div className={c(isFocusModeEnabled && 'focus-mode')} ref={divRef}>
      {children}
    </div>
  );
}
