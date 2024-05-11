type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-top-left'
  | 'link'
  | 'chevron-left'
  | 'chevron-right'
  | 'reload'
  | 'rocket'
  | 'exclamation-triangle'
  | 'info-circled';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
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
          xmlns="http://www.w3.org/2000/svg"
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
          xmlns="http://www.w3.org/2000/svg"
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
          xmlns="http://www.w3.org/2000/svg"
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
          xmlns="http://www.w3.org/2000/svg"
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
          xmlns="http://www.w3.org/2000/svg"
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
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            d="M6.158 3.135a.5.5 0 0 1 .707.023l3.75 4a.5.5 0 0 1 0 .684l-3.75 4a.5.5 0 1 1-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 0 1 .023-.707Z"
          />
        </svg>
      );
    case 'reload':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'Reload icon'}
          aria-hidden={ariaHidden}
          viewBox="0 0 18 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_549_114)">
            <path
              d="M0 12.3828C0 17.1777 3.84766 21.0254 8.63281 21.0254C13.418 21.0254 17.2559 17.1777 17.2559 12.3828C17.2559 11.9141 16.9238 11.5723 16.4453 11.5723C15.9863 11.5723 15.6836 11.9141 15.6836 12.3828C15.6836 16.3086 12.5488 19.4531 8.63281 19.4531C4.7168 19.4531 1.57227 16.3086 1.57227 12.3828C1.57227 8.4668 4.7168 5.33203 8.63281 5.33203C9.375 5.33203 10.0684 5.39062 10.6445 5.52734L7.72461 8.41797C7.57812 8.57422 7.5 8.76953 7.5 8.97461C7.5 9.42383 7.83203 9.75586 8.27148 9.75586C8.51562 9.75586 8.70117 9.67773 8.83789 9.53125L12.8613 5.48828C13.0371 5.32227 13.1055 5.12695 13.1055 4.90234C13.1055 4.6875 13.0176 4.47266 12.8613 4.31641L8.83789 0.234375C8.70117 0.078125 8.50586 0 8.27148 0C7.83203 0 7.5 0.351562 7.5 0.800781C7.5 1.00586 7.57812 1.20117 7.71484 1.35742L10.3125 3.92578C9.80469 3.82812 9.22852 3.75977 8.63281 3.75977C3.84766 3.75977 0 7.59766 0 12.3828Z"
              fill="currentColor"
              fill-opacity="0.85"
            />
          </g>
          <defs>
            <clipPath id="clip0_549_114">
              <rect width="17.6172" height="23.3691" fill="white" />
            </clipPath>
          </defs>
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
          xmlns="http://www.w3.org/2000/svg"
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
    case 'exclamation-triangle':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'Exclamation Triangle icon'}
          aria-hidden={ariaHidden}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M8.445.609a1.1 1.1 0 0 0-1.89 0L.161 11.337A1.1 1.1 0 0 0 1.106 13h12.788a1.1 1.1 0 0 0 .945-1.663L8.445.609Zm-1.03.512a.1.1 0 0 1 .17 0l6.395 10.728a.1.1 0 0 1-.086.151H1.106a.1.1 0 0 1-.086-.151L7.414 1.12Zm-.588 3.365a.674.674 0 1 1 1.346 0L8.02 8.487a.52.52 0 0 1-1.038 0l-.154-4Zm1.423 5.99a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            clip-rule="evenodd"
          />
        </svg>
      );
    case 'info-circled':
      return (
        <svg
          className={className}
          height={height}
          width={width}
          aria-label={ariaLabel || 'Info Circled icon'}
          aria-hidden={ariaHidden}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877ZM1.827 7.5a5.673 5.673 0 1 1 11.346 0 5.673 5.673 0 0 1-11.346 0Zm6.423-3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM6 6h1.5a.5.5 0 0 1 .5.5V10h1v1H6v-1h1V7H6V6Z"
            clip-rule="evenodd"
          />
        </svg>
      );
    default:
      null;
  }
}
