import { useCallback, useEffect, type ModifierKey } from 'react';

type Options = {
  preventDefault?: boolean;
};

export function useHotKey(
  modifierkey: ModifierKey | ModifierKey[],
  key: string,
  callback: () => void,
  options: Options = {}
) {
  if (modifierkey.length === 0) throw new Error('A valid modifier key or keys must be provided.');

  const { preventDefault = false } = options;

  const handleHotkey = useCallback(
    (event: KeyboardEvent) => {
      const isHotkeyPressed = event.key.toLowerCase() === key.toLowerCase();

      const isModifierPressed = Array.isArray(modifierkey)
        ? modifierkey.every((modifier) => event.getModifierState(modifier))
        : event.getModifierState(modifierkey);

      if (isHotkeyPressed && isModifierPressed) {
        if (preventDefault) event.preventDefault();
        callback();
      }
    },
    [callback, key, modifierkey, preventDefault]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleHotkey);

    return () => document.removeEventListener('keydown', handleHotkey);
  }, [handleHotkey]);
}
