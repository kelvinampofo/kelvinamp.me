import { clamp } from "../../utils/math";

import { ASSETS } from "./assets";

const INITIAL_SCALE = 0.95;
export const ZOOM_STEP = 1.06;

const MIN_SCALE = 0.25;
const MAX_SCALE = 3;
const WHEEL_ZOOM_DAMPING = 0.009;

// leave room for the back link
const RIGHT_BIAS_PX = 132;

const MINIMAP_MAX_WIDTH = 264;
const MINIMAP_MAX_HEIGHT = 200;
const MINIMAP_MAX_VIEWPORT_WIDTH_RATIO = 0.45;

// keep the camera visible above and below the artwork
const MINIMAP_PADDING_X = 80;
const MINIMAP_PADDING_Y = 320;

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Point, Size {}

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

export const INITIAL_CAMERA: Camera = { x: 0, y: 0, scale: INITIAL_SCALE };

export interface MinimapProjection {
  bounds: Rect;
  scale: number;
  size: Size;
}

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
export function getVisibleBounds(
  camera: Camera,
  { width, height }: Size
): Rect {
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

export function centreCamera(
  camera: Camera,
  placements: Placements,
  { width, height }: Size
) {
  const bounds = getBoardBounds(placements);

  return {
    ...camera,
    x:
      (width / 2 + RIGHT_BIAS_PX) / camera.scale -
      (bounds.x + bounds.width / 2),
    y: height / 2 / camera.scale - (bounds.y + bounds.height / 2),
  };
}

/** The box around every item at its current placement. */
export function getBoardBounds(
  placements: Placements,
  padding: Size = { width: 0, height: 0 }
): Rect {
  const boxes = ASSETS.map(({ id, width, height }) => ({
    ...placements[id],
    width,
    height,
  }));

  const minX = Math.min(...boxes.map(({ x }) => x)) - padding.width;
  const minY = Math.min(...boxes.map(({ y }) => y)) - padding.height;
  const maxX =
    Math.max(...boxes.map(({ x, width }) => x + width)) + padding.width;
  const maxY =
    Math.max(...boxes.map(({ y, height }) => y + height)) + padding.height;

  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

/** Fits the padded board into the minimap's size limits. */
export function getMinimapProjection(
  placements: Placements,
  viewport: Size
): MinimapProjection {
  // size around the artwork because the board has no fixed bounds
  const bounds = getBoardBounds(placements, {
    width: MINIMAP_PADDING_X,
    height: MINIMAP_PADDING_Y,
  });

  // leave room for the board on narrow viewports
  const maxWidth = Math.min(
    MINIMAP_MAX_WIDTH,
    (viewport.width || MINIMAP_MAX_WIDTH) * MINIMAP_MAX_VIEWPORT_WIDTH_RATIO
  );

  // preserve the artwork's aspect ratio within both size limits
  const scale = Math.min(
    maxWidth / bounds.width,
    MINIMAP_MAX_HEIGHT / bounds.height
  );

  return {
    bounds,
    scale,
    size: { width: bounds.width * scale, height: bounds.height * scale },
  };
}

/** Converts a canvas rect to minimap space. */
export function toMinimapRect(
  rect: Rect,
  { bounds, scale }: MinimapProjection
): Rect {
  return {
    x: (rect.x - bounds.x) * scale,
    y: (rect.y - bounds.y) * scale,
    width: rect.width * scale,
    height: rect.height * scale,
  };
}

/** Converts a minimap point to canvas space. */
export function fromMinimapPoint(
  point: Point,
  { bounds, scale }: MinimapProjection
): Point {
  return {
    x: bounds.x + point.x / scale,
    y: bounds.y + point.y / scale,
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
