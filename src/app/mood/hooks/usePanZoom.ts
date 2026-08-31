"use client";

import {
  useEffect,
  useEffectEvent,
  useRef,
  type Dispatch,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type SetStateAction,
} from "react";

import {
  panCamera,
  toCameraTransform,
  zoomBy,
  zoomFromWheel,
  ZOOM_STEP,
  type Camera,
  type Point,
  type Tool,
} from "../canvas";

const PIXELS_PER_WHEEL_LINE = 16;
const WHEEL_COMMIT_DELAY_MS = 120;

interface Pointer extends Point {
  canPan: boolean;
}

interface MousePan extends Point {
  pointerId: number;
}

interface UsePanZoomOptions {
  viewportRef: RefObject<HTMLDivElement | null>;
  surfaceRef: RefObject<HTMLDivElement | null>;
  camera: Camera;
  tool: Tool;
  setCamera: Dispatch<SetStateAction<Camera>>;
  cancelDrag: () => void;
}

function startsOnItem(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("[data-board-item]"));
}

function getPinch(points: Map<number, Pointer>) {
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

export default function usePanZoom({
  viewportRef,
  surfaceRef,
  camera,
  tool,
  setCamera,
  cancelDrag,
}: UsePanZoomOptions) {
  const cameraRef = useRef(camera);
  const mousePanRef = useRef<MousePan | null>(null);
  const touchesRef = useRef(new Map<number, Pointer>());
  const wheelTimerRef = useRef(0);
  const dirtyRef = useRef(false);

  function draw(nextCamera: Camera) {
    cameraRef.current = nextCamera;
    dirtyRef.current = true;

    if (surfaceRef.current) {
      surfaceRef.current.style.transform = toCameraTransform(nextCamera);
    }
  }

  function updateCamera(update: (current: Camera) => Camera) {
    draw(update(cameraRef.current));
  }

  function commitCamera() {
    if (!dirtyRef.current) return;

    dirtyRef.current = false;
    setCamera(cameraRef.current);
  }

  function startGesture() {
    if (wheelTimerRef.current) {
      window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = 0;
    } else {
      cameraRef.current = camera;
    }
  }

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

  function viewportCentre() {
    const viewport = viewportRef.current;

    return {
      x: (viewport?.clientWidth ?? window.innerWidth) / 2,
      y: (viewport?.clientHeight ?? window.innerHeight) / 2,
    };
  }

  function zoom(factor: number) {
    updateCamera((current) => zoomBy(current, viewportCentre(), factor));
    commitCamera();
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

    startGesture();
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

    if (touches.size === 0) startGesture();

    event.currentTarget.setPointerCapture(event.pointerId);
    touches.set(event.pointerId, {
      ...pointInViewport(event),
      canPan: !startsOnItem(event.target),
    });

    if (touches.size > 1) {
      cancelDrag();
      touches.forEach((touch) => {
        touch.canPan = true;
      });
      event.stopPropagation();
    }

    if ([...touches.values()].some(({ canPan }) => canPan)) {
      document.body.classList.add("gesture-grabbing");
      event.preventDefault();
    }
  }

  function moveTouch(event: ReactPointerEvent<HTMLDivElement>) {
    const touches = touchesRef.current;
    const touch = touches.get(event.pointerId);

    if (!touch) return;

    const previousPinch = getPinch(touches);
    const previousPoint = { x: touch.x, y: touch.y };
    Object.assign(touch, pointInViewport(event));

    const nextPinch = getPinch(touches);

    if (previousPinch && nextPinch) {
      const panned = panCamera(
        cameraRef.current,
        previousPinch.midpoint.x - nextPinch.midpoint.x,
        previousPinch.midpoint.y - nextPinch.midpoint.y
      );
      const factor =
        previousPinch.distance > 0
          ? nextPinch.distance / previousPinch.distance
          : 1;

      draw(zoomBy(panned, nextPinch.midpoint, factor));
    } else if (touch.canPan) {
      updateCamera((current) =>
        panCamera(
          current,
          previousPoint.x - touch.x,
          previousPoint.y - touch.y
        )
      );
    }
  }

  function moveMouse(event: ReactPointerEvent<HTMLDivElement>) {
    const previous = mousePanRef.current;

    if (!previous || previous.pointerId !== event.pointerId) return;

    updateCamera((current) =>
      panCamera(
        current,
        previous.x - event.clientX,
        previous.y - event.clientY
      )
    );

    previous.x = event.clientX;
    previous.y = event.clientY;
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
      touches.forEach((touch) => {
        touch.canPan = true;
      });

      if (touches.size > 0) return;
    } else if (mousePanRef.current?.pointerId === event.pointerId) {
      mousePanRef.current = null;
    } else {
      return;
    }

    document.body.classList.remove("gesture-grabbing");
    commitCamera();
  }

  useEffect(() => {
    if (!mousePanRef.current && touchesRef.current.size === 0) {
      cameraRef.current = camera;
      dirtyRef.current = false;
    }
  }, [camera]);

  useEffect(() => {
    if (tool === "pan") return;

    mousePanRef.current = null;
    document.body.classList.remove("gesture-grabbing");
  }, [tool]);

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
      updateCamera((current) =>
        zoomFromWheel(current, pointInViewport(event), deltaY)
      );
    } else {
      updateCamera((current) => panCamera(current, deltaX, deltaY));
    }

    window.clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = window.setTimeout(() => {
      wheelTimerRef.current = 0;
      commitCamera();
    }, WHEEL_COMMIT_DELAY_MS);
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const touches = touchesRef.current;

    viewport?.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      viewport?.removeEventListener("wheel", onWheel);
      document.body.classList.remove("gesture-grabbing");
      mousePanRef.current = null;
      touches.clear();
      window.clearTimeout(wheelTimerRef.current);
    };
  }, [viewportRef]);

  return {
    onPointerDown,
    onPointerDownCapture,
    onPointerMove,
    onPointerEnd,
    zoomIn: () => zoom(ZOOM_STEP),
    zoomOut: () => zoom(1 / ZOOM_STEP),
  };
}
