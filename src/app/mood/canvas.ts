import { clamp } from "../../utils/math";

import { ASSETS } from "./assets";

export interface Point {
  x: number;
  y: number;
}

export interface Camera extends Point {
  scale: number;
}

export type Tool = "select" | "pan";

export function toItemTransform({ x, y }: Point) {
  return `translate3d(${x}px, ${y}px, 0)`;
}

export function toCameraTransform({ x, y, scale }: Camera) {
  return `scale(${scale}) translate(${x}px, ${y}px)`;
}

export interface Placement extends Point {
  stackOrder: number;
}

export type Placements = Record<string, Placement>;

export const MIN_SCALE = 0.25;
export const MAX_SCALE = 3;
export const INITIAL_SCALE = 0.7;
export const ZOOM_STEP = 1.06;
export const WHEEL_ZOOM_DAMPING = 0.009;

// leave room for the back link
const RIGHT_BIAS_PX = 132;

const CONTENT_BOUNDS = {
  minX: Math.min(...ASSETS.map(({ x }) => x)),
  minY: Math.min(...ASSETS.map(({ y }) => y)),
  maxX: Math.max(...ASSETS.map(({ x, width }) => x + width)),
  maxY: Math.max(...ASSETS.map(({ y, height }) => y + height)),
};

function toCanvasSpace(point: Point, camera: Camera) {
  return {
    x: point.x / camera.scale - camera.x,
    y: point.y / camera.scale - camera.y,
  };
}

/** Keeps the zoom anchor fixed. */
function zoomAt(camera: Camera, anchor: Point, nextScale: number): Camera {
  const scale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
  const pointBeforeZoom = toCanvasSpace(anchor, camera);
  const pointAfterZoom = toCanvasSpace(anchor, { ...camera, scale });

  return {
    x: camera.x + (pointAfterZoom.x - pointBeforeZoom.x),
    y: camera.y + (pointAfterZoom.y - pointBeforeZoom.y),
    scale,
  };
}

export function panCamera(camera: Camera, deltaX: number, deltaY: number) {
  return {
    ...camera,
    x: camera.x - deltaX / camera.scale,
    y: camera.y - deltaY / camera.scale,
  };
}

export function zoomFromWheel(camera: Camera, anchor: Point, deltaY: number) {
  const nextScale = camera.scale - deltaY * WHEEL_ZOOM_DAMPING * camera.scale;

  return zoomAt(camera, anchor, nextScale);
}

export function zoomBy(camera: Camera, anchor: Point, factor: number) {
  return zoomAt(camera, anchor, camera.scale * factor);
}

export function centreCamera(
  camera: Camera,
  { width, height }: { width: number; height: number }
) {
  return {
    ...camera,
    x:
      (width / 2 + RIGHT_BIAS_PX) / camera.scale -
      (CONTENT_BOUNDS.minX + CONTENT_BOUNDS.maxX) / 2,
    y:
      height / 2 / camera.scale -
      (CONTENT_BOUNDS.minY + CONTENT_BOUNDS.maxY) / 2,
  };
}
