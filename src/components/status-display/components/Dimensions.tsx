"use client";

import { useWindowDimension } from "../../../hooks/useWindowDimension";

export default function DimensionsView() {
  const { width, height } = useWindowDimension({ debounceDelay: 100 });

  return (
    <span style={{ whiteSpace: "pre" }}>{`w: ${width}  h: ${height}`}</span>
  );
}
