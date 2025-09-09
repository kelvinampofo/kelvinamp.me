"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { clamp } from "../../../utils/math";
import { CANVAS_ELEMENTS } from "../components/MoodCanvas/canvasElements";

type PointerState = { x: number; y: number; isElement: boolean };

interface PanDragState {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startPanX: number;
  startPanY: number;
}

interface PinchGestureState {
  primaryPointerId: number;
  secondaryPointerId: number;
  startDist: number;
  startScale: number;
}

interface UseCanvasViewportOptions {
  minScale?: number;
  maxScale?: number;
  zoomStep?: number;
  wheelZoomDamping?: number;
  initialScale?: number;
}

// slight right bias on mobile to account for UI affordances
const RIGHT_BIAS_PX = 132;

/**
 * canvas viewport controls for pan/zoom and gestures.
 *
 * @returns canvas viewport controls:
 * - canvas: ref, pan, and pointer handlers for attaching to the canvas element
 * - zoom: scale, percent, and common helpers (zoomIn/zoomOut/zoomTo100/zoomToFit/getScale)
 */
export default function useCanvasViewport({
  minScale = 0.25,
  maxScale = 3,
  zoomStep = 0.06,
  wheelZoomDamping = 0.009,
  initialScale = 1,
}: UseCanvasViewportOptions = {}) {
  // clamp initial scale within bounds
  const initial = clamp(initialScale, minScale, maxScale);
  const [canvasScale, setCanvasScale] = useState(initial);
  const [canvasPan, setCanvasPan] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const canvasScaleRef = useRef(canvasScale);
  const canvasPanRef = useRef(canvasPan);

  // active pointers keyed by pointerId for multi-touch tracking
  const activePointersRef = useRef<Map<number, PointerState>>(new Map());

  // ongoing panning drag (single pointer)
  const panningRef = useRef<PanDragState | null>(null);

  // ongoing pinch gesture (two pointers)
  const pinchRef = useRef<PinchGestureState | null>(null);

  useEffect(() => {
    canvasScaleRef.current = canvasScale;
  }, [canvasScale]);

  useEffect(() => {
    canvasPanRef.current = canvasPan;
  }, [canvasPan]);

  // compute static content bounds from the mood elements
  const contentBounds = useMemo(() => {
    const minX = Math.min(...CANVAS_ELEMENTS.map((element) => element.x));
    const minY = Math.min(...CANVAS_ELEMENTS.map((element) => element.y));
    const maxX = Math.max(
      ...CANVAS_ELEMENTS.map((element) => element.x + element.width)
    );
    const maxY = Math.max(
      ...CANVAS_ELEMENTS.map((element) => element.y + element.height)
    );
    return { minX, minY, maxX, maxY };
  }, []);

  const clampScale = useCallback(
    (value: number) => clamp(value, minScale, maxScale),
    [minScale, maxScale]
  );

  const computeCentredPan = useCallback(
    (scale: number) => {
      const { minX, minY, maxX, maxY } = contentBounds;
      const contentCenterX = (minX + maxX) / 2;
      const contentCenterY = (minY + maxY) / 2;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      return {
        x: viewportWidth / 2 + RIGHT_BIAS_PX - contentCenterX * scale,
        y: viewportHeight / 2 - contentCenterY * scale,
      };
    },
    [contentBounds]
  );

  // center canvas so that content appears centred in the viewport
  const centerToContentBounds = useCallback(() => {
    const nextPan = computeCentredPan(canvasScaleRef.current);
    setCanvasPan((prev) =>
      prev.x === nextPan.x && prev.y === nextPan.y ? prev : nextPan
    );
  }, [computeCentredPan]);

  // set a target scale while keeping the given screen point anchored
  const setScaleKeepingPoint = useCallback(
    (clientX: number, clientY: number, targetScale: number) => {
      const canvasElement = canvasRef.current;
      if (!canvasElement) {
        setCanvasScale(clampScale(targetScale));

        return;
      }

      const previousScale = canvasScaleRef.current;
      const nextScale = clampScale(targetScale);

      const canvasBounds = canvasElement.getBoundingClientRect();
      const worldX =
        (clientX - canvasBounds.left - canvasPanRef.current.x) / previousScale;
      const worldY =
        (clientY - canvasBounds.top - canvasPanRef.current.y) / previousScale;

      const newPanX = clientX - canvasBounds.left - worldX * nextScale;
      const newPanY = clientY - canvasBounds.top - worldY * nextScale;

      setCanvasPan({ x: newPanX, y: newPanY });
      setCanvasScale(nextScale);
    },
    [clampScale]
  );

  // multiplicative zoom anchored at a given screen point
  const scaleByAtPoint = useCallback(
    (clientX: number, clientY: number, factor: number) => {
      const previousScale = canvasScaleRef.current;
      const nextScale = parseFloat((previousScale * factor).toFixed(3));

      setScaleKeepingPoint(clientX, clientY, nextScale);
    },
    [setScaleKeepingPoint]
  );

  const setScaleAtPoint = useCallback(
    (clientX: number, clientY: number, targetScale: number) => {
      setScaleKeepingPoint(clientX, clientY, targetScale);
    },
    [setScaleKeepingPoint]
  );

  const zoomIn = useCallback(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // multiplicative step up
    const factor = 1 + zoomStep;
    scaleByAtPoint(centerX, centerY, factor);
  }, [zoomStep, scaleByAtPoint]);

  const zoomOut = useCallback(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // multiplicative step down (invert factor for symmetry)
    const factor = 1 / (1 + zoomStep);
    scaleByAtPoint(centerX, centerY, factor);
  }, [zoomStep, scaleByAtPoint]);

  const zoomTo100 = useCallback(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setScaleAtPoint(centerX, centerY, 1);
  }, [setScaleAtPoint]);

  const zoomToFit = useCallback(() => {
    const targetScaleClamped = clampScale(initial);
    const nextPan = computeCentredPan(targetScaleClamped);

    setCanvasScale(targetScaleClamped);
    setCanvasPan(nextPan);
  }, [clampScale, computeCentredPan, initial]);

  const zoomPercent = useMemo(
    () => Math.round(canvasScale * 100),
    [canvasScale]
  );

  const isElementTarget = (eventTarget: EventTarget | null) => {
    // avoid canvas panning when starting on a draggable element
    return !!(
      eventTarget instanceof Element &&
      eventTarget.closest('[data-element="true"]')
    );
  };

  const handleCanvasPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (isElementTarget(event.target)) return;

    panningRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPanX: canvasPanRef.current.x,
      startPanY: canvasPanRef.current.y,
    };

    activePointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
      isElement: false,
    });

    // continue receiving this pointer's events even if it leaves the element
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handleCanvasPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const pointerState = activePointersRef.current.get(event.pointerId);

    if (pointerState) {
      pointerState.x = event.clientX;
      pointerState.y = event.clientY;
    }

    if (!pinchRef.current && activePointersRef.current.size === 2) {
      const pointerIds = Array.from(activePointersRef.current.keys());
      const primaryPointer = activePointersRef.current.get(pointerIds[0]);
      const secondaryPointer = activePointersRef.current.get(pointerIds[1]);

      if (
        primaryPointer &&
        secondaryPointer &&
        !primaryPointer.isElement &&
        !secondaryPointer.isElement
      ) {
        // initialise pinch when two non-element pointers are active
        const deltaX = secondaryPointer.x - primaryPointer.x;
        const deltaY = secondaryPointer.y - primaryPointer.y;
        const distance = Math.hypot(deltaX, deltaY) || 1;

        pinchRef.current = {
          primaryPointerId: pointerIds[0],
          secondaryPointerId: pointerIds[1],
          startDist: distance,
          startScale: canvasScaleRef.current,
        };

        // disable panning during pinch
        panningRef.current = null;
      }
    }
  };

  useEffect(() => {
    return centerToContentBounds();
  }, [centerToContentBounds]);

  useEffect(() => {
    // zoom with Meta/Ctrl (trackpad pinch) else pan; prevent page scroll
    const handleWheel = (event: WheelEvent) => {
      const canvasElement = canvasRef.current;

      if (!canvasElement) return;

      const bounds = canvasElement.getBoundingClientRect();

      const isInsideCanvas =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!isInsideCanvas) return;

      const isZoomGesture = event.metaKey || event.ctrlKey;
      if (isZoomGesture) {
        event.preventDefault();

        // smooth, Figma-like multiplicative zoom with damping
        // negative deltaY => zoom in; positive => zoom out
        const delta = event.deltaY;
        const factor = Math.exp(-delta * wheelZoomDamping);

        scaleByAtPoint(event.clientX, event.clientY, factor);
      } else {
        event.preventDefault();

        // two-finger scroll without modifiers pans the canvas
        setCanvasPan((previousPan) => ({
          x: previousPan.x - event.deltaX,
          y: previousPan.y - event.deltaY,
        }));
      }
    };

    // drives the panning and pinch scaling
    const handlePointerMove = (event: PointerEvent) => {
      const activePanDrag = panningRef.current;

      if (activePanDrag) {
        const deltaX = event.clientX - activePanDrag.startClientX;
        const deltaY = event.clientY - activePanDrag.startClientY;

        setCanvasPan({
          x: activePanDrag.startPanX + deltaX,
          y: activePanDrag.startPanY + deltaY,
        });
      }

      if (pinchRef.current) {
        const pinchGesture = pinchRef.current;

        const primaryPointer = activePointersRef.current.get(
          pinchGesture.primaryPointerId
        );

        const secondaryPointer = activePointersRef.current.get(
          pinchGesture.secondaryPointerId
        );

        if (primaryPointer && secondaryPointer) {
          const deltaX = secondaryPointer.x - primaryPointer.x;
          const deltaY = secondaryPointer.y - primaryPointer.y;
          const distance = Math.hypot(deltaX, deltaY) || 1;

          // use fingers' midpoint as the zoom anchor
          const midpointX = (primaryPointer.x + secondaryPointer.x) / 2;
          const midpointY = (primaryPointer.y + secondaryPointer.y) / 2;

          // scale changes in proportion to distance delta
          const rawScale =
            (pinchGesture.startScale * distance) / pinchGesture.startDist;

          setScaleAtPoint(midpointX, midpointY, rawScale);
        }
      }
    };

    // clear drag/pinch state when a pointer ends
    const handlePointerUp = (event: PointerEvent) => {
      const isPanningPointerReleased =
        panningRef.current && event.pointerId === panningRef.current.pointerId;

      if (isPanningPointerReleased) {
        panningRef.current = null;
      }

      activePointersRef.current.delete(event.pointerId);

      const isPinchPointerReleased =
        pinchRef.current &&
        (event.pointerId === pinchRef.current.primaryPointerId ||
          event.pointerId === pinchRef.current.secondaryPointerId);

      if (isPinchPointerReleased) {
        pinchRef.current = null;
      }
    };

    const controller = new AbortController();
    const { signal } = controller;

    window.addEventListener("wheel", handleWheel, { passive: false, signal });
    window.addEventListener("pointermove", handlePointerMove, { signal });
    window.addEventListener("pointerup", handlePointerUp, { signal });

    return () => {
      controller.abort();
    };
  }, [zoomStep, wheelZoomDamping, scaleByAtPoint, setScaleAtPoint]);

  return {
    canvas: {
      ref: canvasRef,
      pan: canvasPan,
      onPointerDown: handleCanvasPointerDown,
      onPointerMove: handleCanvasPointerMove,
    },
    zoom: {
      scale: canvasScale,
      percent: zoomPercent,
      zoomIn,
      zoomOut,
      zoomTo100,
      zoomToFit,
      getScale: () => canvasScaleRef.current,
    },
  };
}
