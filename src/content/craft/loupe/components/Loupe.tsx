"use client";

import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import type { PointerEvent, RefObject } from "react";

import { clamp } from "../../../../utils/math";

import styles from "./Loupe.module.css";

const CANVAS_HEIGHT = 220;
const LENS_RADIUS = 45;
const MAGNIFICATION = 2;
const LENS_EDGE_GAP = 8;
const LENS_INSET = LENS_RADIUS + LENS_EDGE_GAP;
const PROSE_VERTICAL_PADDING = 16;
const PROSE_HEIGHT = CANVAS_HEIGHT - PROSE_VERTICAL_PADDING * 2;

interface Point {
  x: number;
  y: number;
}

interface Drag {
  pointerId: number;
  offset: Point;
  origin: Point;
}

interface ProseProps {
  width: number | "100%";
}

// The magnified copy is laid out once at 2x; dragging only updates transforms.
export default function Loupe() {
  const id = useId();

  const svgRef = useRef<SVGSVGElement>(null);
  const lensRef = useRef<SVGGElement>(null);
  const zoomRef = useRef<SVGGElement>(null);

  const { width, isDragging, handlers } = useLens(svgRef, ({ x, y }) => {
    lensRef.current?.setAttribute("transform", `translate(${x} ${y})`);

    // the lens origin is its centre, so a canvas point p lands at (p - centre) * magnification
    zoomRef.current?.setAttribute(
      "transform",
      `translate(${-x * MAGNIFICATION} ${-y * MAGNIFICATION})`
    );
  });

  return (
    <svg
      ref={svgRef}
      className={styles.canvas}
      width="100%"
      height={CANVAS_HEIGHT}
      role="group"
      aria-label="Magnifying loupe"
      aria-describedby={`${id}-instructions`}
    >
      <desc id={`${id}-instructions`}>
        Drag the lens over the paragraph to magnify the text beneath it using a
        mouse, touch or pen
      </desc>
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle r={LENS_RADIUS} />
        </clipPath>
      </defs>
      <Prose width="100%" />
      <g
        ref={lensRef}
        visibility={width ? "visible" : "hidden"}
        className={styles.lens}
        data-dragging={isDragging}
        {...handlers}
      >
        {/* an offset circle stands in for the drop-shadow filter, which would be re-run on every frame */}
        <circle
          className={styles.lensShadow}
          r={LENS_RADIUS}
          cy={1}
          pointerEvents="none"
        />
        <circle
          r={LENS_RADIUS}
          fill="var(--color-grey-2)"
          pointerEvents="none"
        />
        <g clipPath={`url(#${id}-clip)`} pointerEvents="none">
          <g ref={zoomRef}>
            <g transform={`scale(${MAGNIFICATION})`}>
              <Prose width={width} />
            </g>
          </g>
        </g>
        <circle className={styles.lensOutline} r={LENS_RADIUS} />
      </g>
    </svg>
  );
}

function Prose({ width }: ProseProps) {
  return (
    <foreignObject
      x="0"
      y={PROSE_VERTICAL_PADDING}
      width={width}
      height={PROSE_HEIGHT}
      aria-hidden="true"
    >
      <div className={styles.prose}>
        <p>
          A curve that catches the light. A texture you can almost feel. The
          smallest details give familiar things their character. Take a closer
          look. There’s more here than you first noticed.
        </p>
      </div>
    </foreignObject>
  );
}

// Keep the lens position in a ref so pointer moves update the DOM without re-rendering.
function useLens(
  containerRef: RefObject<SVGSVGElement | null>,
  positionLens: (center: Point) => void
) {
  const centerRef = useRef<Point>({ x: 0, y: CANVAS_HEIGHT / 2 });
  const dragRef = useRef<Drag | null>(null);
  const measuredRef = useRef(false);

  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleResize = useEffectEvent((nextWidth: number) => {
    setWidth(nextWidth);

    const firstMeasurement = !measuredRef.current;
    measuredRef.current = true;

    // centre the lens once we know the canvas width, then preserve the user's position unless a resize pushes it past an edge
    centerRef.current = constrainPosition(
      firstMeasurement
        ? { x: nextWidth / 2, y: CANVAS_HEIGHT / 2 }
        : centerRef.current,
      nextWidth
    );

    positionLens(centerRef.current);
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    measuredRef.current = false;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextWidth = entry.contentRect.width;
      if (!nextWidth) return;

      handleResize(nextWidth);
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [containerRef]);

  function onPointerDown(event: PointerEvent<SVGGElement>) {
    if (!event.isPrimary || event.button !== 0) return;

    const container = containerRef.current;
    if (!container) return;

    // the canvas is unscaled, so its bounding box maps viewport coordinates to canvas coordinates
    // it's read once per drag so moves don't force a layout
    const rect = container.getBoundingClientRect();
    const origin = { x: rect.left, y: rect.top };

    // keep receiving drag events even if the pointer moves outside the lens
    event.currentTarget.setPointerCapture(event.pointerId);

    dragRef.current = {
      pointerId: event.pointerId,
      origin,
      // remember where the lens was grabbed relative to its centre so grabbing near an edge doesn't make the centre jump to the pointer
      offset: {
        x: event.clientX - origin.x - centerRef.current.x,
        y: event.clientY - origin.y - centerRef.current.y,
      },
    };

    setIsDragging(true);
  }

  function onPointerMove(event: PointerEvent<SVGGElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    // subtract the grab offset to keep the same spot on the lens under the pointer
    centerRef.current = constrainPosition(
      {
        x: event.clientX - drag.origin.x - drag.offset.x,
        y: event.clientY - drag.origin.y - drag.offset.y,
      },
      width
    );

    positionLens(centerRef.current);
  }

  function onPointerEnd(event: PointerEvent<SVGGElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return {
    width,
    isDragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      onLostPointerCapture: onPointerEnd,
    },
  };
}

function constrainPosition({ x, y }: Point, width: number): Point {
  // clamp the centre far enough from each edge to fit the radius plus a gap
  // on narrow canvases, Math.max keeps the upper limit at least as large as the lower limit, though the lens may still be too large to fit
  return {
    x: clamp(x, LENS_INSET, Math.max(LENS_INSET, width - LENS_INSET)),
    y: clamp(y, LENS_INSET, CANVAS_HEIGHT - LENS_INSET),
  };
}
