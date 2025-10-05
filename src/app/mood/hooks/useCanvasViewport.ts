"use client";

import { useEffect, useRef } from "react";

import { useCanvasContentBounds } from "./useCanvasContentBounds";
import { useCanvasGestures } from "./useCanvasGestures";
import { useCanvasPanState } from "./useCanvasPanState";
import { useCanvasScaleControls } from "./useCanvasScaleControls";

interface UseCanvasViewportOptions {
  minScale?: number;
  maxScale?: number;
  zoomStep?: number;
  wheelZoomDamping?: number;
  initialScale?: number;
}

/**
 * Coordinates pan/zoom behaviour for the mood canvas, exposing render helpers.
 *
 * @param options tuning knobs for scale limits and gesture behaviour.
 * @returns refs, pan state, and zoom controls ready for the canvas UI.
 */
export default function useCanvasViewport({
  minScale = 0.25,
  maxScale = 3,
  zoomStep = 0.06,
  wheelZoomDamping = 0.009,
  initialScale = 1,
}: UseCanvasViewportOptions = {}) {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const { computeCentredPan } = useCanvasContentBounds();
  const { canvasPan, setCanvasPan, canvasPanRef } = useCanvasPanState();

  const {
    canvasScale,
    canvasScaleRef,
    zoomPercent,
    scaleByAtPoint,
    setScaleAtPoint,
    zoomIn,
    zoomOut,
    zoomTo100,
    zoomToFit,
    centerToContentBounds,
  } = useCanvasScaleControls({
    minScale,
    maxScale,
    zoomStep,
    initialScale,
    canvasRef,
    canvasPanRef,
    setCanvasPan,
    computeCentredPan,
  });

  const { onPointerDown, onPointerMove } = useCanvasGestures({
    canvasRef,
    canvasPanRef,
    canvasScaleRef,
    setCanvasPan,
    scaleByAtPoint,
    setScaleAtPoint,
    wheelZoomDamping,
  });

  useEffect(() => {
    centerToContentBounds();
  }, [centerToContentBounds]);

  return {
    canvas: {
      ref: canvasRef,
      pan: canvasPan,
      onPointerDown,
      onPointerMove,
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
