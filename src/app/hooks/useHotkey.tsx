import { useCallback, useEffect, type ModifierKey } from 'react';

type Options = {
  preventDefault?: boolean; //* to prevent the browsers default behavior on certain keystrokes e.g. ctrl+s
};

export function useHotKey(
  modifierkey: ModifierKey | ModifierKey[],
  key: string,
  callback: () => void,
  options: Options = {}
) {
  const { preventDefault = false } = options;

  const handleKeyboardShortcut = useCallback(
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
    [key, modifierkey, preventDefault, callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut);

    return () => window.removeEventListener('keydown', handleKeyboardShortcut);
  }, [handleKeyboardShortcut]);
}
