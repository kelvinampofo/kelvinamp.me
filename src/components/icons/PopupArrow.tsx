type PopupArrowProps = React.SVGProps<SVGSVGElement> & {
  fillClassName?: string;
  outerStrokeClassName?: string;
  innerStrokeClassName?: string;
};

export default function PopupArrow({
  width = 20,
  height = 10,
  fillClassName,
  outerStrokeClassName,
  innerStrokeClassName,
  ...props
}: PopupArrowProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 10"
      fill="none"
      {...props}
    >
      <path
        d="M9.7 2.6L4.8 7C4.1 7.6 3.1 8 2.1 8H0V10H20V8H18.5C17.5 8 16.6 7.6 15.9 7L11 2.6C10.6 2.3 10 2.3 9.7 2.6Z"
        className={fillClassName}
      />
      <path
        d="M9 1.9C9.8 1.2 10.9 1.2 11.7 1.9L16.5 6.2C17.1 6.7 17.8 7 18.5 7L15.9 7L11 2.6C10.6 2.3 10 2.3 9.7 2.6L4.8 7L2.1 7C2.9 7 3.6 6.7 4.1 6.2L9 1.9Z"
        className={outerStrokeClassName}
      />
      <path
        d="M10.3 3.3L5.5 7.7C4.6 8.5 3.4 9 2.1 9H0V8H2.1C3.1 8 4.1 7.6 4.8 7L9.7 2.6C10 2.3 10.6 2.3 11 2.6L15.9 7C16.6 7.6 17.5 8 18.5 8H20V9H18.5C17.3 9 16.1 8.5 15.2 7.7L10.3 3.3Z"
        className={innerStrokeClassName}
      />
    </svg>
  );
}
