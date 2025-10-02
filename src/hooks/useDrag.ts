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

interface Point {
  x: number;
  y: number;
}

interface DragUpdate {
  element: {
    id: string;
    start: Point;
    next: Point;
  };
  client: {
    start: Point;
    current: Point;
  };
  canvas: {
    delta: Point;
    scale: number;
  };
  event: PointerEvent;
}

interface UseDragOptions {
  getScale: () => number;
  getInitialPositionById: (id: string) => { x: number; y: number } | undefined;
  onDrag: (args: DragUpdate) => void;
}

const grab = {
  start: () => document.body.classList.add("gesture-grabbing"),
  end: () => document.body.classList.remove("gesture-grabbing"),
};

/**
 * custom useDrag hook for moving elements on a scaled canvas.
 *
 * @param options configuration for drag behavior:
 * - getScale: read current canvas scale to compute canvas-space deltas
 * - getInitialPositionById: fetch element's starting x/y by id
 * - onDrag: callback with grouped drag details (element, client, canvas)
 *
 * @returns drag controls:
 * - onElementPointerDown: attach to a draggable element to start drag
 */
export default function useDrag({
  getScale,
  getInitialPositionById,
  onDrag,
}: UseDragOptions) {
  const activeDragRef = useRef<DragState | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const onPointerMove = (event: PointerEvent) => {
      const activeDrag = activeDragRef.current;

      if (!activeDrag) return;

      const scale = getScale();

      const deltaXInCanvasSpace =
        (event.clientX - activeDrag.startClientX) / scale;
      const deltaYInCanvasSpace =
        (event.clientY - activeDrag.startClientY) / scale;

      const nextElementX = activeDrag.elementStartX + deltaXInCanvasSpace;
      const nextElementY = activeDrag.elementStartY + deltaYInCanvasSpace;

      onDrag({
        element: {
          id: activeDrag.id,
          start: { x: activeDrag.elementStartX, y: activeDrag.elementStartY },
          next: { x: nextElementX, y: nextElementY },
        },
        client: {
          start: { x: activeDrag.startClientX, y: activeDrag.startClientY },
          current: { x: event.clientX, y: event.clientY },
        },
        canvas: {
          delta: { x: deltaXInCanvasSpace, y: deltaYInCanvasSpace },
          scale,
        },
        event,
      });
    };

    function handlePointerEnd() {
      if (activeDragRef.current) {
        activeDragRef.current = null;
      }

      grab.end();
    }

    window.addEventListener("pointermove", onPointerMove, { signal });
    window.addEventListener("pointerup", handlePointerEnd, { signal });
    window.addEventListener("pointercancel", handlePointerEnd, { signal });

    return () => {
      controller.abort();
    };
  }, [getScale, onDrag]);

  useEffect(
    () => () => {
      activeDragRef.current = null;
      grab.end();
    },
    []
  );

  function onElementPointerDown(id: string) {
    return function (pointerDownEvent: React.PointerEvent<HTMLDivElement>) {
      const initialPosition = getInitialPositionById(id);

      if (!initialPosition) return;

      activeDragRef.current = {
        id,
        pointerId: pointerDownEvent.pointerId,
        startClientX: pointerDownEvent.clientX,
        startClientY: pointerDownEvent.clientY,
        elementStartX: initialPosition.x,
        elementStartY: initialPosition.y,
      };

      pointerDownEvent.currentTarget.setPointerCapture(
        pointerDownEvent.pointerId
      );

      grab.start();

      pointerDownEvent.preventDefault();
      pointerDownEvent.stopPropagation();
    };
  }

  return { onElementPointerDown };
}
