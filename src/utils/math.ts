/** clamps a number to the given range. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** interpolates linearly between two numbers for smooth animations. */
export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}
