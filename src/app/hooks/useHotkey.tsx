import { useCallback, useEffect, type ModifierKey } from 'react';

export function useHotKey(
  modifiers: ModifierKey | ModifierKey[],
  shortcut: string,
  callback: () => void
) {
  const handleKeyboardShortcut = useCallback(
    (event: KeyboardEvent) => {
      const isCorrectKey = event.key.toLowerCase() === shortcut.toLowerCase();
      const modifiersArray = Array.isArray(modifiers) ? modifiers : [modifiers];
      const hasCorrectModifiers = modifiersArray.every((modifier) =>
        event.getModifierState(modifier)
      );

      if (isCorrectKey && hasCorrectModifiers) {
        event.preventDefault();
        callback();
      }
    },
    [modifiers, shortcut, callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut);

    return () => window.removeEventListener('keydown', handleKeyboardShortcut);
  }, [handleKeyboardShortcut]);
}
