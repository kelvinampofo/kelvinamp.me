"use client";

import clsx from "clsx";
import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
} from "react";

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
import Minimap, { type MinimapHandle } from "../Minimap/Minimap";

import styles from "./MoodBoard.module.css";

const PREFERRED_STAGGER_INTERVAL_MS = 40;
const MAX_STAGGER_DURATION_MS = 800;

// the stagger makes each larger arrival an lcp candidate until nasa appears
const EAGER_ITEM_IDS = new Set([
  "sketch",
  "caravaggio",
  "nasa-spacecraft-markings",
]);

// cap the stagger as the board grows
const STAGGER_INTERVAL_MS = Math.min(
  PREFERRED_STAGGER_INTERVAL_MS,
  MAX_STAGGER_DURATION_MS / Math.max(ASSETS.length - 1, 1)
);

const INITIAL_CAMERA: Camera = { x: 0, y: 0, scale: INITIAL_SCALE };
const INITIAL_PLACEMENTS: Placements = Object.fromEntries(
  ASSETS.map(({ id, x, y }) => [id, { x, y, stackOrder: 0 }])
);

export default function MoodBoard() {
  const [staggerState, setStaggerState] = useState<"running" | "complete">(
    "running"
  );
  const [camera, setCamera] = useState(INITIAL_CAMERA);
  const [placements, setPlacements] = useState(INITIAL_PLACEMENTS);
  const [tool, setTool] = useState<Tool>("select");

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const minimapRef = useRef<MinimapHandle | null>(null);

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
    startGesture,
    updateCamera,
    commitCamera,
  } = usePanZoom({
    viewportRef,
    surfaceRef,
    camera,
    tool,
    setCamera,
    cancelDrag,
    onDraw: (next) => minimapRef.current?.draw(next),
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

  useLayoutEffect(() => {
    const images = Array.from(
      surfaceRef.current?.querySelectorAll("img") ?? []
    );
    const imagesAlreadyComplete = images.every((image) => image.complete);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // choose the stagger before paint and let css own its timing
    if (imagesAlreadyComplete || prefersReducedMotion) {
      setStaggerState("complete");
    }
  }, []);

  useEffect(() => {
    const bounds = viewportRef.current?.getBoundingClientRect();

    setCamera((current) =>
      centreCamera(current, {
        width: bounds?.width || window.innerWidth,
        height: bounds?.height || window.innerHeight,
      })
    );
  }, []);

  const staggerComplete = staggerState === "complete";

  function handleStaggerEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      setStaggerState("complete");
    }
  }

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
          data-stagger-state={staggerState}
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
                onAnimationEnd={
                  index === ASSETS.length - 1 ? handleStaggerEnd : undefined
                }
                style={{
                  width,
                  height,
                  transform: toItemTransform(placement),
                  zIndex: placement.stackOrder || undefined,
                  "--stagger-delay": `${Math.round(index * STAGGER_INTERVAL_MS)}ms`,
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
      <Minimap
        ref={minimapRef}
        revealReady={staggerComplete}
        camera={camera}
        placements={placements}
        viewportRef={viewportRef}
        onDragStart={startGesture}
        onCameraChange={updateCamera}
        onDragEnd={commitCamera}
      />
    </>
  );
}
