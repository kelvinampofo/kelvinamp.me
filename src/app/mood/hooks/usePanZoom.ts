"use client";

import {
  useEffect,
  useEffectEvent,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

import {
  panCamera,
  zoomBy,
  zoomFromWheel,
  ZOOM_STEP,
  type Point,
  type Tool,
} from "../canvas";

import type { CameraHandle } from "./useCamera";

const PIXELS_PER_WHEEL_LINE = 16;

interface TouchPointer extends Point {
  canPan: boolean;
}

interface MousePan extends Point {
  pointerId: number;
}

interface UsePanZoomOptions {
  viewportRef: RefObject<HTMLDivElement | null>;
  camera: CameraHandle;
  tool: Tool;
  cancelDrag: () => void;
}

export default function usePanZoom({
  viewportRef,
  camera,
  tool,
  cancelDrag,
}: UsePanZoomOptions) {
  const mousePanRef = useRef<MousePan | null>(null);
  const touchesRef = useRef(new Map<number, TouchPointer>());

  function pointInViewport({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) {
    const bounds = viewportRef.current?.getBoundingClientRect();

    return {
      x: clientX - (bounds?.left ?? 0),
      y: clientY - (bounds?.top ?? 0),
    };
  }

  const onWheel = useEffectEvent((event: WheelEvent) => {
    event.preventDefault();

    const multiplier =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? PIXELS_PER_WHEEL_LINE
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? viewportRef.current?.clientHeight || window.innerHeight
          : 1;

    const deltaX = event.deltaX * multiplier;
    const deltaY = event.deltaY * multiplier;

    if (event.metaKey || event.ctrlKey) {
      camera.move((current) =>
        zoomFromWheel(current, pointInViewport(event), deltaY)
      );
    } else {
      camera.move((current) => panCamera(current, deltaX, deltaY));
    }
  });

  useEffect(() => {
    if (tool === "pan") return;

    mousePanRef.current = null;
    document.body.classList.remove("gesture-grabbing");
  }, [tool]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const touches = touchesRef.current;

    viewport?.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      viewport?.removeEventListener("wheel", onWheel);
      document.body.classList.remove("gesture-grabbing");
      mousePanRef.current = null;
      touches.clear();
    };
  }, [viewportRef]);

  function zoom(factor: number) {
    camera.move((current, { width, height }) =>
      zoomBy(current, { x: width / 2, y: height / 2 }, factor)
    );
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === "touch" ||
      tool !== "pan" ||
      event.button !== 0 ||
      event.ctrlKey
    ) {
      return;
    }

    mousePanRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };

    document.body.classList.add("gesture-grabbing");
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function onPointerDownCapture(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch") return;

    const touches = touchesRef.current;

    event.currentTarget.setPointerCapture(event.pointerId);

    const startsOnItem =
      event.target instanceof Element &&
      Boolean(event.target.closest("[data-board-item]"));
    touches.set(event.pointerId, {
      ...pointInViewport(event),
      canPan: tool === "pan" || !startsOnItem,
    });

    // a second finger switches from moving artwork to navigating the board
    if (touches.size > 1) {
      cancelDrag();
      touches.forEach((touch, pointerId) => {
        touches.set(pointerId, { ...touch, canPan: true });
      });
      event.stopPropagation();
    }

    // the global grabbing style disables hit testing, blocking a second touch
    event.preventDefault();
  }

  function moveTouch(event: ReactPointerEvent<HTMLDivElement>) {
    const touches = touchesRef.current;
    const touch = touches.get(event.pointerId);

    if (!touch) return;

    const previousPinch = getPinch(touches);
    const nextPoint = pointInViewport(event);
    touches.set(event.pointerId, { ...nextPoint, canPan: touch.canPan });

    const nextPinch = getPinch(touches);

    if (previousPinch && nextPinch) {
      const factor =
        previousPinch.distance > 0
          ? nextPinch.distance / previousPinch.distance
          : 1;

      camera.move((current) => {
        const panned = panCamera(
          current,
          previousPinch.midpoint.x - nextPinch.midpoint.x,
          previousPinch.midpoint.y - nextPinch.midpoint.y
        );

        return zoomBy(panned, nextPinch.midpoint, factor);
      });
    } else if (touch.canPan) {
      camera.move((current) =>
        panCamera(current, touch.x - nextPoint.x, touch.y - nextPoint.y)
      );
    }
  }

  function moveMouse(event: ReactPointerEvent<HTMLDivElement>) {
    const previous = mousePanRef.current;

    if (!previous || previous.pointerId !== event.pointerId) return;

    camera.move((current) =>
      panCamera(current, previous.x - event.clientX, previous.y - event.clientY)
    );

    mousePanRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") {
      moveTouch(event);
    } else {
      moveMouse(event);
    }
  }

  function onPointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") {
      const touches = touchesRef.current;
      touches.delete(event.pointerId);

      if (touches.size > 0) return;
    } else if (mousePanRef.current?.pointerId === event.pointerId) {
      mousePanRef.current = null;
    } else {
      return;
    }

    document.body.classList.remove("gesture-grabbing");
  }

  return {
    onPointerDown,
    onPointerDownCapture,
    onPointerMove,
    onPointerEnd,
    zoomIn: () => zoom(ZOOM_STEP),
    zoomOut: () => zoom(1 / ZOOM_STEP),
  };
}

function getPinch(points: Map<number, Point>) {
  const [first, second] = points.values();

  if (!first || !second) return;

  return {
    midpoint: {
      x: (first.x + second.x) / 2,
      y: (first.y + second.y) / 2,
    },
    distance: Math.hypot(second.x - first.x, second.y - first.y),
  };
}
