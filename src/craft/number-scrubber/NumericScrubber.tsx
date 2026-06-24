"use client";

import {
  Popover,
  type PopoverRootChangeEventDetails,
} from "@base-ui/react/popover";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type PointerEvent,
  TransitionEvent,
} from "react";

import Chevron from "../../components/icons/Chevron";
import PopupArrow from "../../components/icons/PopupArrow";
import { clamp, lerp } from "../../utils/math";

import styles from "./NumericScrubber.module.css";

const DEFAULT_VALUE = 28;

const TICK_WIDTH = 1.5;
const TICK_GAP = 7;
const TICK_STEP = TICK_WIDTH + TICK_GAP;
const TICK_COUNT = 11;
const TICK_OFFSET = Math.floor(TICK_COUNT / 2);

// controls for sensitivity (higher = more sensitive)
const WHEEL_SENSITIVITY = 0.12;
const DRAG_SENSITIVITY = 0.25;

// smoothing factor for drag velocity (1 = no smoothing)
const DRAG_VELOCITY_SMOOTHING = 0.5;

const STEP_DURATION_MS = 120;
const MAX_SHIFT_DURATION_MS = 240;

const MOMENTUM_DECAY_MS = 90;
const MOMENTUM_MIN_VELOCITY = 0.03;
const MAX_TICK_STEPS_PER_FRAME = 1;

const HOVER_CLOSE_DELAY_MS = 750;

const gesture = {
  start: () => document.body.classList.add("gesture-ew-resize"),
  end: () => document.body.classList.remove("gesture-ew-resize"),
};

interface StepQueue {
  pendingSteps: number;
  frameId: number | null;
}

interface StepQueueBatch {
  queue: StepQueue;
  maxStepsPerFrame: number;
}

interface DragSession {
  pointerId: number;
  hasMoved: boolean;
  lastClientX: number;
  lastTimestamp: number;
  accumulated: number;
  velocity: number;
}

interface DragInput {
  session: DragSession | null;
  queue: StepQueue;
}

interface WheelInput {
  accumulated: number;
  queue: StepQueue;
}

interface Momentum {
  frameId: number | null;
  velocity: number;
  lastFrameTime: number;
  accumulated: number;
}

interface TrackTransition {
  offsetSteps: number;
  isTrackAnimating: boolean;
  duration: number;
}

interface ScrubberStepButtonProps {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
}

interface ScrubberTrackProps {
  value: number;
  trackTransition: TrackTransition;
  setTrackViewport: (node: HTMLDivElement | null) => void;
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLElement>) => void;
  onTransitionEnd: (event: TransitionEvent<HTMLDivElement>) => void;
}

export default function NumericScrubber() {
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [trackTransition, setTrackTransition] = useState<TrackTransition>({
    offsetSteps: 0,
    isTrackAnimating: false,
    duration: 0,
  });
  const [trackViewport, setTrackViewport] = useState<HTMLDivElement | null>(
    null
  );

  const valueRef = useRef(DEFAULT_VALUE);
  const trackFrameRef = useRef<number | null>(null);

  const momentumRef = useRef<Momentum>({
    frameId: null,
    velocity: 0,
    lastFrameTime: 0,
    accumulated: 0,
  });

  const wheelInputRef = useRef<WheelInput>({
    accumulated: 0,
    queue: { pendingSteps: 0, frameId: null },
  });

  const dragInputRef = useRef<DragInput>({
    session: null,
    queue: { pendingSteps: 0, frameId: null },
  });

  const hasInteractedRef = useRef(false);

  const handleNativeWheel = useEffectEvent((event: WheelEvent) => {
    // Prevent browser back/forward swipes from hijacking the scrubber gesture.
    if (event.cancelable) {
      event.preventDefault();
    }

    stopMomentum();

    hasInteractedRef.current = true;

    // Use the dominant axis so diagonal wheel gestures still feel deliberate.
    const primaryDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    const adjustedDelta = primaryDelta * WHEEL_SENSITIVITY;
    const wheelInput = wheelInputRef.current;

    // Buffer fractional wheel movement until it crosses a full tick.
    wheelInput.accumulated += adjustedDelta;

    const steps = Math.trunc(wheelInput.accumulated / TICK_STEP);

    if (steps === 0) {
      return;
    }

    wheelInput.accumulated -= steps * TICK_STEP;
    wheelInput.queue.pendingSteps += steps;

    processStepQueue({
      queue: wheelInput.queue,
      maxStepsPerFrame: MAX_TICK_STEPS_PER_FRAME,
    });
  });

  useEffect(() => {
    if (!trackViewport) {
      return;
    }

    trackViewport.addEventListener("wheel", handleNativeWheel, {
      passive: false,
    });

    return () => {
      trackViewport.removeEventListener("wheel", handleNativeWheel);
    };
  }, [trackViewport]);

  useEffect(() => {
    const dragInput = dragInputRef.current;
    const wheelInput = wheelInputRef.current;

    return () => {
      if (trackFrameRef.current !== null) {
        cancelAnimationFrame(trackFrameRef.current);
      }

      cancelStepQueue(wheelInput.queue);
      cancelStepQueue(dragInput.queue);
      cancelMomentum();

      gesture.end();
    };
  }, []);

  function updateValue(nextValue: number) {
    const currentValue = valueRef.current;

    if (nextValue === currentValue) {
      return;
    }

    // Keep hover/focus close from overriding explicit scrubber input.
    hasInteractedRef.current = true;

    const delta = nextValue - currentValue;

    if (trackFrameRef.current !== null) {
      cancelAnimationFrame(trackFrameRef.current);
      trackFrameRef.current = null;
    }

    valueRef.current = nextValue;

    setValue(nextValue);

    setTrackTransition({
      duration: Math.min(
        MAX_SHIFT_DURATION_MS,
        STEP_DURATION_MS * Math.abs(delta)
      ),
      isTrackAnimating: false,
      offsetSteps: delta,
    });

    trackFrameRef.current = requestAnimationFrame(() => {
      setTrackTransition((prevState) => ({
        ...prevState,
        isTrackAnimating: true,
        offsetSteps: 0,
      }));
    });
  }

  function cancelMomentum() {
    const momentum = momentumRef.current;

    if (momentum.frameId !== null) {
      cancelAnimationFrame(momentum.frameId);
    }

    momentum.frameId = null;
    momentum.velocity = 0;
    momentum.lastFrameTime = 0;
    momentum.accumulated = 0;
  }

  function stopMomentum() {
    cancelMomentum();
  }

  function cancelStepQueue(queue: StepQueue) {
    if (queue.frameId !== null) {
      cancelAnimationFrame(queue.frameId);
    }

    queue.frameId = null;
    queue.pendingSteps = 0;
  }

  function processStepQueue({ queue, maxStepsPerFrame }: StepQueueBatch) {
    if (queue.frameId !== null) {
      return;
    }

    function stepFrame() {
      const pendingSteps = queue.pendingSteps;

      if (pendingSteps === 0) {
        queue.frameId = null;
        return;
      }

      // Apply small per-frame steps so tick highlights stay legible.
      const step =
        Math.sign(pendingSteps) *
        clamp(Math.abs(pendingSteps), 0, maxStepsPerFrame);

      queue.pendingSteps -= step;

      updateValue(valueRef.current + step);

      queue.frameId = requestAnimationFrame(stepFrame);
    }

    queue.frameId = requestAnimationFrame(stepFrame);
  }

  function handleTrackTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (
      event.propertyName !== "transform" ||
      !trackTransition.isTrackAnimating
    ) {
      return;
    }

    setTrackTransition((prevState) => ({
      ...prevState,
      isTrackAnimating: false,
      offsetSteps: 0,
    }));
  }

  function startMomentum(initialVelocity: number) {
    const momentum = momentumRef.current;

    momentum.velocity = initialVelocity;
    momentum.lastFrameTime = 0;
    momentum.accumulated = 0;

    if (momentum.frameId !== null) {
      cancelAnimationFrame(momentum.frameId);
    }

    function step(time: number) {
      if (momentum.lastFrameTime === 0) {
        momentum.lastFrameTime = time;
      }

      const deltaTime = Math.max(1, time - momentum.lastFrameTime);
      momentum.lastFrameTime = time;

      const deltaX = momentum.velocity * deltaTime;
      momentum.accumulated += deltaX;

      const steps = Math.trunc(momentum.accumulated / TICK_STEP);

      if (steps !== 0) {
        momentum.accumulated -= steps * TICK_STEP;
        updateValue(valueRef.current + steps);
      }

      // Use time-based decay so momentum feels consistent across frame rates.
      const decay = Math.exp(-deltaTime / MOMENTUM_DECAY_MS);
      momentum.velocity *= decay;

      if (Math.abs(momentum.velocity) < MOMENTUM_MIN_VELOCITY) {
        // Stop once motion is barely noticeable to avoid micro-steps.
        stopMomentum();
        return;
      }

      momentum.frameId = requestAnimationFrame(step);
    }

    momentum.frameId = requestAnimationFrame(step);
  }

  function endDrag(event: PointerEvent<HTMLElement>, dragSession: DragSession) {
    dragInputRef.current.session = null;

    if (event.pointerType !== "touch") {
      gesture.end();
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    // Only pointerup continues into momentum; cancel ends immediately.
    if (event.type === "pointerup" && dragSession.hasMoved) {
      startMomentum(dragSession.velocity);
      return;
    }

    stopMomentum();
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) {
      return;
    }

    // Ignore touch pointers while closed so page scrolling does not grab focus.
    if (event.pointerType === "touch" && !isPopoverOpen) {
      return;
    }

    stopMomentum();

    event.currentTarget.setPointerCapture(event.pointerId);

    if (event.pointerType !== "touch") {
      gesture.start();
    }

    hasInteractedRef.current = true;

    dragInputRef.current.session = {
      pointerId: event.pointerId,
      hasMoved: false,
      lastClientX: event.clientX,
      lastTimestamp: event.timeStamp,
      accumulated: 0,
      velocity: 0,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const dragSession = dragInputRef.current.session;

    if (!dragSession || dragSession.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragSession.lastClientX;
    const deltaTime = Math.max(1, event.timeStamp - dragSession.lastTimestamp);
    const instantVelocity = deltaX / deltaTime;

    // Smooth velocity so release momentum feels steady instead of jittery.
    dragSession.velocity = lerp(
      dragSession.velocity,
      instantVelocity,
      DRAG_VELOCITY_SMOOTHING
    );
    dragSession.lastClientX = event.clientX;
    dragSession.lastTimestamp = event.timeStamp;

    // Buffer fractional drag movement until it crosses a full tick.
    dragSession.accumulated += deltaX * DRAG_SENSITIVITY;

    const steps = Math.trunc(dragSession.accumulated / TICK_STEP);

    if (steps === 0) {
      return;
    }

    dragSession.hasMoved = true;
    dragSession.accumulated -= steps * TICK_STEP;
    dragInputRef.current.queue.pendingSteps += steps;

    processStepQueue({
      queue: dragInputRef.current.queue,
      maxStepsPerFrame: MAX_TICK_STEPS_PER_FRAME,
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    const dragSession = dragInputRef.current.session;

    if (!dragSession || dragSession.pointerId !== event.pointerId) {
      return;
    }

    endDrag(event, dragSession);
  }

  function handlePointerCancel(event: PointerEvent<HTMLElement>) {
    const dragSession = dragInputRef.current.session;

    if (!dragSession || dragSession.pointerId !== event.pointerId) {
      return;
    }

    endDrag(event, dragSession);
  }

  function handlePopoverOpenChange(
    open: boolean,
    eventDetails: PopoverRootChangeEventDetails
  ) {
    if (open) {
      hasInteractedRef.current = false;
      setIsPopoverOpen(true);
      return;
    }

    if (dragInputRef.current.session) {
      return;
    }

    // After interaction, avoid collapsing while pointer/focus is still nearby.
    if (
      hasInteractedRef.current &&
      (eventDetails.reason === "trigger-hover" ||
        eventDetails.reason === "focus-out")
    ) {
      return;
    }

    setIsPopoverOpen(false);
  }

  return (
    <p>
      The perfect temperature is{" "}
      <Popover.Root open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
        <Popover.Trigger
          openOnHover
          closeDelay={HOVER_CLOSE_DELAY_MS}
          className={styles.scrubberPopoverTrigger}
          aria-label={`${value} degrees Celsius`}
        >
          {value}
        </Popover.Trigger>
        <span aria-hidden>°C</span>
        <Popover.Portal>
          <Popover.Positioner side="top" sideOffset={6}>
            <Popover.Popup
              className={styles.scrubberPopover}
              onContextMenu={(event) => event.preventDefault()}
            >
              <Popover.Arrow className={styles.scrubberPopoverArrow}>
                <PopupArrow
                  fillClassName={styles.scrubberArrowFill}
                  outerStrokeClassName={styles.scrubberArrowOuterStroke}
                  innerStrokeClassName={styles.scrubberArrowInnerStroke}
                />
              </Popover.Arrow>

              <div className={styles.scrubberControls}>
                <ScrubberStepButton
                  direction="left"
                  label="Decrease value"
                  onClick={() => updateValue(valueRef.current - 1)}
                />

                <ScrubberTrack
                  value={value}
                  trackTransition={trackTransition}
                  setTrackViewport={setTrackViewport}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  onTransitionEnd={handleTrackTransitionEnd}
                />

                <ScrubberStepButton
                  direction="right"
                  label="Increase value"
                  onClick={() => updateValue(valueRef.current + 1)}
                />
              </div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </p>
  );
}

function ScrubberStepButton({
  direction,
  label,
  onClick,
}: ScrubberStepButtonProps) {
  return (
    <button
      className={styles.scrubberStepButton}
      onClick={onClick}
      aria-label={label}
      type="button"
    >
      <Chevron direction={direction} size={18} aria-hidden />
    </button>
  );
}

function ScrubberTrack({
  value,
  trackTransition,
  setTrackViewport,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onTransitionEnd,
}: ScrubberTrackProps) {
  return (
    <div
      ref={setTrackViewport}
      className={styles.scrubberTrackViewport}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div
        className={styles.scrubberTrack}
        data-animating={trackTransition.isTrackAnimating}
        style={{
          "--tick-width": `${TICK_WIDTH}px`,
          "--tick-gap": `${TICK_GAP}px`,
          "--track-offset": `${trackTransition.offsetSteps * TICK_STEP}px`,
          "--track-duration": `${trackTransition.duration}ms`,
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {Array.from({ length: TICK_COUNT }, (_tick, index) => {
          const tick = value + index - TICK_OFFSET;

          return (
            <div
              key={tick}
              className={styles.scrubberTick}
              data-active={tick === value}
            />
          );
        })}
      </div>
    </div>
  );
}
