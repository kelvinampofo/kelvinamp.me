"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import useFullscreen from "../../../../hooks/useFullscreen";
import useShortcuts from "../../../../hooks/useShortcuts";
import { ASSETS } from "../../assets";
import {
  centreCamera,
  INITIAL_SCALE,
  toCameraTransform,
  toItemTransform,
  type Camera,
  type Placements,
  type Tool,
} from "../../canvas";
import useDrag from "../../hooks/useDrag";
import usePanZoom from "../../hooks/usePanZoom";

import styles from "./MoodBoard.module.css";

const PREFERRED_REVEAL_INTERVAL_MS = 60;
const MAX_REVEAL_DELAY_MS = 900;
const LCP_ITEM_ID = "sketch";

// bound the stagger as the board grows
const REVEAL_INTERVAL_MS = Math.min(
  PREFERRED_REVEAL_INTERVAL_MS,
  MAX_REVEAL_DELAY_MS / Math.max(ASSETS.length - 1, 1)
);

const INITIAL_CAMERA: Camera = { x: 0, y: 0, scale: INITIAL_SCALE };
const INITIAL_PLACEMENTS: Placements = Object.fromEntries(
  ASSETS.map(({ id, x, y }) => [id, { x, y, stackOrder: 0 }])
);

export default function MoodBoard() {
  const [camera, setCamera] = useState(INITIAL_CAMERA);
  const [placements, setPlacements] = useState(INITIAL_PLACEMENTS);
  const [tool, setTool] = useState<Tool>("select");

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);

  const {
    onPointerDown: onDragItem,
    onPointerMove: onDragMove,
    onPointerEnd: onDragEnd,
    cancel: cancelDrag,
  } = useDrag({ camera, placements, setPlacements, tool });

  const {
    onPointerDown: onPan,
    onPointerDownCapture: onTouch,
    onPointerMove: onPanMove,
    onPointerEnd: onPanEnd,
    zoomIn,
    zoomOut,
  } = usePanZoom({
    viewportRef,
    surfaceRef,
    camera,
    tool,
    setCamera,
    cancelDrag,
  });

  const { toggleFullscreen } = useFullscreen();

  useShortcuts({ F: toggleFullscreen }, { preventDefault: true });

  useShortcuts({
    H: () => setTool("pan"),
    V: () => setTool("select"),
  });

  useShortcuts(
    {
      Equal: zoomIn,
      NumpadAdd: zoomIn,
      Minus: zoomOut,
      NumpadSubtract: zoomOut,
    },
    { preventDefault: true, modifiers: "Meta", matchBy: "code" }
  );

  useEffect(() => {
    const bounds = viewportRef.current?.getBoundingClientRect();

    setCamera((current) =>
      centreCamera(current, {
        width: bounds?.width || window.innerWidth,
        height: bounds?.height || window.innerHeight,
      })
    );
  }, []);

  return (
    <div
      ref={viewportRef}
      className={clsx(styles.viewport, { [styles.panMode]: tool === "pan" })}
      onPointerDown={onPan}
      onPointerDownCapture={onTouch}
      onPointerMove={(event) => {
        onDragMove(event);
        onPanMove(event);
      }}
      onPointerUp={(event) => {
        onDragEnd(event);
        onPanEnd(event);
      }}
      onPointerCancel={(event) => {
        onDragEnd(event);
        onPanEnd(event);
      }}
    >
      <div
        ref={surfaceRef}
        className={styles.surface}
        style={{
          transform: toCameraTransform(camera),
        }}
      >
        {ASSETS.map(({ id, width, height, src, alt }, index) => {
          const placement = placements[id];

          return (
            <div
              key={id}
              data-board-item
              className={styles.item}
              onPointerDown={(event) => onDragItem(id, event)}
              style={{
                width,
                height,
                transform: toItemTransform(placement),
                zIndex: placement.stackOrder || undefined,
                "--reveal-delay": `${Math.round(index * REVEAL_INTERVAL_MS)}ms`,
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes={`${width}px`}
                loading={id === LCP_ITEM_ID ? "eager" : undefined}
                draggable={false}
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
