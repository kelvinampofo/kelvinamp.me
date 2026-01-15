interface ChevronProps extends React.SVGProps<SVGSVGElement> {
  direction?: "left" | "right";
  size?: number;
}

const paths = {
  right:
    "M6.2 3.1C6.4 2.9 6.7 3 6.9 3.2L10.6 7.2C10.8 7.4 10.8 7.6 10.6 7.8L6.9 11.8C6.7 12 6.4 12.1 6.2 11.9C6 11.7 5.9 11.4 6.1 11.2L9.6 7.5L6.1 3.8C5.9 3.6 6 3.3 6.2 3.1Z",
  left: "M8.8 3.1C9 3.3 9.1 3.6 8.9 3.8L5.4 7.5L8.9 11.2C9.1 11.4 9 11.7 8.8 11.9C8.6 12.1 8.3 12 8.1 11.8L4.4 7.8C4.2 7.6 4.2 7.4 4.4 7.2L8.1 3.2C8.3 3 8.6 2.9 8.8 3.1Z",
};

export default function Chevron({
  direction = "right",
  size,
  width,
  height,
  ...props
}: ChevronProps) {
  const resolvedWidth = width ?? size ?? 20;
  const resolvedHeight = height ?? size ?? 20;

  return (
    <svg
      width={resolvedWidth}
      height={resolvedHeight}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d={direction === "left" ? paths.left : paths.right}
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
