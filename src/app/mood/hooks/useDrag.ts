"use client";

import {
  useEffect,
  useRef,
  type Dispatch,
  type PointerEvent as ReactPointerEvent,
  type SetStateAction,
} from "react";

import type { Asset } from "../assets";
import {
  getPlacement,
  toItemTransform,
  type Placements,
  type Point,
  type Tool,
} from "../canvas";

import type { CameraHandle } from "./useCamera";

const DRAG_THRESHOLD_PX = 10;

interface DragState {
  isDragging: boolean;
  pointerId: number;
  itemId: string;
  element: HTMLElement;
  pointerStart: Point;
  itemStart: Point;
  previousStackOrder: number;
  nextPosition: Point;
  stackOrder: number;
}

interface UseDragOptions {
  camera: CameraHandle;
  placements: Placements;
  setPlacements: Dispatch<SetStateAction<Placements>>;
  tool: Tool;
}

export default function useDrag({
  camera,
  placements,
  setPlacements,
  tool,
}: UseDragOptions) {
  const dragRef = useRef<DragState | null>(null);
  const frameRef = useRef(0);

  useEffect(() => () => window.cancelAnimationFrame(frameRef.current), []);

  function cancel() {
    const drag = dragRef.current;

    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    dragRef.current = null;

    if (!drag) return;

    drag.element.style.transform = toItemTransform(drag.itemStart);
    drag.element.style.zIndex = String(drag.previousStackOrder);
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
    asset: Asset,
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    if (tool !== "select") return;

    if (!isPrimaryPointer(event)) {
      event.stopPropagation();
      return;
    }

    const placement = getPlacement(asset, placements);

    const stackOrder =
      Math.max(
        0,
        ...Object.values(placements).map((item) => item?.stackOrder ?? 0)
      ) + 1;

    dragRef.current = {
      isDragging: false,
      pointerId: event.pointerId,
      itemId: asset.id,
      element: event.currentTarget,
      pointerStart: { x: event.clientX, y: event.clientY },
      itemStart: { x: placement.x, y: placement.y },
      previousStackOrder: placement.stackOrder,
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

    if (!drag.isDragging && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD_PX) {
      return;
    }

    if (!drag.isDragging) {
      drag.isDragging = true;
      drag.element.style.zIndex = String(drag.stackOrder);
    }

    const { scale } = camera.get();

    drag.nextPosition = {
      x: drag.itemStart.x + deltaX / scale,
      y: drag.itemStart.y + deltaY / scale,
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

  return { onPointerDown, onPointerMove, onPointerEnd, cancel };
}

function isPrimaryPointer(event: { button: number; ctrlKey: boolean }) {
  return event.button === 0 && !event.ctrlKey;
}
