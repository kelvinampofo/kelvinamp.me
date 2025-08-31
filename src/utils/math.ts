/** clamps a number to the given range. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** interpolates linearly between two numbers. */
export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}
