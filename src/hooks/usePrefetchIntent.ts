"use client";

import { useEffect, useState, type RefObject } from "react";

export type IntentSource = "focus" | "hover" | "prediction";

export const skipPrefetchIntent = Symbol("skipPrefetchIntent");

export default function usePrefetchIntent(
  triggerRef: RefObject<HTMLElement | null> | typeof skipPrefetchIntent,
) {
  const [intentSource, setIntentSource] = useState<IntentSource | null>(null);

  useEffect(() => {
    if (
      triggerRef === skipPrefetchIntent ||
      intentSource !== null ||
      typeof window.PointerEvent?.prototype.getPredictedEvents !== "function"
    ) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.buttons !== 0) return;

      const predictedEvents = event.getPredictedEvents();
      const predictedEvent = predictedEvents.at(-1);
      const trigger = triggerRef.current;
      const hitsTrigger =
        trigger && predictedEvent
          ? trigger.contains(
              document.elementFromPoint(predictedEvent.clientX, predictedEvent.clientY),
            )
          : false;

      if (hitsTrigger) {
        setIntentSource((current) => current ?? "prediction");
      }
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, [triggerRef, intentSource]);

  function markIntent(source: Exclude<IntentSource, "prediction">) {
    if (triggerRef !== skipPrefetchIntent) {
      setIntentSource((current) => current ?? source);
    }
  }

  return { intentSource, markIntent };
}
