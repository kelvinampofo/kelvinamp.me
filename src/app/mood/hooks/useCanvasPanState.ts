import { useEffect, useRef, useState } from "react";

import type { Point } from "../types";

/**
 * Tracks the canvas translation offset with synchronous ref access for gestures.
 *
 * @returns pan state, setter, and ref synchronized to the latest values.
 */
export function useCanvasPanState() {
  const [canvasPan, setCanvasPan] = useState<Point>({ x: 0, y: 0 });
  const canvasPanRef = useRef(canvasPan);

  useEffect(() => {
    canvasPanRef.current = canvasPan;
  }, [canvasPan]);

  return {
    canvasPan,
    setCanvasPan,
    canvasPanRef,
  };
}
