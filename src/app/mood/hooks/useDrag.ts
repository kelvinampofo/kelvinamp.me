"use client";

import {
  useEffect,
  useRef,
  type Dispatch,
  type PointerEvent as ReactPointerEvent,
  type SetStateAction,
} from "react";

import {
  toItemTransform,
  type Camera,
  type Placements,
  type Point,
  type Tool,
} from "../canvas";

const DEFAULT_DRAG_THRESHOLD_PX = 10;

interface DragState {
  isDragging: boolean;
  pointerId: number;
  itemId: string;
  element: HTMLElement;
  pointerStart: Point;
  itemStart: Point;
  nextPosition: Point;
  stackOrder: number;
}

interface UseDragOptions {
  camera: Camera;
  placements: Placements;
  setPlacements: Dispatch<SetStateAction<Placements>>;
  tool: Tool;
  dragThresholdPx?: number;
}

function isPrimaryPointer(event: { button: number; ctrlKey: boolean }) {
  return event.button === 0 && !event.ctrlKey;
}

export default function useDrag({
  camera,
  placements,
  setPlacements,
  tool,
  dragThresholdPx = DEFAULT_DRAG_THRESHOLD_PX,
}: UseDragOptions) {
  const dragRef = useRef<DragState | null>(null);
  const frameRef = useRef(0);

  function cancel() {
    const drag = dragRef.current;

    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    dragRef.current = null;

    if (!drag) return;

    const placement = placements[drag.itemId];

    if (placement) {
      drag.element.style.transform = toItemTransform(placement);
      drag.element.style.zIndex = String(placement.stackOrder);
    }
  }

  // draw live, then commit on release
  function scheduleDraw() {
    if (frameRef.current) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;

      const drag = dragRef.current;

      if (!drag) return;

      drag.element.style.transform = toItemTransform(drag.nextPosition);
    });
  }

  function onPointerDown(
    itemId: string,
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    if (tool !== "select") return;

    if (!isPrimaryPointer(event)) {
      event.stopPropagation();
      return;
    }

    const placement = placements[itemId];

    if (!placement) return;

    const stackOrder =
      Math.max(0, ...Object.values(placements).map((item) => item.stackOrder)) +
      1;

    dragRef.current = {
      isDragging: false,
      pointerId: event.pointerId,
      itemId,
      element: event.currentTarget,
      pointerStart: { x: event.clientX, y: event.clientY },
      itemStart: { x: placement.x, y: placement.y },
      nextPosition: { x: placement.x, y: placement.y },
      stackOrder,
    };

    if (event.pointerType !== "touch") {
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    event.stopPropagation();
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.pointerStart.x;
    const deltaY = event.clientY - drag.pointerStart.y;

    if (!drag.isDragging && Math.hypot(deltaX, deltaY) < dragThresholdPx) {
      return;
    }

    if (!drag.isDragging) {
      drag.isDragging = true;
      drag.element.style.zIndex = String(drag.stackOrder);
    }

    drag.nextPosition = {
      x: drag.itemStart.x + deltaX / camera.scale,
      y: drag.itemStart.y + deltaY / camera.scale,
    };

    scheduleDraw();
  }

  function onPointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    dragRef.current = null;

    if (drag.isDragging) {
      setPlacements((current) => ({
        ...current,
        [drag.itemId]: {
          ...drag.nextPosition,
          stackOrder: drag.stackOrder,
        },
      }));
    }
  }

  useEffect(() => () => window.cancelAnimationFrame(frameRef.current), []);

  return { onPointerDown, onPointerMove, onPointerEnd, cancel };
}
