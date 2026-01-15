type PlusProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function Plus({ size, width, height, ...props }: PlusProps) {
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
        d="M8 2.8C8 2.5 7.8 2.3 7.5 2.3C7.2 2.3 7 2.5 7 2.8V7H2.8C2.5 7 2.3 7.2 2.3 7.5C2.3 7.8 2.5 8 2.8 8H7V12.3C7 12.5 7.2 12.8 7.5 12.8C7.8 12.8 8 12.5 8 12.3V8H12.3C12.5 8 12.8 7.8 12.8 7.5C12.8 7.2 12.5 7 12.3 7H8V2.8Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
