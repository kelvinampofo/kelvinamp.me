"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";

import { ASSETS } from "../../assets";
import {
  focusCamera,
  fromMinimapPoint,
  getMinimapProjection,
  getVisibleBounds,
  toMinimapRect,
  type Camera,
  type Placements,
  type Point,
  type Size,
} from "../../canvas";
import type { CameraHandle } from "../../hooks/useCamera";

import styles from "./Minimap.module.css";

interface MinimapProps {
  shown: boolean;
  contentRef: RefObject<HTMLDivElement | null>;
  camera: CameraHandle;
  viewport: Size;
  placements: Placements;
}

export default function Minimap({
  shown,
  contentRef,
  camera,
  viewport,
  placements,
}: MinimapProps) {
  const [dragTarget, setDragTarget] = useState<"indicator" | "map" | null>(
    null
  );

  const viewportIndicatorRef = useRef<HTMLDivElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef(0);
  const pendingPointRef = useRef<Point | null>(null);

  const projection = getMinimapProjection(placements, viewport);

  // bypass react so the indicator keeps pace with gestures
  function drawIndicator(next: Camera) {
    const element = viewportIndicatorRef.current;
    if (!element) return;

    const { x, y, width, height } = toMinimapRect(
      getVisibleBounds(next, viewport),
      projection
    );

    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  // redraw after every render too, since the projection follows placements and resizes
  useLayoutEffect(() => {
    drawIndicator(camera.get());
    return camera.subscribe(drawIndicator);
  });

  useEffect(
    () => () => window.cancelAnimationFrame(animationFrameIdRef.current),
    []
  );

  function toCanvasPosition(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    return fromMinimapPoint(
      { x: event.clientX - rect.left, y: event.clientY - rect.top },
      projection
    );
  }

  function applyPendingFocus() {
    const point = pendingPointRef.current;
    pendingPointRef.current = null;

    if (point) {
      // keep the current zoom while centring the selected point
      camera.move((current, size) => focusCamera(current, point, size));
    }
  }

  function scheduleFocus(event: PointerEvent<HTMLDivElement>) {
    // coalesce pointer moves into one camera update per frame
    pendingPointRef.current = toCanvasPosition(event);
    if (animationFrameIdRef.current) return;

    animationFrameIdRef.current = window.requestAnimationFrame(() => {
      animationFrameIdRef.current = 0;
      applyPendingFocus();
    });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;

    // keep the drag active outside the minimap
    event.currentTarget.setPointerCapture(event.pointerId);
    activePointerIdRef.current = event.pointerId;

    // clicking the map should keep the crosshair even when the indicator moves underneath it
    setDragTarget(
      event.target === viewportIndicatorRef.current ? "indicator" : "map"
    );

    scheduleFocus(event);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (activePointerIdRef.current !== event.pointerId) return;

    scheduleFocus(event);
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (activePointerIdRef.current !== event.pointerId) return;

    // flush the release position before the queued frame
    if (event.type === "pointerup") {
      pendingPointRef.current = toCanvasPosition(event);
    }

    window.cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = 0;

    applyPendingFocus();

    activePointerIdRef.current = null;
    setDragTarget(null);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      className={styles.minimap}
      data-visible={shown}
      inert={!shown}
      aria-hidden={!shown}
      data-drag-target={dragTarget}
      style={{ ...projection.size }}
      role="presentation"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onLostPointerCapture={handlePointerEnd}
    >
      <div ref={contentRef} className={styles.content}>
        {ASSETS.map(({ id, width, height, src }) => {
          const placement = placements[id];
          const rect = toMinimapRect(
            { ...placement, width, height },
            projection
          );

          return (
            <div
              key={id}
              className={styles.item}
              style={{
                left: rect.x,
                top: rect.y,
                width: rect.width,
                height: rect.height,
                zIndex: placement.stackOrder || undefined,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                loading="eager"
                fetchPriority="low"
                sizes={`${Math.ceil(rect.width)}px`}
                draggable={false}
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
      <div ref={viewportIndicatorRef} className={styles.viewportIndicator} />
    </div>
  );
}
