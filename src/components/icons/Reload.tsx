type ReloadProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function Reload({ size, width, height, ...props }: ReloadProps) {
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
        d="M1.8 7.5C1.8 4.7 4.1 1.8 7.5 1.8C10.3 1.8 11.7 3.9 12.2 5H10.5C10.2 5 10 5.2 10 5.5C10 5.8 10.2 6 10.5 6H13.5C13.8 6 14 5.8 14 5.5V2.5C14 2.2 13.8 2 13.5 2C13.2 2 13 2.2 13 2.5V4.3C12.3 3.1 10.7 0.8 7.5 0.8C3.4 0.8 0.8 4.2 0.8 7.5C0.8 10.8 3.4 14.1 7.5 14.1C9.4 14.1 11.1 13.4 12.2 12.2C12.8 11.6 13.3 10.8 13.6 10C13.7 9.8 13.6 9.5 13.4 9.4C13.1 9.3 12.8 9.4 12.7 9.7C12.4 10.3 12 11 11.5 11.5C10.5 12.5 9.2 13.2 7.5 13.2C4.1 13.2 1.8 10.3 1.8 7.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
