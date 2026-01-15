type ArrowTopLeftProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function ArrowTopLeft({
  size,
  width,
  height,
  ...props
}: ArrowTopLeftProps) {
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
        fill="currentColor"
        d="M11.4 11.4a.5.5 0 0 0 0-.7L4.7 4H9a.5.5 0 0 0 0-1H3.5a.5.5 0 0 0-.5.5V9a.5.5 0 0 0 1 0V4.7l6.6 6.6a.5.5 0 0 0 .7 0Z"
      />
    </svg>
  );
}
