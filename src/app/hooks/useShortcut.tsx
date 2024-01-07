import { useCallback, useEffect, type ModifierKey } from 'react';

type Options = {
  preventDefault: boolean;
};

export function useShortcut(
  modifierkey: ModifierKey | ModifierKey[],
  key: string,
  callback: () => void,
  options: Options = { preventDefault: false }
) {
  if (modifierkey.length === 0) throw new Error('A valid modifier key(s) must be provided.');

  const { preventDefault } = options;

  const handleShortcut = useCallback(
    (event: KeyboardEvent) => {
      const isShortcutKeyPressed = event.key.toLowerCase() === key.toLowerCase();

      const isModifierPressed = Array.isArray(modifierkey)
        ? modifierkey.every((modifier) => event.getModifierState(modifier))
        : event.getModifierState(modifierkey);

      if (isShortcutKeyPressed && isModifierPressed) {
        if (preventDefault) event.preventDefault();
        callback();
      }
    },
    [callback, key, modifierkey, preventDefault]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleShortcut);

    return () => window.removeEventListener('keydown', handleShortcut);
  }, [handleShortcut]);
}
