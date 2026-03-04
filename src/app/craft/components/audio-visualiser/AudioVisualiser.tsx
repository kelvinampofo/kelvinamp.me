"use client";

import { useEffect, useRef, useState } from "react";

import useShortcuts from "../../../../hooks/useShortcuts";
import { clamp } from "../../../../utils/math";

import styles from "./AudioVisualiser.module.css";

const PARTICLE_LIMIT = 140;
const TEMPO_BPM = 78;
const DESKTOP_LANE_COUNT = 20;
const TABLET_LANE_COUNT = 18;
const MOBILE_LANE_COUNT = 12;
const STAGE_EDGE_PADDING = 8;
const MAX_FRAME_DELTA_SECONDS = 0.06;
const TOKEN_REFRESH_INTERVAL_SECONDS = 0.5;
const DEBUG_REFRESH_INTERVAL_SECONDS = 0.12;
const FONT_SCALE_MIN_REM = 1;
const FONT_SCALE_PREFERRED_VW = 0.016;
const FONT_SCALE_MAX_REM = 1.42;
const ENTRY_OFFSET_Y = 8;
const HEAD_FLICKER_FREQUENCY = 45;
const HEAD_FLICKER_BASE = 0.82;
const HEAD_FLICKER_RANGE = 0.18;

type Bit = "0" | "1";

interface Point {
  x: number;
  y: number;
}

interface Motion {
  driftX: number;
  driftY: number;
  scale: number;
  duration: number;
}

interface Content {
  head: Bit;
  tailBits: Bit[];
}

interface Particle extends Point, Motion, Content {
  active: boolean;
  id: number;
  startedAtSeconds: number;
}

interface DrawTokens {
  fontFamily: string;
  fontSize: number;
  headColor: string;
  tailColor: string;
}

interface DebugState {
  enabled: boolean;
  fps: number;
  frameMs: number;
  activeParticles: number;
  particleLoad: number;
  laneCount: number;
}

interface FrameTimingState {
  lastTimestamp: number | null;
  nextTokenRefreshAt: number;
  nextDebugRefreshAt: number;
}

interface ParticleRuntimeState {
  laneEmissionAccumulators: number[];
  particleBuffer: Particle[];
  nextParticleBufferIndex: number;
}

const DEFAULT_DRAW_TOKENS: DrawTokens = {
  fontFamily:
    'ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 14,
  headColor: "rgb(220 220 220)",
  tailColor: "rgb(180 180 180)",
};

function formatPercent(value: number, precision = 2) {
  return Number(value.toFixed(precision));
}

const particleBuffer = Array.from(
  { length: PARTICLE_LIMIT },
  (_particle, id): Particle => {
    return {
      active: false,
      id,
      startedAtSeconds: 0,
      x: 0,
      y: 0,
      driftX: 0,
      driftY: 0,
      scale: 1,
      duration: 0.001,
      head: "0",
      tailBits: [],
    };
  }
);

function resizeAndClearCanvas({
  canvas,
  context,
  width,
  height,
  dpr,
}: {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  dpr: number;
}) {
  const pixelWidth = Math.round(width * dpr);
  const pixelHeight = Math.round(height * dpr);

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);
}

function updateDrawTokens({
  stage,
  drawTokens,
  frameTiming,
  width,
  timeSeconds,
}: {
  stage: HTMLDivElement;
  drawTokens: DrawTokens;
  frameTiming: FrameTimingState;
  width: number;
  timeSeconds: number;
}) {
  // Reading CSS variables every frame is expensive
  // Refresh them on a timer instead
  if (timeSeconds < frameTiming.nextTokenRefreshAt) return;

  const styles = getComputedStyle(stage);
  const rootFontSizePx = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  const safeRootFontSize = Number.isFinite(rootFontSizePx)
    ? rootFontSizePx
    : 16;

  drawTokens.fontFamily =
    styles.getPropertyValue("--particle-font-family").trim() ||
    drawTokens.fontFamily;

  drawTokens.fontSize = clamp(
    width * FONT_SCALE_PREFERRED_VW,
    FONT_SCALE_MIN_REM * safeRootFontSize,
    FONT_SCALE_MAX_REM * safeRootFontSize
  );

  drawTokens.headColor =
    styles.getPropertyValue("--particle-head-color").trim() ||
    drawTokens.headColor;

  drawTokens.tailColor =
    styles.getPropertyValue("--particle-tail-color").trim() ||
    drawTokens.tailColor;

  frameTiming.nextTokenRefreshAt = timeSeconds + TOKEN_REFRESH_INTERVAL_SECONDS;
}

function getSignalIntensity(timeSeconds: number) {
  // Create a repeating beat pulse from the target BPM
  const beatPeriod = 60 / TEMPO_BPM;
  const beatPhase = (timeSeconds % beatPeriod) / beatPeriod;
  const beatPulse = Math.exp(-13 * beatPhase);

  // Add slower sine waves so intensity feels less robotic
  const groove =
    (Math.sin(timeSeconds * 2.3) +
      Math.sin(timeSeconds * 3.9 + 1.2) * 0.45 +
      Math.sin(timeSeconds * 7.2 + 0.3) * 0.2 +
      1.65) /
    3.3;

  return clamp(0.18 + groove * 0.48 + beatPulse * 0.58, 0, 1);
}

function syncLaneAccumulatorCount(
  particleRuntime: ParticleRuntimeState,
  laneCount: number
) {
  if (particleRuntime.laneEmissionAccumulators.length === laneCount) return;

  // Each lane stores fractional spawn progress
  // This avoids burst-y spawn patterns between frames
  particleRuntime.laneEmissionAccumulators = Array.from(
    { length: laneCount },
    () => 0
  );
}

function emitParticleStreams({
  particleRuntime,
  width,
  height,
  laneCount,
  timeSeconds,
  deltaSeconds,
  intensity,
}: {
  particleRuntime: ParticleRuntimeState;
  width: number;
  height: number;
  laneCount: number;
  timeSeconds: number;
  deltaSeconds: number;
  intensity: number;
}) {
  const centerY = height * 0.5;

  for (let laneIndex = 0; laneIndex < laneCount; laneIndex++) {
    // Convert lane index into a 0-1 position across the stage
    const normalizedLaneX = laneIndex / (laneCount - 1);
    const laneX = width * normalizedLaneX;
    const lanePhase = normalizedLaneX * Math.PI * 2.5;

    // Build lane-specific energy so not all lanes emit equally
    const laneCarrier =
      (Math.sin(lanePhase + timeSeconds * 2.25) +
        Math.sin(lanePhase * 1.8 + timeSeconds * 1.15 + 0.6) * 0.6 +
        1.6) /
      3.2;
    const laneIntensity = clamp(
      0.12 + laneCarrier * (0.5 + intensity * 0.5),
      0,
      1
    );

    const emissionRate = 0.7 + laneIntensity * (5 + intensity * 10);
    particleRuntime.laneEmissionAccumulators[laneIndex] +=
      emissionRate * deltaSeconds;

    // Spawn whole particles whenever accumulated progress passes 1
    while (particleRuntime.laneEmissionAccumulators[laneIndex] >= 1) {
      const laneHalfHeight = 5 + laneIntensity * (height * 0.16);

      const spawnY = clamp(
        centerY + (Math.random() * 2 - 1) * laneHalfHeight,
        STAGE_EDGE_PADDING,
        height - STAGE_EDGE_PADDING
      );
      const verticalDirection = spawnY >= centerY ? 1 : -1;

      const streamLength =
        4 + Math.floor(laneIntensity * 7) + Math.floor(Math.random() * 2);
      const streamBits = Array.from(
        { length: streamLength },
        (): Bit => (Math.random() < 0.5 ? "0" : "1")
      );

      // Reuse pooled particles to avoid per-frame allocations
      const bufferIndex = particleRuntime.nextParticleBufferIndex;

      particleRuntime.particleBuffer[bufferIndex] = {
        active: true,
        id: bufferIndex,
        startedAtSeconds: timeSeconds,
        x: clamp(
          laneX + (Math.random() - 0.5) * 1.2,
          STAGE_EDGE_PADDING,
          width - STAGE_EDGE_PADDING
        ),
        y: spawnY,
        driftX: (Math.random() - 0.5) * (1.2 + laneIntensity * 1.8),
        driftY:
          verticalDirection * (8 + laneIntensity * 18) +
          (Math.random() - 0.5) * 3,
        scale: 0.74 + laneIntensity * 0.28 + Math.random() * 0.03,
        duration: 0.66 + (1 - laneIntensity) * 0.42 + Math.random() * 0.08,
        head: streamBits[0],
        tailBits: streamBits.slice(1),
      };

      particleRuntime.nextParticleBufferIndex =
        (bufferIndex + 1) % PARTICLE_LIMIT;
      particleRuntime.laneEmissionAccumulators[laneIndex] -= 1;
    }
  }
}

function renderParticleStreams({
  context,
  particleRuntime,
  drawTokens,
  timeSeconds,
}: {
  context: CanvasRenderingContext2D;
  particleRuntime: ParticleRuntimeState;
  drawTokens: DrawTokens;
  timeSeconds: number;
}) {
  const lineHeight = drawTokens.fontSize;

  context.font = `${drawTokens.fontSize}px ${drawTokens.fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  let activeParticles = 0;

  for (const particle of particleRuntime.particleBuffer) {
    if (!particle.active) continue;

    const elapsedSeconds = timeSeconds - particle.startedAtSeconds;

    if (elapsedSeconds > particle.duration) {
      particle.active = false;
      continue;
    }

    activeParticles += 1;

    const progress = clamp(elapsedSeconds / particle.duration, 0, 1);
    // Start slightly above the final position, then settle into place
    const entranceOffsetY = (1 - progress) * -ENTRY_OFFSET_Y;

    const renderX = particle.x + particle.driftX * progress;
    const renderY = particle.y + particle.driftY * progress + entranceOffsetY;
    const renderScale = particle.scale * (0.82 + progress * 0.2);

    // Fade in quickly so new bits pop in, then fade out slowly
    const alpha =
      progress <= 0.14
        ? (progress / 0.14) * 0.94
        : (1 - (progress - 0.14) / 0.86) * 0.94;

    if (alpha <= 0) continue;

    const totalLines = 1 + particle.tailBits.length;
    // Center the full bit block around the particle anchor point
    const blockStartY = -((totalLines - 1) * lineHeight) * 0.5;
    const headFlicker =
      HEAD_FLICKER_BASE +
      HEAD_FLICKER_RANGE *
        (0.5 +
          0.5 * Math.sin(timeSeconds * HEAD_FLICKER_FREQUENCY + particle.id));

    context.save();
    context.translate(renderX, renderY);
    context.scale(renderScale, renderScale);

    context.fillStyle = drawTokens.headColor;
    context.globalAlpha = alpha * headFlicker;
    context.fillText(particle.head, 0, blockStartY);

    context.fillStyle = drawTokens.tailColor;
    context.globalAlpha = alpha;

    for (
      let lineIndex = 0;
      lineIndex < particle.tailBits.length;
      lineIndex += 1
    ) {
      context.fillText(
        particle.tailBits[lineIndex],
        0,
        blockStartY + lineHeight * (lineIndex + 1)
      );
    }

    context.restore();
  }

  context.globalAlpha = 1;

  return activeParticles;
}

export default function AudioVisualiser() {
  const [debug, setDebug] = useState<DebugState>({
    enabled: false,
    fps: 0,
    frameMs: 0,
    activeParticles: 0,
    particleLoad: 0,
    laneCount: DESKTOP_LANE_COUNT,
  });

  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const frameTimingRef = useRef<FrameTimingState>({
    lastTimestamp: null,
    nextTokenRefreshAt: 0,
    nextDebugRefreshAt: 0,
  });
  const drawTokensRef = useRef<DrawTokens>({ ...DEFAULT_DRAW_TOKENS });
  const particleRuntimeRef = useRef<ParticleRuntimeState>({
    laneEmissionAccumulators: [],
    particleBuffer,
    nextParticleBufferIndex: 0,
  });
  const debugStateRef = useRef(debug);

  function stopAnimationLoop() {
    if (animationFrameIdRef.current === null) return;

    cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = null;
  }

  useShortcuts({
    D: () => {
      setDebug((prev) => ({
        ...prev,
        enabled: !prev.enabled,
      }));
    },
  });

  useEffect(() => {
    debugStateRef.current = debug;
  }, [debug]);

  useEffect(() => {
    function draw(timestamp: number) {
      function requestNextDraw() {
        animationFrameIdRef.current = requestAnimationFrame(draw);
      }

      const stageElement = stageRef.current;
      const canvasElement = canvasRef.current;
      const frameTiming = frameTimingRef.current;
      const drawTokens = drawTokensRef.current;
      const particleRuntime = particleRuntimeRef.current;

      if (!stageElement || !canvasElement) {
        requestNextDraw();
        return;
      }

      const canvasContext = canvasElement.getContext("2d");

      if (!canvasContext) {
        requestNextDraw();
        return;
      }

      if (document.visibilityState !== "visible") {
        frameTiming.lastTimestamp = timestamp;
        requestNextDraw();
        return;
      }

      const stageWidth = stageElement.clientWidth;
      const stageHeight = stageElement.clientHeight;

      if (stageWidth <= 0 || stageHeight <= 0) {
        requestNextDraw();
        return;
      }

      const dpr = window.devicePixelRatio || 1;

      resizeAndClearCanvas({
        canvas: canvasElement,
        context: canvasContext,
        width: stageWidth,
        height: stageHeight,
        dpr,
      });

      const timeSeconds = timestamp / 1000;
      const lastFrameTimestamp = frameTiming.lastTimestamp ?? timestamp;
      const frameDeltaSeconds = (timestamp - lastFrameTimestamp) / 1000;
      const cappedDeltaSeconds = Math.min(
        frameDeltaSeconds,
        MAX_FRAME_DELTA_SECONDS
      );
      frameTiming.lastTimestamp = timestamp;

      updateDrawTokens({
        stage: stageElement,
        drawTokens,
        frameTiming,
        width: stageWidth,
        timeSeconds,
      });

      const intensity = getSignalIntensity(timeSeconds);
      const viewportWidth = window.innerWidth || stageWidth;

      const laneCount =
        viewportWidth <= 640
          ? MOBILE_LANE_COUNT
          : viewportWidth <= 960
            ? TABLET_LANE_COUNT
            : DESKTOP_LANE_COUNT;

      syncLaneAccumulatorCount(particleRuntime, laneCount);

      emitParticleStreams({
        particleRuntime,
        width: stageWidth,
        height: stageHeight,
        laneCount,
        timeSeconds,
        deltaSeconds: cappedDeltaSeconds,
        intensity,
      });

      const activeParticles = renderParticleStreams({
        context: canvasContext,
        particleRuntime,
        drawTokens,
        timeSeconds,
      });

      // Update debug text less often than animation frames
      if (
        debugStateRef.current.enabled &&
        timeSeconds >= frameTiming.nextDebugRefreshAt
      ) {
        const frameMs = frameDeltaSeconds * 1000;
        const fps = frameMs > 0 ? 1000 / frameMs : 0;
        const particleLoad = (activeParticles / PARTICLE_LIMIT) * 100;

        setDebug((prevDebug) => ({
          ...prevDebug,
          fps: formatPercent(fps, 1),
          frameMs: formatPercent(frameMs, 2),
          activeParticles,
          particleLoad: formatPercent(particleLoad, 1),
          laneCount,
        }));

        frameTiming.nextDebugRefreshAt =
          timeSeconds + DEBUG_REFRESH_INTERVAL_SECONDS;
      }

      requestNextDraw();
    }

    function setup() {
      animationFrameIdRef.current = requestAnimationFrame(draw);
    }

    setup();

    return () => {
      stopAnimationLoop();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={styles.stage}
      data-debug={debug.enabled}
      role="application"
      aria-label="Audio visualiser"
    >
      <div className={styles.baseline} aria-hidden="true" />
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <pre className={styles.debug} aria-hidden={!debug.enabled}>
        {[
          `fps: ${debug.fps}`,
          `frame: ${debug.frameMs}ms`,
          `lanes: ${debug.laneCount}`,
          `active: ${debug.activeParticles}/${PARTICLE_LIMIT}`,
          `load: ${debug.particleLoad}%`,
        ].join("\n")}
      </pre>
    </div>
  );
}
