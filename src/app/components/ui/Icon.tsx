type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-top-left'
  | 'link'
  | 'chevron-left'
  | 'chevron-right'
  | 'rocket'
  | 'trash'
  | 'play';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

export function Icon({
  className,
  width = 15,
  height = 15,
  name,
  ariaLabel,
  ariaHidden = true,
  ...rest
}: IconProps) {
  switch (name) {
    case 'arrow-left':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'Arrow left icon'}
          aria-hidden={ariaHidden}
          fill="none"
          viewBox="0 0 15 15"
          {...rest}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M6.854 3.146a.5.5 0 0 1 0 .708L3.707 7H12.5a.5.5 0 0 1 0 1H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'Arrow right icon'}
          aria-hidden={ariaHidden}
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8.146 3.146a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L11.293 8H2.5a.5.5 0 0 1 0-1h8.793L8.146 3.854a.5.5 0 0 1 0-.708Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'arrow-top-left':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'Arrow top left icon'}
          aria-hidden={ariaHidden}
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            d="M11.354 11.354a.5.5 0 0 0 0-.707L4.707 4H9a.5.5 0 0 0 0-1H3.5a.5.5 0 0 0-.5.5V9a.5.5 0 0 0 1 0V4.707l6.646 6.647a.5.5 0 0 0 .708 0Z"
          />
        </svg>
      );
    case 'link':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'Link icon'}
          aria-hidden={ariaHidden}
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            d="M8.512 3.005c.676-.46 1.531-.468 2.167-.05.144.094.298.244.71.656.412.412.562.566.657.71.417.636.408 1.49-.051 2.167-.105.155-.267.32-.694.747l-.62.619a.5.5 0 0 0 .708.707l.619-.619.043-.043c.37-.37.606-.606.771-.849.675-.994.71-2.287.06-3.278-.159-.241-.39-.472-.741-.823l-.045-.045-.044-.045c-.352-.351-.583-.582-.824-.74-.99-.65-2.284-.616-3.278.06-.243.164-.48.4-.85.77l-.042.043-.619.62a.5.5 0 1 0 .707.706l.62-.618c.426-.427.592-.59.746-.695ZM4.318 7.147a.5.5 0 0 0-.707-.707l-.619.618-.043.043c-.37.37-.606.606-.771.85-.675.993-.71 2.287-.06 3.277.159.242.39.473.741.824l.045.045.044.044c.352.351.583.583.824.741.99.65 2.284.616 3.278-.06.243-.165.48-.401.849-.771l.043-.043.619-.619a.5.5 0 1 0-.708-.707l-.618.619c-.427.427-.593.59-.747.694-.676.46-1.532.469-2.167.051-.144-.094-.298-.245-.71-.657-.412-.412-.562-.566-.657-.71-.417-.635-.408-1.49.051-2.167.105-.154.267-.32.694-.747l.619-.618Zm5.304-1.061a.5.5 0 0 0-.707-.708L5.379 8.914a.5.5 0 1 0 .707.707l3.536-3.535Z"
          />
        </svg>
      );
    case 'chevron-left':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'Chevron left Icon'}
          aria-hidden={ariaHidden}
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            d="M8.842 3.135a.5.5 0 0 1 .023.707L5.435 7.5l3.43 3.658a.5.5 0 0 1-.73.684l-3.75-4a.5.5 0 0 1 0-.684l3.75-4a.5.5 0 0 1 .707-.023Z"
          />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg
          data-name="chevron-right"
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'Chevron rigt Icon'}
          aria-hidden={ariaHidden}
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            d="M6.158 3.135a.5.5 0 0 1 .707.023l3.75 4a.5.5 0 0 1 0 .684l-3.75 4a.5.5 0 1 1-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 0 1 .023-.707Z"
          />
        </svg>
      );
    case 'rocket':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'Rocket icon'}
          aria-hidden={ariaHidden}
          fill="none"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m6.854 3.854.8-.8c.644-.645 1.775-1.092 2.898-1.253a5.342 5.342 0 0 1 1.504-.02c.443.066.714.196.84.323.127.126.257.397.323.84.064.427.059.95-.02 1.504-.16 1.123-.608 2.254-1.253 2.898L7.5 11.793l-1.146-1.146a.5.5 0 1 0-.708.707l1.5 1.5a.5.5 0 0 0 .708 0l.547-.548 1.17 1.951a.5.5 0 0 0 .783.097l2-2a.5.5 0 0 0 .141-.425l-.465-3.252.624-.623c.855-.856 1.358-2.225 1.535-3.465.09-.627.1-1.25.019-1.794-.08-.528-.256-1.05-.604-1.399-.349-.348-.871-.525-1.4-.604a6.333 6.333 0 0 0-1.793.02C9.17.987 7.8 1.49 6.946 2.345l-.623.624-3.252-.465a.5.5 0 0 0-.425.141l-2 2a.5.5 0 0 0 .097.783l1.95 1.17-.547.547a.5.5 0 0 0 0 .708l1.5 1.5a.5.5 0 1 0 .708-.708L3.207 7.5l.647-.646 3-3Zm3.245 9.34-.97-1.617 2.017-2.016.324 2.262-1.37 1.37ZM3.423 5.87l2.016-2.016-2.262-.324-1.37 1.37 1.616.97Zm-1.07 4.484a.5.5 0 1 0-.707-.708l-1 1a.5.5 0 1 0 .708.707l1-1Zm1.5 1.5a.5.5 0 1 0-.707-.707l-2 2a.5.5 0 0 0 .708.707l2-2Zm1.5 1.5a.5.5 0 1 0-.707-.708l-1 1a.5.5 0 1 0 .708.707l1-1ZM9.5 6.748a1.249 1.249 0 1 0 0-2.498 1.249 1.249 0 0 0 0 2.498Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'trash':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'trash icon'}
          aria-hidden={ariaHidden}
          viewBox="0 0 15 15"
          fill="none"
        >
          <path
            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'play':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'play icon'}
          aria-hidden={ariaHidden}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      );
    default:
      name satisfies never;
      break;
  }
}
