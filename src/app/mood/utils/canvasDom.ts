type WorldBounds = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

function parseTranslateFromTransform(transform: string) {
  const translate3dRegex = /translate3d\(([-0-9.]+)px\s*,\s*([-0-9.]+)px/i;
  const translate2dRegex = /translate\(([-0-9.]+)px\s*,\s*([-0-9.]+)px/i;

  const match3d = transform.match(translate3dRegex);
  if (match3d) return { x: parseFloat(match3d[1]), y: parseFloat(match3d[2]) };

  const match2d = transform.match(translate2dRegex);
  if (match2d) return { x: parseFloat(match2d[1]), y: parseFloat(match2d[2]) };

  return { x: 0, y: 0 };
}

export function elementsBoundingBox(root: HTMLElement) {
  const nodes = root.querySelectorAll('[data-element="true"]');
  if (!nodes.length) return undefined;

  const initial: WorldBounds = {
    minX: Number.POSITIVE_INFINITY,
    minY: Number.POSITIVE_INFINITY,
    maxX: Number.NEGATIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY,
  };

  const bounds = Array.from(nodes).reduce((acc, node) => {
    const element = node as HTMLElement;
    const { x, y } = parseTranslateFromTransform(element.style.transform || "");
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    if (Number.isFinite(width) && Number.isFinite(height)) {
      return {
        minX: Math.min(acc.minX, x),
        minY: Math.min(acc.minY, y),
        maxX: Math.max(acc.maxX, x + width),
        maxY: Math.max(acc.maxY, y + height),
      };
    }

    return acc;
  }, initial);

  if (
    bounds.minX === Number.POSITIVE_INFINITY ||
    bounds.minY === Number.POSITIVE_INFINITY ||
    bounds.maxX === Number.NEGATIVE_INFINITY ||
    bounds.maxY === Number.NEGATIVE_INFINITY
  ) {
    return undefined;
  }

  return bounds;
}

export function centerOfBounds(bounds: WorldBounds) {
  return {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2,
  };
}
