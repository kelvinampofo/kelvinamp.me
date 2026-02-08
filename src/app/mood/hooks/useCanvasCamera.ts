import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type SetStateAction,
} from "react";

import { clamp } from "../../../utils/math";
import { CANVAS_IMAGES } from "../images";

interface ScreenBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

interface ContentBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface Point {
  x: number;
  y: number;
}

interface Camera {
  x: number;
  y: number;
  z: number;
}

interface PanDragState {
  pointerId: number;
  startClientX: number;
  startClientY: number;
}

const RIGHT_BIAS_PX = 132;
const MIN_SCALE = 0.25;
const MAX_SCALE = 3;
const ZOOM_STEP = 0.06;
const WHEEL_ZOOM_DAMPING = 0.009;
const INITIAL_SCALE = 0.7;

function getContentBounds(): ContentBounds {
  if (CANVAS_IMAGES.length === 0) {
    return {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
    };
  }

  const minX = Math.min(...CANVAS_IMAGES.map((image) => image.x));
  const minY = Math.min(...CANVAS_IMAGES.map((image) => image.y));
  const maxX = Math.max(
    ...CANVAS_IMAGES.map((image) => image.x + image.width)
  );
  const maxY = Math.max(
    ...CANVAS_IMAGES.map((image) => image.y + image.height)
  );

  const bounds = { minX, minY, maxX, maxY };

  return bounds;
}

const CONTENT_BOUNDS = getContentBounds();

function screenToCanvas(point: Point, cameraValue: Camera): Point {
  return {
    x: point.x / cameraValue.z - cameraValue.x,
    y: point.y / cameraValue.z - cameraValue.y,
  };
}

function panCamera(
  cameraValue: Camera,
  deltaX: number,
  deltaY: number
): Camera {
  return {
    x: cameraValue.x - deltaX / cameraValue.z,
    y: cameraValue.y - deltaY / cameraValue.z,
    z: cameraValue.z,
  };
}

function zoomCameraTo(
  cameraValue: Camera,
  point: Point,
  nextZoom: number,
  minScale: number,
  maxScale: number
): Camera {
  const zoom = clamp(nextZoom, minScale, maxScale);

  const p1 = screenToCanvas(point, cameraValue);
  const p2 = screenToCanvas(point, { ...cameraValue, z: zoom });

  return {
    x: cameraValue.x + (p2.x - p1.x),
    y: cameraValue.y + (p2.y - p1.y),
    z: zoom,
  };
}

function zoomCamera(
  cameraValue: Camera,
  point: Point,
  deltaZoom: number,
  minScale: number,
  maxScale: number
): Camera {
  const camera = zoomCameraTo(
    cameraValue,
    point,
    cameraValue.z - deltaZoom * cameraValue.z,
    minScale,
    maxScale
  );

  return camera;
}

function getCenteredCamera(
  zoom: number,
  screenBox: ScreenBox,
  rightBias: number
): Point {
  const { minX, minY, maxX, maxY } = CONTENT_BOUNDS;

  const contentCenterX = (minX + maxX) / 2;
  const contentCenterY = (minY + maxY) / 2;

  return {
    x: (screenBox.width / 2 + rightBias) / zoom - contentCenterX,
    y: screenBox.height / 2 / zoom - contentCenterY,
  };
}

export default function useCanvasCamera({
  canvasRef,
}: {
  canvasRef: RefObject<HTMLDivElement | null>;
}) {
  const initialZoom = clamp(INITIAL_SCALE, MIN_SCALE, MAX_SCALE);

  const [camera, setCameraState] = useState<Camera>({
    x: 0,
    y: 0,
    z: initialZoom,
  });

  const cameraRef = useRef(camera);
  const hasCenteredInitiallyRef = useRef(false);
  const panningRef = useRef<PanDragState | null>(null);

  function setCamera(value: SetStateAction<Camera>) {
    setCameraState((previousCamera) => {
      const nextCamera =
        typeof value === "function" ? value(previousCamera) : value;

      cameraRef.current = nextCamera;
      return nextCamera;
    });
  }

  function getScreenBox(): ScreenBox {
    const canvasElement = canvasRef.current;

    if (canvasElement) {
      const rect = canvasElement.getBoundingClientRect();

      return {
        minX: rect.left,
        minY: rect.top,
        maxX: rect.right,
        maxY: rect.bottom,
        width: rect.width,
        height: rect.height,
      };
    }

    return {
      minX: 0,
      minY: 0,
      maxX: window.innerWidth,
      maxY: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  function getScreenCenterPoint(): Point {
    const screenBox = getScreenBox();

    return {
      x: screenBox.width / 2,
      y: screenBox.height / 2,
    };
  }

  function zoomIn() {
    const point = getScreenCenterPoint();

    setCamera((previousCamera) =>
      zoomCameraTo(
        previousCamera,
        point,
        previousCamera.z * (1 + ZOOM_STEP),
        MIN_SCALE,
        MAX_SCALE
      )
    );
  }

  function zoomOut() {
    const point = getScreenCenterPoint();

    setCamera((previousCamera) =>
      zoomCameraTo(
        previousCamera,
        point,
        previousCamera.z / (1 + ZOOM_STEP),
        MIN_SCALE,
        MAX_SCALE
      )
    );
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    panningRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  useEffect(() => {
    if (hasCenteredInitiallyRef.current) return;

    hasCenteredInitiallyRef.current = true;

    const canvasElement = canvasRef.current;
    const rect = canvasElement?.getBoundingClientRect();
    const screenBox = rect
      ? {
          minX: rect.left,
          minY: rect.top,
          maxX: rect.right,
          maxY: rect.bottom,
          width: rect.width,
          height: rect.height,
        }
      : {
          minX: 0,
          minY: 0,
          maxX: window.innerWidth,
          maxY: window.innerHeight,
          width: window.innerWidth,
          height: window.innerHeight,
        };

    const centered = getCenteredCamera(
      cameraRef.current.z,
      screenBox,
      RIGHT_BIAS_PX
    );

    setCamera((previousCamera) => ({
      ...previousCamera,
      x: centered.x,
      y: centered.y,
    }));
  }, [canvasRef]);

  const onWheel = useEffectEvent(
    (event: WheelEvent, wheelElement: HTMLDivElement) => {
      event.preventDefault();

      const bounds = wheelElement.getBoundingClientRect();

      const pointInCanvas = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      if (event.metaKey || event.ctrlKey) {
        setCamera((previousCamera) =>
          zoomCamera(
            previousCamera,
            pointInCanvas,
            event.deltaY * WHEEL_ZOOM_DAMPING,
            MIN_SCALE,
            MAX_SCALE
          )
        );
        return;
      }

      setCamera((previousCamera) =>
        panCamera(previousCamera, event.deltaX, event.deltaY)
      );
    }
  );

  const onWindowPointerMove = useEffectEvent((event: PointerEvent) => {
    const panDrag = panningRef.current;

    if (!panDrag || event.pointerId !== panDrag.pointerId) return;

    const deltaX = event.clientX - panDrag.startClientX;
    const deltaY = event.clientY - panDrag.startClientY;

    setCamera((previousCamera) => panCamera(previousCamera, -deltaX, -deltaY));

    panningRef.current = {
      pointerId: panDrag.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
    };
  });

  const onWindowPointerUp = useEffectEvent((event: PointerEvent) => {
    const panDrag = panningRef.current;
    if (!panDrag || event.pointerId !== panDrag.pointerId) return;

    panningRef.current = null;
  });

  useEffect(() => {
    const wheelElement = canvasRef.current;

    if (!wheelElement) return;

    const handleWheel = (event: WheelEvent) => onWheel(event, wheelElement);

    wheelElement.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    window.addEventListener("pointermove", onWindowPointerMove);
    window.addEventListener("pointerup", onWindowPointerUp);

    return () => {
      wheelElement.removeEventListener("wheel", handleWheel);
      window.removeEventListener("pointermove", onWindowPointerMove);
      window.removeEventListener("pointerup", onWindowPointerUp);

      panningRef.current = null;
    };
  }, [canvasRef]);

  return {
    camera,
    cameraRef,
    onPointerDown,
    zoomIn,
    zoomOut,
  };
}
