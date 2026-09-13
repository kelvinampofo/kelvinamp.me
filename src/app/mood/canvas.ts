import { clamp } from "../../utils/math";

import { ASSETS } from "./assets";

export const INITIAL_SCALE = 0.95;
export const ZOOM_STEP = 1.06;

const MIN_SCALE = 0.25;
const MAX_SCALE = 3;
const WHEEL_ZOOM_DAMPING = 0.009;

// leave room for the back link
const RIGHT_BIAS_PX = 132;

const CONTENT_BOUNDS = {
  minX: Math.min(...ASSETS.map(({ x }) => x)),
  minY: Math.min(...ASSETS.map(({ y }) => y)),
  maxX: Math.max(...ASSETS.map(({ x, width }) => x + width)),
  maxY: Math.max(...ASSETS.map(({ y, height }) => y + height)),
};

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Camera extends Point {
  scale: number;
}

interface Placement extends Point {
  stackOrder: number;
}

export interface Placements {
  [id: string]: Placement;
}

export type Tool = "select" | "pan";

export function toItemTransform({ x, y }: Point) {
  return `translate3d(${x}px, ${y}px, 0)`;
}

export function toCameraTransform({ x, y, scale }: Camera) {
  return `scale(${scale}) translate(${x}px, ${y}px)`;
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

/** The slice of canvas the viewport currently shows. */
export function getVisibleBounds(camera: Camera, { width, height }: Size) {
  return {
    x: -camera.x,
    y: -camera.y,
    width: width / camera.scale,
    height: height / camera.scale,
  };
}

/** Puts a canvas point at the centre of the viewport. */
export function focusCamera(
  camera: Camera,
  target: Point,
  { width, height }: Size
): Camera {
  return {
    ...camera,
    x: width / (2 * camera.scale) - target.x,
    y: height / (2 * camera.scale) - target.y,
  };
}

export function centreCamera(camera: Camera, { width, height }: Size) {
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
