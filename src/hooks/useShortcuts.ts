"use client";

import { useEffect, useEffectEvent, useRef } from "react";

type LiteralUnion<T extends string> = T | (string & {});

type ModifierKey = "Alt" | "Control" | "Meta" | "Shift";
type MatchBy = "key" | "code";
type ShortcutTarget = Window | Document | HTMLElement;
type ShortcutCallback = (event?: KeyboardEvent) => void;

type AlphaKey =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

type DigitKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type NavigationKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
type EditingKey = "Backspace" | "Delete" | "Enter" | "Tab" | "Escape" | " ";

type KnownShortcutKey =
  | AlphaKey
  | DigitKey
  | NavigationKey
  | EditingKey
  | ModifierKey;

type ShortcutKey = LiteralUnion<KnownShortcutKey>;
type ShortcutMap = Partial<Record<ShortcutKey, ShortcutCallback>>;

interface UseShortcutsOptions {
  preventDefault?: boolean;
  modifiers?: ModifierKey | ModifierKey[];
  target?: ShortcutTarget;
  delay?: number;
  matchBy?: MatchBy;
  enabled?: boolean;
}

const SUPPORTED_MODIFIERS: ModifierKey[] = ["Alt", "Control", "Meta", "Shift"];

function normalizeShortcutKey(key: string, matchBy: MatchBy) {
  return matchBy === "key" ? key.toLowerCase() : key;
}

function normalizeModifiers(modifiers?: ModifierKey | ModifierKey[]) {
  if (!modifiers) return [];

  return Array.isArray(modifiers) ? modifiers : [modifiers];
}

function hasMatchingModifiers(
  event: KeyboardEvent,
  requiredModifiers: ModifierKey[]
) {
  const requiredModifierSet = new Set(requiredModifiers);

  return SUPPORTED_MODIFIERS.every(
    (modifier) =>
      event.getModifierState(modifier) === requiredModifierSet.has(modifier)
  );
}

export default function useShortcuts(
  shortcuts: ShortcutMap,
  options: UseShortcutsOptions = {}
) {
  const {
    preventDefault = false,
    modifiers,
    target,
    delay = 0,
    matchBy = "key",
    enabled = true,
  } = options;

  const shortcutBindings = Object.entries(shortcuts)
    .filter((entry): entry is [string, ShortcutCallback] => {
      const [_key, callback] = entry;

      return typeof callback === "function";
    })
    .map(([key, callback]) => ({
      id: key,
      key: normalizeShortcutKey(key, matchBy),
      callback,
    }));

  const holdTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const clearDelayTimers = useEffectEvent(() => {
    holdTimersRef.current.forEach((timer) => clearTimeout(timer));
    holdTimersRef.current.clear();
  });

  const handleShortcutKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (!enabled) return;

    const requiredModifiers = normalizeModifiers(modifiers);

    shortcutBindings.forEach((binding) => {
      const pressedKey =
        matchBy === "key" ? event.key.toLowerCase() : event.code;

      const isShortcutMatch =
        pressedKey === binding.key &&
        hasMatchingModifiers(event, requiredModifiers) &&
        !holdTimersRef.current.has(binding.id);

      if (!isShortcutMatch) return;

      function runShortcut() {
        if (preventDefault) {
          event.preventDefault();
        }

        binding.callback(event);
      }

      if (delay === 0) {
        runShortcut();
        return;
      }

      holdTimersRef.current.set(
        binding.id,
        setTimeout(() => {
          runShortcut();
          holdTimersRef.current.delete(binding.id);
        }, delay)
      );
    });
  });

  const handleShortcutKeyUp = useEffectEvent(() => {
    clearDelayTimers();
  });

  useEffect(() => {
    if (typeof window === "undefined" && !target) return;

    const targetElement = target ?? window;

    function handleKeyDown(event: Event) {
      if (!(event instanceof KeyboardEvent)) return;

      handleShortcutKeyDown(event);
    }

    function handleKeyUp() {
      handleShortcutKeyUp();
    }

    targetElement.addEventListener("keydown", handleKeyDown);
    targetElement.addEventListener("keyup", handleKeyUp);

    return () => {
      targetElement.removeEventListener("keydown", handleKeyDown);
      targetElement.removeEventListener("keyup", handleKeyUp);

      clearDelayTimers();
    };
  }, [target]);
}
