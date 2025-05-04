"use client";

import { useEffect, useRef, type ModifierKey } from "react";

interface UseShortcutOptions {
  preventDefault?: boolean;
  modifierKeys?: ModifierKey | ModifierKey[];
  target?: Window | Document | HTMLElement;
}

export default function useShortcut(
  keys: string | string[],
  callback: () => void,
  options: UseShortcutOptions = {}
) {
  const { preventDefault = false, modifierKeys, target } = options;
  const callbackRef = useRef(callback);

  // update ref to always hold the latest callback without re-subscribing
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const targetElement =
      target ?? (typeof window !== "undefined" ? window : null);
    if (!targetElement) return;

    const handleKeyDown = (event: Event) => {
      const e = event as KeyboardEvent;
      const pressedKey = e.key.toLowerCase();
      const wantedKeys = Array.isArray(keys)
        ? keys.map((key) => key.toLowerCase())
        : [keys.toLowerCase()];

      const keyMatch = wantedKeys.includes(pressedKey);

      const modifierMatch = modifierKeys
        ? Array.isArray(modifierKeys)
          ? modifierKeys.every((mod) => e.getModifierState(mod))
          : e.getModifierState(modifierKeys)
        : true;

      if (keyMatch && modifierMatch) {
        if (preventDefault) {
          e.preventDefault();
        }
        callbackRef.current();
      }
    };

    targetElement.addEventListener("keydown", handleKeyDown);
    return () => {
      targetElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys, modifierKeys, preventDefault, target]);
}
