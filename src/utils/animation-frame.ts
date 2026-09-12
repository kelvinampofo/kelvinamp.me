/** Runs the callback after the next paint, returning a cleanup that cancels it. */
export function afterNextPaint(callback: () => void) {
  const controller = new AbortController();

  // the first frame paints the hidden state and the second starts the animation
  requestAnimationFrame(() => {
    if (controller.signal.aborted) return;

    requestAnimationFrame(() => {
      if (!controller.signal.aborted) callback();
    });
  });

  return () => controller.abort();
}
