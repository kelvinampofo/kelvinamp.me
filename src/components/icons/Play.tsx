type PlayProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function Play({ size, width, height, ...props }: PlayProps) {
  const resolvedWidth = width ?? size ?? 16;
  const resolvedHeight = height ?? size ?? 16;

  return (
    <svg
      width={resolvedWidth}
      height={resolvedHeight}
      viewBox="0 0 15 15"
      fill="none"
      {...props}
    >
      <path
        d="M3.2 2.3C3.4 2.2 3.6 2.2 3.7 2.3L12.7 7.1C12.9 7.1 13 7.3 13 7.5C13 7.7 12.9 7.9 12.7 7.9L3.7 12.7C3.6 12.8 3.4 12.8 3.2 12.7C3.1 12.6 3 12.4 3 12.3V2.8C3 2.6 3.1 2.4 3.2 2.3ZM4 3.6V11.4L11.4 7.5L4 3.6Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
