type ExitFullscreenProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function ExitFullscreen({
  size,
  width,
  height,
  ...props
}: ExitFullscreenProps) {
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
        d="M5.5 2C5.8 2 6 2.2 6 2.5V5.5C6 5.8 5.8 6 5.5 6H2.5C2.2 6 2 5.8 2 5.5C2 5.2 2.2 5 2.5 5H5V2.5C5 2.2 5.2 2 5.5 2ZM9.5 2C9.8 2 10 2.2 10 2.5V5H12.5C12.8 5 13 5.2 13 5.5C13 5.8 12.8 6 12.5 6H9.5C9.2 6 9 5.8 9 5.5V2.5C9 2.2 9.2 2 9.5 2ZM2 9.5C2 9.2 2.2 9 2.5 9H5.5C5.8 9 6 9.2 6 9.5V12.5C6 12.8 5.8 13 5.5 13C5.2 13 5 12.8 5 12.5V10H2.5C2.2 10 2 9.8 2 9.5ZM9 9.5C9 9.2 9.2 9 9.5 9H12.5C12.8 9 13 9.2 13 9.5C13 9.8 12.8 10 12.5 10H10V12.5C10 12.8 9.8 13 9.5 13C9.2 13 9 12.8 9 12.5V9.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
