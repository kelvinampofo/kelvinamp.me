import { useCallback, useMemo } from "react";

import { CANVAS_ELEMENTS } from "../canvasElements";

interface ContentBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const RIGHT_BIAS_PX = 132;

/**
 * Computes static mood-canvas bounds and produces a centring helper.
 *
 * @returns utilities for working with the fixed canvas content extents.
 */
export function useCanvasContentBounds() {
  const contentBounds = useMemo<ContentBounds>(() => {
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

  return { contentBounds, computeCentredPan };
}
