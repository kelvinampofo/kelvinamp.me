"use client";

import { useEffect, useRef } from "react";

const MODIFIER_KEYS = ["Alt", "Control", "Meta", "Shift"] as const;
type ModifierKey = (typeof MODIFIER_KEYS)[number];

interface Options {
  preventDefault?: boolean;
  modifiers?: ModifierKey | ModifierKey[];
  target?: Window | Document | HTMLElement;
  delay?: number;
  matchBy?: "key" | "code";
}

export default function useShortcuts(
  shortcutKeys: string | string[],
  callback: () => void,
  options: Options = {}
) {
  const {
    preventDefault = false,
    modifiers,
    target,
    delay = 0,
    matchBy = "key",
  } = options;

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" && !target) {
      return;
    }

    const targetElement = target ?? window;

    const shortcutKeysSet = new Set(
      Array.isArray(shortcutKeys)
        ? shortcutKeys.map((key) =>
            matchBy === "key" ? key.toLowerCase() : key
          )
        : [matchBy === "key" ? shortcutKeys.toLowerCase() : shortcutKeys]
    );

    const clearHoldTimer = () => {
      if (holdTimerRef.current !== null) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    };

    const hasActiveModifiers = (e: KeyboardEvent) => {
      const activeModifiers = MODIFIER_KEYS.filter((mod) =>
        e.getModifierState(mod)
      );

      if (!modifiers) {
        return activeModifiers.length === 0;
      }

      const expected = Array.isArray(modifiers) ? modifiers : [modifiers];

      return (
        activeModifiers.length === expected.length &&
        expected.every((mod) => activeModifiers.includes(mod))
      );
    };

    const handleCallback = (e: KeyboardEvent) => {
      if (preventDefault) {
        e.preventDefault();
      }
      callbackRef.current();
    };

    const handleKeyDown = (e: Event) => {
      if (!(e instanceof KeyboardEvent)) {
        return;
      }

      const pressed = matchBy === "key" ? e.key.toLowerCase() : e.code;
      const keyMatch = shortcutKeysSet.has(pressed);

      const modifierMatch = hasActiveModifiers(e);

      if (!keyMatch || !modifierMatch || holdTimerRef.current !== null) {
        return;
      }

      if (delay === 0) {
        handleCallback(e);
      } else {
        holdTimerRef.current = setTimeout(() => {
          handleCallback(e);
          holdTimerRef.current = null;
        }, delay);
      }
    };

    const handleKeyUp = () => clearHoldTimer();

    targetElement.addEventListener("keydown", handleKeyDown);
    targetElement.addEventListener("keyup", handleKeyUp);

    return () => {
      targetElement.removeEventListener("keydown", handleKeyDown);
      targetElement.removeEventListener("keyup", handleKeyUp);

      clearHoldTimer();
    };
  }, [shortcutKeys, modifiers, preventDefault, target, delay, matchBy]);
}
