import { useEffect, type ModifierKey } from 'react';

interface UseShortcutOptions {
  preventDefault?: boolean;
  modifierKeys?: ModifierKey | ModifierKey[];
}

export default function useShortcut(
  key: string,
  callback: () => void,
  { preventDefault = false, modifierKeys }: UseShortcutOptions = {}
) {
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const isShortcutKeyPressed = event.key.toLowerCase() === key.toLowerCase();

      const isModifierPressed = modifierKeys
        ? Array.isArray(modifierKeys)
          ? modifierKeys.every((modifier) => event.getModifierState(modifier))
          : event.getModifierState(modifierKeys)
        : true;

      if (isShortcutKeyPressed && isModifierPressed) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback();
      }
    };

    window.addEventListener('keydown', handleShortcut);

    return () => window.removeEventListener('keydown', handleShortcut);
  }, [key, modifierKeys, preventDefault, callback]);
}
