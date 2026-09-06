"use client";

import Image from "next/image";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";

import { ASSETS } from "../../assets";
import {
  focusCamera,
  getVisibleBounds,
  type Camera,
  type Placements,
  type Point,
  type Size,
} from "../../canvas";

import styles from "./Minimap.module.css";

const MAX_WIDTH = 264;
const MAX_HEIGHT = 200;
const MAX_VIEWPORT_WIDTH_RATIO = 0.45;

// the art sits in a wide band, so extra vertical padding leaves room to show the camera when panning above or below it
const PADDING_X = 80;
const PADDING_Y = 320;

export interface MinimapHandle {
  draw: (camera: Camera) => void;
}

interface MinimapProps {
  ref: RefObject<MinimapHandle | null>;
  camera: Camera;
  placements: Placements;
  viewportRef: RefObject<HTMLDivElement | null>;
  onDragStart: () => void;
  onCameraChange: (update: (current: Camera) => Camera) => void;
  onDragEnd: () => void;
}

export default function Minimap({
  ref,
  camera,
  placements,
  viewportRef,
  onDragStart,
  onCameraChange,
  onDragEnd,
}: MinimapProps) {
  const cameraRef = useRef<HTMLDivElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef(0);
  const pendingPointRef = useRef<Point | null>(null);

  const [viewport, setViewport] = useState<Size>({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);

  // the board can pan anywhere, so size the minimap around the art rather than a fixed canvas
  const bounds = contentBounds(placements);
  const availableWidth = viewport.width || MAX_WIDTH;

  // use at most 45% of the viewport width so the minimap leaves room for the board on smaller screens
  const maxWidth = Math.min(
    MAX_WIDTH,
    availableWidth * MAX_VIEWPORT_WIDTH_RATIO
  );

  // choose the smaller scale so both dimensions fit their limits without stretching the art
  // a scale of 1/10 means 100 canvas units become 10 minimap pixels
  const scale = Math.min(maxWidth / bounds.width, MAX_HEIGHT / bounds.height);

  const minimapSize = {
    width: bounds.width * scale,
    height: bounds.height * scale,
  };

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setViewport({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [viewportRef]);

  useEffect(
    () => () => window.cancelAnimationFrame(animationFrameIdRef.current),
    []
  );

  function getCameraRect(next: Camera) {
    // zooming in shows less of the canvas, so the visible area and its minimap rectangle get smaller
    const visible = getVisibleBounds(next, viewport);

    // subtract the content bounds origin to measure from the minimap's top left, then scale canvas units into minimap pixels
    return {
      width: visible.width * scale,
      height: visible.height * scale,
      x: (visible.x - bounds.x) * scale,
      y: (visible.y - bounds.y) * scale,
    };
  }

  // update the rectangle directly so it follows gestures before React state catches up
  useImperativeHandle(ref, () => ({
    draw(next) {
      const element = cameraRef.current;
      if (!element) return;

      const { x, y, width, height } = getCameraRect(next);

      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
  }));

  function toCanvasPosition(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    // subtract the minimap's viewport position to find the pointer inside it, then divide by scale to undo the shrinking
    // adding the bounds origin turns that distance into a canvas position, so 10 minimap pixels at a scale of 1/10 means 100 canvas units from the origin
    return {
      x: bounds.x + (event.clientX - rect.left) / scale,
      y: bounds.y + (event.clientY - rect.top) / scale,
    };
  }

  function applyPendingFocus() {
    const point = pendingPointRef.current;
    pendingPointRef.current = null;

    if (point) {
      // centre the main viewport on the selected canvas point while keeping the current zoom
      onCameraChange((current) => focusCamera(current, point, viewport));
    }
  }

  function scheduleFocus(event: PointerEvent<HTMLDivElement>) {
    // keep the latest pointer position but schedule only one camera update per animation frame
    pendingPointRef.current = toCanvasPosition(event);
    if (animationFrameIdRef.current) return;

    animationFrameIdRef.current = window.requestAnimationFrame(() => {
      animationFrameIdRef.current = 0;
      applyPendingFocus();
    });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;

    // keep receiving drag events even when the pointer leaves the minimap
    event.currentTarget.setPointerCapture(event.pointerId);
    activePointerIdRef.current = event.pointerId;

    onDragStart();

    setDragging(true);
    scheduleFocus(event);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (activePointerIdRef.current !== event.pointerId) return;

    scheduleFocus(event);
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (activePointerIdRef.current !== event.pointerId) return;

    // apply the final position immediately if release happens before the queued frame runs
    if (event.type === "pointerup") {
      pendingPointRef.current = toCanvasPosition(event);
    }

    window.cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = 0;

    applyPendingFocus();
    onDragEnd();

    activePointerIdRef.current = null;
    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  const rect = getCameraRect(camera);

  return (
    <div
      className={styles.minimap}
      data-dragging={dragging}
      style={minimapSize}
      role="presentation"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onLostPointerCapture={handlePointerEnd}
    >
      <div className={styles.scene}>
        {ASSETS.map(({ id, width, height, src }) => {
          const placement = placements[id];

          return (
            <div
              key={id}
              className={styles.thumbnail}
              style={{
                left: (placement.x - bounds.x) * scale,
                top: (placement.y - bounds.y) * scale,
                width: width * scale,
                height: height * scale,
                zIndex: placement.stackOrder || undefined,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={`${Math.ceil(width * scale)}px`}
                draggable={false}
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
      <div
        ref={cameraRef}
        className={styles.camera}
        style={{
          width: rect.width,
          height: rect.height,
          transform: `translate3d(${rect.x}px, ${rect.y}px, 0)`,
        }}
      />
    </div>
  );
}

function contentBounds(placements: Placements) {
  const boxes = ASSETS.map(({ id, width, height }) => ({
    ...placements[id],
    width,
    height,
  }));

  // find the outer edges of all artwork and add padding on each side
  // x and y mark each artwork's top left, so adding its width or height gives its opposite edge
  const minX = Math.min(...boxes.map(({ x }) => x)) - PADDING_X;
  const minY = Math.min(...boxes.map(({ y }) => y)) - PADDING_Y;
  const maxX = Math.max(...boxes.map(({ x, width }) => x + width)) + PADDING_X;
  const maxY =
    Math.max(...boxes.map(({ y, height }) => y + height)) + PADDING_Y;

  // subtract opposite edges to get the full span, including artwork at negative coordinates
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}
