"use client";

import { useEffect, useRef } from "react";

interface DragState {
  id: string;
  pointerId: number;
  startClientX: number;
  startClientY: number;
  elementStartX: number;
  elementStartY: number;
}

interface DragUpdateArgs {
  id: string;
  elementStartX: number;
  elementStartY: number;
  startClientX: number;
  startClientY: number;
  currentClientX: number;
  currentClientY: number;
  deltaXInCanvasSpace: number;
  deltaYInCanvasSpace: number;
  nextElementX: number;
  nextElementY: number;
  scale: number;
  event: PointerEvent;
}

interface UseDragOptions {
  getScale: () => number;
  getInitialPositionById: (id: string) => { x: number; y: number } | undefined;
  onDrag: (args: DragUpdateArgs) => void;
}

export default function useDrag({
  getScale,
  getInitialPositionById,
  onDrag,
}: UseDragOptions) {
  const activeDragRef = useRef<DragState | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const activeDrag = activeDragRef.current;

      if (!activeDrag) return;

      const scale = getScale();
      const deltaXInCanvasSpace = (e.clientX - activeDrag.startClientX) / scale;
      const deltaYInCanvasSpace = (e.clientY - activeDrag.startClientY) / scale;
      const nextElementX = activeDrag.elementStartX + deltaXInCanvasSpace;
      const nextElementY = activeDrag.elementStartY + deltaYInCanvasSpace;

      onDrag({
        id: activeDrag.id,
        elementStartX: activeDrag.elementStartX,
        elementStartY: activeDrag.elementStartY,
        startClientX: activeDrag.startClientX,
        startClientY: activeDrag.startClientY,
        currentClientX: e.clientX,
        currentClientY: e.clientY,
        deltaXInCanvasSpace,
        deltaYInCanvasSpace,
        nextElementX,
        nextElementY,
        scale,
        event: e,
      });
    };

    const onUp = () => {
      if (activeDragRef.current) activeDragRef.current = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [getScale, onDrag]);

  const onElementPointerDown =
    (id: string) => (e: React.PointerEvent<HTMLDivElement>) => {
      const initialPosition = getInitialPositionById(id);

      if (!initialPosition) return;

      activeDragRef.current = {
        id,
        pointerId: e.pointerId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        elementStartX: initialPosition.x,
        elementStartY: initialPosition.y,
      };

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

      e.preventDefault();
      e.stopPropagation();
    };

  return { onElementPointerDown };
}
