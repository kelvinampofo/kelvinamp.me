export const THEME_META_NAME = "theme-color";

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
    /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i
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
  const toHex = (channel: number) =>
    Math.max(0, Math.min(255, Math.round(channel)))
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function parseColorToRgb(color: string) {
  return (
    hexToRgb(color) ||
    parseRgb(color) ||
    // fallback: let the browser resolve it then parse
    (typeof document !== "undefined"
      ? parseRgb(
          getComputedStyle(
            Object.assign(document.createElement("div"), { style: { color } })
          ).color
        )
      : null) || [0, 0, 0]
  );
}

// Animates the theme-color to `toColor` over `duration` ms. Returns a cancel function.
export function animateThemeColor(toColor: string, duration = 200) {
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
  const tick = () => {
    const now = performance.now();
    const progress = Math.min(1, (now - start) / duration);

    // cosine ease-in-out for a nicer feel
    const easedProgress = 0.5 - 0.5 * Math.cos(Math.PI * progress);

    const r = from[0] + (to[0] - from[0]) * easedProgress;
    const g = from[1] + (to[1] - from[1]) * easedProgress;
    const b = from[2] + (to[2] - from[2]) * easedProgress;

    meta.content = rgbToHex([r, g, b]);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(tick);
    }
  };

  animationFrameId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(animationFrameId);
}
