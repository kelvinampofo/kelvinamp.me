"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";

import useFullscreen from "../../../../hooks/useFullscreen";
import useShortcuts from "../../../../hooks/useShortcuts";
import { ASSETS } from "../../assets";
import {
  INITIAL_CAMERA,
  toCameraTransform,
  toItemTransform,
  type Placements,
  type Tool,
} from "../../canvas";
import useBoardReveal, { getStaggerDelay } from "../../hooks/useBoardReveal";
import useCamera from "../../hooks/useCamera";
import useDrag from "../../hooks/useDrag";
import usePanZoom from "../../hooks/usePanZoom";
import Minimap from "../Minimap/Minimap";

import styles from "./MoodBoard.module.css";

// eager-load the images most likely to become lcp during the stagger
const EAGER_ITEM_IDS = new Set([
  "sketch",
  "caravaggio",
  "nasa-spacecraft-markings",
]);

const INITIAL_PLACEMENTS: Placements = Object.fromEntries(
  ASSETS.map(({ id, x, y }) => [id, { x, y, stackOrder: 0 }])
);

export default function MoodBoard() {
  const [placements, setPlacements] = useState(INITIAL_PLACEMENTS);
  const [tool, setTool] = useState<Tool>("select");

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const minimapContentRef = useRef<HTMLDivElement | null>(null);

  const { camera, viewport } = useCamera({
    viewportRef,
    surfaceRef,
    initialPlacements: INITIAL_PLACEMENTS,
  });

  const { revealState, minimapShown } = useBoardReveal({
    viewportRef,
    surfaceRef,
    minimapContentRef,
  });

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
  } = usePanZoom({ viewportRef, camera, tool, cancelDrag });

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

  return (
    <>
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
          data-reveal-state={revealState}
          style={{
            // the camera writes later transforms directly
            transform: toCameraTransform(INITIAL_CAMERA),
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
                  "--stagger-delay": getStaggerDelay(index),
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes={`${width}px`}
                  loading={EAGER_ITEM_IDS.has(id) ? "eager" : undefined}
                  draggable={false}
                  className={styles.image}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.loadingStatus} role="status">
        {revealState === "loading" ? "Loading images..." : null}
      </div>
      <Minimap
        shown={minimapShown}
        contentRef={minimapContentRef}
        camera={camera}
        viewport={viewport}
        placements={placements}
      />
    </>
  );
}
