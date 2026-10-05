"use client";

import { useEffect, useEffectEvent } from "react";

type ModifierKey = "Alt" | "Control" | "Meta" | "Shift";
type ShortcutCallback = (event: KeyboardEvent) => void;
type HoldTimers = Map<string, ReturnType<typeof setTimeout>>;

interface UseShortcutsOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  modifiers?: ModifierKey | ModifierKey[];
  matchBy?: "key" | "code";
  holdDurationMs?: number;
}

const MODIFIER_KEYS: ModifierKey[] = ["Alt", "Control", "Meta", "Shift"];

export default function useShortcuts(
  shortcuts: Record<string, ShortcutCallback>,
  {
    enabled = true,
    preventDefault = false,
    modifiers,
    matchBy = "key",
    holdDurationMs = 0,
  }: UseShortcutsOptions = {}
) {
  const requiredModifiers =
    typeof modifiers === "string" ? [modifiers] : (modifiers ?? []);

  const handleShortcut = useEffectEvent(
    (event: KeyboardEvent, timers: HoldTimers) => {
      if (event.defaultPrevented) return;

      const hasRequiredModifiers = MODIFIER_KEYS.every(
        (modifier) =>
          event.getModifierState(modifier) ===
          requiredModifiers.includes(modifier)
      );

      if (!hasRequiredModifiers) {
        cancelHoldTimers(timers);
        return;
      }

      const callback = Object.entries(shortcuts).find(([key]) =>
        matchBy === "key"
          ? key.toLowerCase() === event.key.toLowerCase()
          : key === event.code
      )?.[1];

      if (!callback) return;

      // preventDefault must run before the keydown handler returns
      if (preventDefault) {
        event.preventDefault();
      }

      if (timers.has(event.code) || (holdDurationMs > 0 && event.repeat)) {
        return;
      }

      if (holdDurationMs <= 0) {
        callback(event);
        return;
      }

      timers.set(
        event.code,
        setTimeout(() => {
          timers.delete(event.code);
          callback(event);
        }, holdDurationMs)
      );
    }
  );

  useEffect(() => {
    if (!enabled) return;

    const timers: HoldTimers = new Map();

    function clearTimers() {
      cancelHoldTimers(timers);
    }

    function handleKeyDown(event: KeyboardEvent) {
      handleShortcut(event, timers);
    }

    function handleKeyUp(event: KeyboardEvent) {
      // releasing a modifier breaks the shortcut's key combination
      if (MODIFIER_KEYS.some((modifier) => modifier === event.key)) {
        clearTimers();
        return;
      }

      clearTimeout(timers.get(event.code));
      timers.delete(event.code);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", clearTimers);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", clearTimers);
      clearTimers();
    };
  }, [enabled, holdDurationMs, matchBy, modifiers]);
}

function cancelHoldTimers(timers: HoldTimers) {
  timers.forEach((timer) => clearTimeout(timer));
  timers.clear();
}
