type TrashProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function Trash({ size, width, height, ...props }: TrashProps) {
  const resolvedWidth = width ?? size ?? 20;
  const resolvedHeight = height ?? size ?? 20;

  return (
    <svg
      width={resolvedWidth}
      height={resolvedHeight}
      viewBox="0 0 15 15"
      fill="none"
      {...props}
    >
      <path
        d="M5.5 1C5.2 1 5 1.2 5 1.5C5 1.8 5.2 2 5.5 2H9.5C9.8 2 10 1.8 10 1.5C10 1.2 9.8 1 9.5 1H5.5ZM3 3.5C3 3.2 3.2 3 3.5 3H5H10H11.5C11.8 3 12 3.2 12 3.5C12 3.8 11.8 4 11.5 4H11V12C11 12.6 10.6 13 10 13H5C4.4 13 4 12.6 4 12V4L3.5 4C3.2 4 3 3.8 3 3.5ZM5 4H10V12H5V4Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
