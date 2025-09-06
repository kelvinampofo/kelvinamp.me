"use client";

import { useEffect, useRef } from "react";

import type { CanvasElement } from "../app/mood/types";

type DragState = {
  id: string;
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
};

interface UseDragOptions {
  getScale: () => number;
  getElementById: (id: string) => CanvasElement | undefined;
  setElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
}

export default function useDrag({
  getScale,
  getElementById,
  setElements,
}: UseDragOptions) {
  const draggingRef = useRef<DragState | null>(null);

  const onElementPointerDown =
    (id: string) => (e: React.PointerEvent<HTMLDivElement>) => {
      const current = getElementById(id);

      if (!current) return;

      draggingRef.current = {
        id,
        pointerId: e.pointerId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startX: current.x,
        startY: current.y,
      };

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

      e.preventDefault();
      e.stopPropagation();
    };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = draggingRef.current;

      if (!drag) return;
      const scale = getScale();
      const dx = (e.clientX - drag.startClientX) / scale;
      const dy = (e.clientY - drag.startClientY) / scale;
      const nx = drag.startX + dx;
      const ny = drag.startY + dy;

      setElements((prev) => {
        return prev.map((el) =>
          el.id === drag.id ? { ...el, x: nx, y: ny } : el
        );
      });
    };

    const onUp = () => {
      if (draggingRef.current) draggingRef.current = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [getScale, setElements]);

  return { onElementPointerDown };
}
