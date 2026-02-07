"use client";

import clsx from "clsx";
import Image from "next/image";
import { type PointerEvent, useEffect, useRef, useState } from "react";

import flowers from "../../../../../public/assets/images/reveal/flowers.webp";
import flutedGlassFlowers from "../../../../../public/assets/images/reveal/fluted-glass-flowers.png";
import useShortcuts from "../../../../hooks/useShortcuts";
import { clamp, lerp } from "../../../../utils/math";

import styles from "./Reveal.module.css";

const REVEAL_MIN = 0;
const REVEAL_MAX = 100;
const REVEAL_DEFAULT = 30;
const REVEAL_IMAGE_WIDTH = 1600;
const REVEAL_IMAGE_HEIGHT = 1200;
const REVEAL_SMOOTHING = 0.12;
const REVEAL_SNAP_THRESHOLD = 0.05;

function formatPercent(value: number) {
  return Number(value.toFixed(2));
}

export default function Reveal() {
  const [debug, setDebug] = useState({
    enabled: false,
    cursor: { x: 0, y: 0 },
    target: REVEAL_DEFAULT,
    current: REVEAL_DEFAULT,
  });

  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pointerRafRef = useRef<number | null>(null);
  const revealRafRef = useRef<number | null>(null);
  const targetRevealRef = useRef(REVEAL_DEFAULT);
  const currentRevealRef = useRef(REVEAL_DEFAULT);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const debugRef = useRef(debug);

  useShortcuts({
    D: () =>
      setDebug((prev) => {
        const enabled = !prev.enabled;
        const cursor = lastPointerRef.current ?? prev.cursor;

        return {
          ...prev,
          enabled,
          cursor,
          target: formatPercent(targetRevealRef.current),
          current: formatPercent(currentRevealRef.current),
        };
      }),
  });

  useEffect(() => {
    debugRef.current = debug;
  }, [debug]);

  useEffect(() => {
    return () => {
      if (revealRafRef.current !== null) {
        cancelAnimationFrame(revealRafRef.current);
      }
    };
  }, []);

  function setRevealValue(next: number) {
    currentRevealRef.current = next;
    rootRef.current?.style.setProperty("--reveal", `${next}%`);
  }

  function animateReveal() {
    const current = currentRevealRef.current;
    const target = targetRevealRef.current;
    const lerped = lerp(current, target, REVEAL_SMOOTHING);

    // only update if there's a meaningful difference
    if (Math.abs(target - lerped) < REVEAL_SNAP_THRESHOLD) {
      setRevealValue(target);

      revealRafRef.current = null;

      return;
    }

    setRevealValue(lerped);

    if (debugRef.current.enabled) {
      setDebug((prev) => ({
        ...prev,
        target: formatPercent(target),
        current: formatPercent(lerped),
      }));
    }

    revealRafRef.current = requestAnimationFrame(animateReveal);
  }

  function requestRevealFrame() {
    if (revealRafRef.current !== null) return;

    revealRafRef.current = requestAnimationFrame(animateReveal);
  }

  function updateTargetFromPointer(clientX: number, clientY: number) {
    const stage = stageRef.current;

    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const pointerPercent = ((clientX - rect.left) / rect.width) * REVEAL_MAX;
    const nextReveal = clamp(pointerPercent, REVEAL_MIN, REVEAL_MAX);

    targetRevealRef.current = nextReveal;

    if (debugRef.current.enabled) {
      setDebug((prev) => ({
        ...prev,
        cursor: { x: clientX, y: clientY },
        target: formatPercent(nextReveal),
      }));
    }

    requestRevealFrame();
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    stageRef.current?.setPointerCapture(event.pointerId);
    handlePointerMove(event);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (pointerRafRef.current !== null) {
      cancelAnimationFrame(pointerRafRef.current);
    }

    const { clientX, clientY } = event;

    lastPointerRef.current = { x: clientX, y: clientY };

    pointerRafRef.current = requestAnimationFrame(() => {
      updateTargetFromPointer(clientX, clientY);
      pointerRafRef.current = null;
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    stageRef.current?.releasePointerCapture(event.pointerId);
  }

  function handlePointerCancel(event: PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current;

    if (stage?.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      ref={rootRef}
      className={styles.container}
      data-debug={debug.enabled}
      style={{ "--reveal": `${REVEAL_DEFAULT}%` }}
    >
      <div
        ref={stageRef}
        className={styles.stage}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
      >
        <Image
          className={styles.layerImage}
          src={flowers}
          alt="Yellow wildflowers."
          width={REVEAL_IMAGE_WIDTH}
          height={REVEAL_IMAGE_HEIGHT}
          sizes="(max-width: 900px) 100vw, 800px"
          placeholder="blur"
        />
        <Image
          className={clsx(styles.layerImage, styles.revealImage)}
          src={flutedGlassFlowers}
          alt="Fluted glass distortion of yellow wildflowers."
          aria-hidden="true"
          width={REVEAL_IMAGE_WIDTH}
          height={REVEAL_IMAGE_HEIGHT}
          sizes="(max-width: 900px) 100vw, 800px"
          placeholder="blur"
        />
        <pre
          className={styles.debug}
          style={{
            "--cursor-x": `${debug.cursor.x}px`,
            "--cursor-y": `${debug.cursor.y}px`,
          }}
        >
          {JSON.stringify(
            {
              current: debug.current,
              target: debug.target,
              reveal: debug.current,
              factor: REVEAL_SMOOTHING,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
