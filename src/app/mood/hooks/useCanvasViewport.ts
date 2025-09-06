"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { clamp } from "../../../utils/math";

type PointerRecord = { x: number; y: number; isElement: boolean };

interface CanvasPanDrag {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startPanX: number;
  startPanY: number;
}

interface CanvasPinchGesture {
  id1: number;
  id2: number;
  startDist: number;
  startScale: number;
}

interface UseCanvasViewportOptions {
  minScale?: number;
  maxScale?: number;
  zoomStep?: number;
}

/**
 * canvas viewport controls for pan/zoom and gestures.
 *
 * @returns refs, current transform state, common zoom helpers,
 * and handlers to attach to the canvas element.
 */
export default function useCanvasViewport({
  minScale = 0.25,
  maxScale = 3,
  zoomStep = 0.1,
}: UseCanvasViewportOptions = {}) {
  const [canvasScale, setCanvasScale] = useState(1);
  const [canvasPan, setCanvasPan] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const canvasScaleRef = useRef(canvasScale);
  const canvasPanRef = useRef(canvasPan);

  // active pointers keyed by pointerId for multi-touch tracking
  const activePointersRef = useRef<Map<number, PointerRecord>>(new Map());

  // ongoing panning drag (single pointer)
  const panningRef = useRef<CanvasPanDrag | null>(null);

  // ongoing pinch gesture (two pointers)
  const pinchRef = useRef<CanvasPinchGesture | null>(null);

  useEffect(() => {
    canvasScaleRef.current = canvasScale;
  }, [canvasScale]);

  useEffect(() => {
    canvasPanRef.current = canvasPan;
  }, [canvasPan]);

  const applyZoomAtPoint = useCallback(
    (clientX: number, clientY: number, delta: number) => {
      const canvasElement = canvasRef.current;
      if (!canvasElement) {
        setCanvasScale((previousScale) =>
          clamp(
            parseFloat((previousScale + delta).toFixed(3)),
            minScale,
            maxScale
          )
        );

        return;
      }

      const previousScale = canvasScaleRef.current;
      const nextScale = clamp(
        parseFloat((previousScale + delta).toFixed(3)),
        minScale,
        maxScale
      );

      // compute world coordinates of the screen point so it stays fixed while zooming
      const canvasBounds = canvasElement.getBoundingClientRect();
      const worldX =
        (clientX - canvasBounds.left - canvasPanRef.current.x) / previousScale;
      const worldY =
        (clientY - canvasBounds.top - canvasPanRef.current.y) / previousScale;

      // adjust pan so the same world point maps back to the same screen point
      const newPanX = clientX - canvasBounds.left - worldX * nextScale;
      const newPanY = clientY - canvasBounds.top - worldY * nextScale;

      setCanvasPan({ x: newPanX, y: newPanY });
      setCanvasScale(nextScale);
    },

    [maxScale, minScale]
  );

  const setScaleAtPoint = useCallback(
    (clientX: number, clientY: number, targetScale: number) => {
      const canvasElement = canvasRef.current;
      if (!canvasElement) {
        setCanvasScale(clamp(targetScale, minScale, maxScale));

        return;
      }

      const previousScale = canvasScaleRef.current;
      const nextScale = clamp(targetScale, minScale, maxScale);

      // keep the given screen point anchored while changing scale
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

    [maxScale, minScale]
  );

  const zoomIn = useCallback(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    applyZoomAtPoint(centerX, centerY, zoomStep);
  }, [zoomStep, applyZoomAtPoint]);

  const zoomOut = useCallback(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    applyZoomAtPoint(centerX, centerY, -zoomStep);
  }, [zoomStep, applyZoomAtPoint]);

  const resetZoom = useCallback(() => setCanvasScale(1), []);

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
    const pointerRecord = activePointersRef.current.get(event.pointerId);
    if (pointerRecord) {
      pointerRecord.x = event.clientX;
      pointerRecord.y = event.clientY;
    }

    if (!pinchRef.current && activePointersRef.current.size === 2) {
      const pointerIds = Array.from(activePointersRef.current.keys());
      const pointer1 = activePointersRef.current.get(pointerIds[0]);
      const pointer2 = activePointersRef.current.get(pointerIds[1]);

      if (pointer1 && pointer2 && !pointer1.isElement && !pointer2.isElement) {
        // initialize pinch when two non-element pointers are active
        const deltaX = pointer2.x - pointer1.x;
        const deltaY = pointer2.y - pointer1.y;
        const distance = Math.hypot(deltaX, deltaY) || 1;
        pinchRef.current = {
          id1: pointerIds[0],
          id2: pointerIds[1],
          startDist: distance,
          startScale: canvasScaleRef.current,
        };

        // disable panning during pinch
        panningRef.current = null;
      }
    }
  };

  useEffect(() => {
    // zoom with Meta/Ctrl (trackpad pinch) else pan; prevent page scroll
    const handleWheel = (event: WheelEvent) => {
      const isZoomGesture = event.metaKey || event.ctrlKey;
      if (isZoomGesture) {
        event.preventDefault();

        const direction = Math.sign(event.deltaY);
        applyZoomAtPoint(
          event.clientX,
          event.clientY,
          direction > 0 ? -zoomStep : zoomStep
        );
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
        const activePinch = pinchRef.current;
        const pointer1 = activePointersRef.current.get(activePinch.id1);
        const pointer2 = activePointersRef.current.get(activePinch.id2);

        if (pointer1 && pointer2) {
          const deltaX = pointer2.x - pointer1.x;
          const deltaY = pointer2.y - pointer1.y;
          const distance = Math.hypot(deltaX, deltaY) || 1;

          // use fingers' midpoint as the zoom anchor
          const midpointX = (pointer1.x + pointer2.x) / 2;
          const midpointY = (pointer1.y + pointer2.y) / 2;

          // scale changes in proportion to distance delta
          const rawScale =
            (activePinch.startScale * distance) / activePinch.startDist;

          setScaleAtPoint(midpointX, midpointY, rawScale);
        }
      }
    };

    // clear drag/pinch state when a pointer ends
    const handlePointerUp = (event: PointerEvent) => {
      if (
        panningRef.current &&
        event.pointerId === panningRef.current.pointerId
      ) {
        panningRef.current = null;
      }

      activePointersRef.current.delete(event.pointerId);

      if (
        pinchRef.current &&
        (event.pointerId === pinchRef.current.id1 ||
          event.pointerId === pinchRef.current.id2)
      ) {
        pinchRef.current = null;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [zoomStep, applyZoomAtPoint, setScaleAtPoint]);

  return {
    canvasRef,
    canvasScale,
    canvasPan,
    zoomPercent,
    zoomIn,
    zoomOut,
    resetZoom,
    handleCanvasPointerDown,
    handleCanvasPointerMove,
    getScale: () => canvasScaleRef.current,
  };
}
