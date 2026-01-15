type EnterFullscreenProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function EnterFullscreen({
  size,
  width,
  height,
  ...props
}: EnterFullscreenProps) {
  const resolvedWidth = width ?? size ?? 15;
  const resolvedHeight = height ?? size ?? 15;

  return (
    <svg
      width={resolvedWidth}
      height={resolvedHeight}
      viewBox="0 0 15 15"
      fill="none"
      {...props}
    >
      <path
        d="M2 2.5C2 2.2 2.2 2 2.5 2H5.5C5.8 2 6 2.2 6 2.5C6 2.8 5.8 3 5.5 3H3V5.5C3 5.8 2.8 6 2.5 6C2.2 6 2 5.8 2 5.5V2.5ZM9 2.5C9 2.2 9.2 2 9.5 2H12.5C12.8 2 13 2.2 13 2.5V5.5C13 5.8 12.8 6 12.5 6C12.2 6 12 5.8 12 5.5V3H9.5C9.2 3 9 2.8 9 2.5ZM2.5 9C2.8 9 3 9.2 3 9.5V12H5.5C5.8 12 6 12.2 6 12.5C6 12.8 5.8 13 5.5 13H2.5C2.2 13 2 12.8 2 12.5V9.5C2 9.2 2.2 9 2.5 9ZM12.5 9C12.8 9 13 9.2 13 9.5V12.5C13 12.8 12.8 13 12.5 13H9.5C9.2 13 9 12.8 9 12.5C9 12.2 9.2 12 9.5 12H12V9.5C12 9.2 12.2 9 12.5 9Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
