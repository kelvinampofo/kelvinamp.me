import { clamp, lerp } from "./math";

const THEME_META_NAME = "theme-color";

function ensureThemeMeta() {
  let element: HTMLMetaElement | null = document.querySelector(
    `meta[name="${THEME_META_NAME}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.name = THEME_META_NAME;
    element.content = getComputedStyle(document.body).backgroundColor;
    document.head.appendChild(element);
  }

  return element;
}

function getCurrentThemeColor() {
  const element: HTMLMetaElement | null = document.querySelector(
    `meta[name="${THEME_META_NAME}"]`
  );

  return element?.content || getComputedStyle(document.body).backgroundColor;
}

function parseRgb(input: string) {
  const match = input.match(
    /rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+|\.\d+))?\s*\)/i
  );

  if (!match) return null;

  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);

    return [r, g, b];
  }

  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);

    return [r, g, b];
  }

  return null;
}

function rgbToHex([r, g, b]: [number, number, number]) {
  function toHex(channel: number) {
    return clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0");
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function parseColorToRgb(color: string) {
  return (
    hexToRgb(color) ||
    parseRgb(color) ||
    // fallback to resolving via browser then parse (handles named colors, hsl, etc.)
    (typeof document !== "undefined"
      ? parseRgb(
          getComputedStyle(
            Object.assign(document.createElement("div"), { style: { color } })
          ).color
        )
      : null) || [0, 0, 0]
  );
}

/** animates the `<meta name="theme-color">` towards `toColor` over `duration` ms (default 250); returns a cancel function and no-ops on the server. */
export function animateThemeColor(toColor: string, duration = 250) {
  const isClientUnavailable =
    typeof document === "undefined" || typeof window === "undefined";

  if (isClientUnavailable) {
    return () => {};
  }

  const meta = ensureThemeMeta();
  const from = parseColorToRgb(getCurrentThemeColor());
  const to = parseColorToRgb(toColor);

  let animationFrameId = 0;

  const start = performance.now();
  function tick() {
    const now = performance.now();
    const progress = clamp((now - start) / duration, 0, 1);

    // cosine ease-in-out for a nicer feel
    const easedProgress = 0.5 - 0.5 * Math.cos(Math.PI * progress);

    const r = lerp(from[0], to[0], easedProgress);
    const g = lerp(from[1], to[1], easedProgress);
    const b = lerp(from[2], to[2], easedProgress);

    meta.content = rgbToHex([r, g, b]);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(tick);
    }
  }

  animationFrameId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(animationFrameId);
}
