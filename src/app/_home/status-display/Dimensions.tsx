"use client";

interface DimensionsProps {
  width: number | undefined;
  height: number | undefined;
}

export default function Dimensions({ width, height }: DimensionsProps) {
  return <span>{`${width}x${height}`}</span>;
}
