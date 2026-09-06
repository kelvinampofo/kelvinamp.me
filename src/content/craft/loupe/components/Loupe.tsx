"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PointerEvent } from "react";

import { clamp } from "../../../../utils/math";

import styles from "./Loupe.module.css";

const CANVAS_HEIGHT = 220;
const LENS_RADIUS = 45;
const LENS_DIAMETER = LENS_RADIUS * 2;
const MAGNIFICATION = 2;

// at 2x zoom, a square half the original width and height fills the lens, so the content looks twice as big
const SOURCE_VIEW_SIZE = LENS_DIAMETER / MAGNIFICATION;
const LENS_EDGE_GAP = 8;
const LENS_INSET = LENS_RADIUS + LENS_EDGE_GAP;
const PROSE_VERTICAL_PADDING = 16;

interface Point {
  x: number;
  y: number;
}

interface Drag {
  pointerId: number;
  offset: Point;
}

interface ProseProps {
  width: number | "100%";
}

export default function Loupe() {
  const id = useId();

  const svgRef = useRef<SVGSVGElement>(null);
  const measuredRef = useRef(false);

  const [width, setWidth] = useState(0);
  const [lensCenter, setLensCenter] = useState<Point>({
    x: 0,
    y: CANVAS_HEIGHT / 2,
  });

  const [drag, setDrag] = useState<Drag | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    measuredRef.current = false;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextWidth = entry.contentRect.width;
      if (!nextWidth) return;

      setWidth(nextWidth);

      const firstMeasurement = !measuredRef.current;
      measuredRef.current = true;

      // centre the lens once we know the canvas width, then preserve the user's position unless a resize pushes it past an edge
      setLensCenter((current) =>
        constrainPosition(
          firstMeasurement
            ? { x: nextWidth / 2, y: CANVAS_HEIGHT / 2 }
            : current,
          nextWidth
        )
      );
    });

    resizeObserver.observe(svg);
    return () => resizeObserver.disconnect();
  }, []);

  function toSvgPoint(event: PointerEvent<SVGGElement>) {
    // the pointer uses browser viewport coordinates, but the lens uses SVG coordinates
    // this matrix maps SVG coordinates to the viewport, accounting for the SVG's position and scaling
    const screenTransform = svgRef.current?.getScreenCTM();
    if (!screenTransform) return null;

    // inverse() reverses the mapping from viewport to SVG and matrixTransform() applies it to the pointer
    // if the SVG starts 100px from the left with no scaling, a pointer at viewport x=150 becomes SVG x=50
    const clientPoint = new DOMPoint(event.clientX, event.clientY);
    const svgPoint = clientPoint.matrixTransform(screenTransform.inverse());

    return svgPoint;
  }

  function handlePointerDown(event: PointerEvent<SVGGElement>) {
    if (!event.isPrimary || event.button !== 0) return;

    const point = toSvgPoint(event);
    if (!point) return;

    // keep receiving drag events even if the pointer moves outside the lens
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({
      pointerId: event.pointerId,
      // remember where the lens was grabbed relative to its centre so grabbing near an edge doesn't make the centre jump to the pointer
      offset: {
        x: point.x - lensCenter.x,
        y: point.y - lensCenter.y,
      },
    });
  }

  function handlePointerMove(event: PointerEvent<SVGGElement>) {
    if (!drag || drag.pointerId !== event.pointerId) return;

    const point = toSvgPoint(event);
    if (!point) return;

    // subtract the grab offset to keep the same spot on the lens under the pointer
    setLensCenter(
      constrainPosition(
        { x: point.x - drag.offset.x, y: point.y - drag.offset.y },
        width
      )
    );
  }

  function handlePointerEnd(event: PointerEvent<SVGGElement>) {
    if (drag?.pointerId !== event.pointerId) return;

    setDrag(null);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  const viewBox = `${lensCenter.x - SOURCE_VIEW_SIZE / 2} ${lensCenter.y - SOURCE_VIEW_SIZE / 2} ${SOURCE_VIEW_SIZE} ${SOURCE_VIEW_SIZE}`;

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
        visibility={width ? "visible" : "hidden"}
        transform={`translate(${lensCenter.x} ${lensCenter.y})`}
        className={styles.lens}
        data-dragging={drag !== null}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
      >
        <circle
          className={styles.lensSurface}
          r={LENS_RADIUS}
          fill="var(--color-grey-2)"
          pointerEvents="none"
        />
        <g clipPath={`url(#${id}-clip)`} pointerEvents="none">
          <svg
            x={-LENS_RADIUS}
            y={-LENS_RADIUS}
            width={LENS_DIAMETER}
            height={LENS_DIAMETER}
            viewBox={viewBox}
          >
            <Prose width={width} />
          </svg>
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
      height={CANVAS_HEIGHT - PROSE_VERTICAL_PADDING * 2}
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

function constrainPosition({ x, y }: Point, width: number): Point {
  // clamp the centre far enough from each edge to fit the radius plus a gap
  // on narrow canvases, Math.max keeps the upper limit at least as large as the lower limit, though the lens may still be too large to fit
  return {
    x: clamp(x, LENS_INSET, Math.max(LENS_INSET, width - LENS_INSET)),
    y: clamp(y, LENS_INSET, CANVAS_HEIGHT - LENS_INSET),
  };
}
