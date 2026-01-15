type MinusProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function Minus({ size, width, height, ...props }: MinusProps) {
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
        d="M2.3 7.5C2.3 7.2 2.5 7 2.8 7H12.3C12.5 7 12.8 7.2 12.8 7.5C12.8 7.8 12.5 8 12.3 8H2.8C2.5 8 2.3 7.8 2.3 7.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
