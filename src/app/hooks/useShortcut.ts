"use client";

import { useEffect, useRef, type ModifierKey } from "react";

interface Options {
  preventDefault?: boolean;
  modifiers?: ModifierKey | ModifierKey[];
  target?: Window | Document | HTMLElement;
  pressDelay?: number;
}

export default function useShortcut(
  shortcutKeys: string | string[],
  callback: () => void,
  options: Options = {}
) {
  const { preventDefault = false, modifiers, target, pressDelay = 0 } = options;
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearHoldTimer = () => {
      if (holdTimerRef.current !== null) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    };

    clearHoldTimer();

    if (typeof window === "undefined" && !target) {
      return;
    }

    const targetElement = target ?? window;

    const shortcutKeysSet = new Set(
      Array.isArray(shortcutKeys)
        ? shortcutKeys.map((key) => key.toLowerCase())
        : [shortcutKeys.toLowerCase()]
    );

    const hasActiveModifiers = modifiers
      ? Array.isArray(modifiers)
        ? (e: KeyboardEvent) =>
            modifiers.every((modifier) => e.getModifierState(modifier))
        : (e: KeyboardEvent) => e.getModifierState(modifiers)
      : () => true;

    const triggerCallback = (e: KeyboardEvent) => {
      if (preventDefault) {
        e.preventDefault();
      }
      callbackRef.current();
    };

    const handleKeyDown: EventListener = (e) => {
      if (!(e instanceof KeyboardEvent)) {
        return;
      }

      const pressedKey = e.key.toLowerCase();
      const keyMatch = shortcutKeysSet.has(pressedKey);
      const modifierMatch = hasActiveModifiers(e);

      if (!keyMatch || !modifierMatch || holdTimerRef.current !== null) {
        return;
      }

      if (pressDelay === 0) {
        triggerCallback(e);
        return;
      }

      holdTimerRef.current = setTimeout(() => {
        triggerCallback(e);
        holdTimerRef.current = null;
      }, pressDelay);
    };

    const handleKeyUp = () => {
      clearHoldTimer();
    };

    targetElement.addEventListener("keydown", handleKeyDown);
    targetElement.addEventListener("keyup", handleKeyUp);

    return () => {
      targetElement.removeEventListener("keydown", handleKeyDown);
      targetElement.removeEventListener("keyup", handleKeyUp);

      clearHoldTimer();
    };
  }, [shortcutKeys, modifiers, preventDefault, target, pressDelay]);
}
