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

import { afterNextPaint } from "../../../../utils/animation-frame";
import { ASSETS } from "../../assets";
import {
  focusCamera,
  getVisibleBounds,
  type Camera,
  type Placements,
  type Point,
  type Size,
} from "../../canvas";
import useMinimapImagesReady from "../../hooks/useMinimapImagesReady";

import styles from "./Minimap.module.css";

const MAX_WIDTH = 264;
const MAX_HEIGHT = 200;
const MAX_VIEWPORT_WIDTH_RATIO = 0.45;

// keep the camera visible above and below the artwork
const PADDING_X = 80;
const PADDING_Y = 320;

export interface MinimapHandle {
  draw: (camera: Camera) => void;
}

interface MinimapProps {
  boardShown: boolean;
  ref: RefObject<MinimapHandle | null>;
  camera: Camera;
  placements: Placements;
  viewportRef: RefObject<HTMLDivElement | null>;
  onDragStart: () => void;
  onCameraChange: (update: (current: Camera) => Camera) => void;
  onDragEnd: () => void;
}

export default function Minimap({
  boardShown,
  ref,
  camera,
  placements,
  viewportRef,
  onDragStart,
  onCameraChange,
  onDragEnd,
}: MinimapProps) {
  const viewportIndicatorRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef(0);
  const pendingPointRef = useRef<Point | null>(null);

  const [viewport, setViewport] = useState<Size>({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const minimapImagesReady = useMinimapImagesReady(contentRef, ASSETS.length);

  const canReveal = boardShown && minimapImagesReady;

  // size around the artwork because the board has no fixed bounds
  const bounds = contentBounds(placements);
  const availableWidth = viewport.width || MAX_WIDTH;

  // leave room for the board on narrow viewports
  const maxWidth = Math.min(
    MAX_WIDTH,
    availableWidth * MAX_VIEWPORT_WIDTH_RATIO
  );

  // preserve the artwork's aspect ratio within both size limits
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

  // wait for the hidden state to paint even when thumbnails are cached
  useEffect(() => {
    if (!canReveal) return;

    return afterNextPaint(() => setVisible(true));
  }, [canReveal]);

  useEffect(
    () => () => window.cancelAnimationFrame(animationFrameIdRef.current),
    []
  );

  function getViewportRect(next: Camera) {
    const visibleBounds = getVisibleBounds(next, viewport);

    // convert canvas bounds to minimap coordinates
    return {
      width: visibleBounds.width * scale,
      height: visibleBounds.height * scale,
      x: (visibleBounds.x - bounds.x) * scale,
      y: (visibleBounds.y - bounds.y) * scale,
    };
  }

  // bypass react so the indicator keeps pace with gestures
  useImperativeHandle(ref, () => ({
    draw(next) {
      const element = viewportIndicatorRef.current;
      if (!element) return;

      const { x, y, width, height } = getViewportRect(next);

      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
  }));

  function toCanvasPosition(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    // convert the pointer from minimap space to canvas space
    return {
      x: bounds.x + (event.clientX - rect.left) / scale,
      y: bounds.y + (event.clientY - rect.top) / scale,
    };
  }

  function applyPendingFocus() {
    const point = pendingPointRef.current;
    pendingPointRef.current = null;

    if (point) {
      // keep the current zoom while centring the selected point
      onCameraChange((current) => focusCamera(current, point, viewport));
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

    // flush the release position before the queued frame
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

  const rect = getViewportRect(camera);

  return (
    <div
      className={styles.minimap}
      data-visible={visible}
      inert={!visible}
      aria-hidden={!visible}
      data-dragging={dragging}
      style={minimapSize}
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

          return (
            <div
              key={id}
              className={styles.item}
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
                loading="eager"
                fetchPriority="low"
                sizes={`${Math.ceil(width * scale)}px`}
                draggable={false}
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
      <div
        ref={viewportIndicatorRef}
        className={styles.viewportIndicator}
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

  // include negative artwork positions and pad the camera range
  const minX = Math.min(...boxes.map(({ x }) => x)) - PADDING_X;
  const minY = Math.min(...boxes.map(({ y }) => y)) - PADDING_Y;
  const maxX = Math.max(...boxes.map(({ x, width }) => x + width)) + PADDING_X;
  const maxY =
    Math.max(...boxes.map(({ y, height }) => y + height)) + PADDING_Y;

  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}
