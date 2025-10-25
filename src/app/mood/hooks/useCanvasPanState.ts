import {
  useCallback,
  useRef,
  useState,
  type SetStateAction,
} from "react";

import type { Point } from "../types";

/**
 * Tracks the canvas translation offset with synchronous ref access for gestures.
 *
 * @returns pan state, setter, and ref synchronized to the latest values.
 */
export function useCanvasPanState() {
  const [canvasPan, setCanvasPanState] = useState<Point>({ x: 0, y: 0 });
  const canvasPanRef = useRef(canvasPan);

  const setCanvasPan = useCallback(
    (value: SetStateAction<Point>) => {
      setCanvasPanState((previousPan) => {
        const nextPan =
          typeof value === "function" ? value(previousPan) : value;

        canvasPanRef.current = nextPan;
        return nextPan;
      });
    },
    [setCanvasPanState]
  );

  return {
    canvasPan,
    setCanvasPan,
    canvasPanRef,
  };
}
