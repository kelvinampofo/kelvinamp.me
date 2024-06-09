type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-top-left'
  | 'link'
  | 'chevron-left'
  | 'chevron-right'
  | 'rocket'
  | 'trash';

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
          viewBox="0 0 16 19"
        >
          <g clipPath="url(#clip0_549_88)">
            <path
              d="M5.25 14.8828C5.54688 14.8828 5.74219 14.6953 5.73438 14.4219L5.49219 6.0625C5.48438 5.78906 5.28906 5.60938 5.00781 5.60938C4.71094 5.60938 4.51562 5.79688 4.52344 6.07031L4.75781 14.4219C4.76562 14.7031 4.96094 14.8828 5.25 14.8828ZM7.5625 14.8828C7.85938 14.8828 8.07031 14.6953 8.07031 14.4219V6.07031C8.07031 5.79688 7.85938 5.60938 7.5625 5.60938C7.26562 5.60938 7.0625 5.79688 7.0625 6.07031V14.4219C7.0625 14.6953 7.26562 14.8828 7.5625 14.8828ZM9.88281 14.8828C10.1641 14.8828 10.3594 14.7031 10.3672 14.4219L10.6016 6.07031C10.6094 5.79688 10.4141 5.60938 10.1172 5.60938C9.83594 5.60938 9.64062 5.78906 9.63281 6.07031L9.39844 14.4219C9.39062 14.6953 9.58594 14.8828 9.88281 14.8828ZM4.13281 3.57031H5.375V1.89844C5.375 1.45312 5.6875 1.16406 6.15625 1.16406H8.95312C9.42188 1.16406 9.73438 1.45312 9.73438 1.89844V3.57031H10.9766V1.82031C10.9766 0.6875 10.2422 0 9.03906 0H6.07031C4.86719 0 4.13281 0.6875 4.13281 1.82031V3.57031ZM0.585938 4.19531H14.5469C14.8672 4.19531 15.125 3.92188 15.125 3.60156C15.125 3.28125 14.8672 3.01562 14.5469 3.01562H0.585938C0.273438 3.01562 0 3.28125 0 3.60156C0 3.92969 0.273438 4.19531 0.585938 4.19531ZM3.98438 17.3984H11.1484C12.2656 17.3984 13.0156 16.6719 13.0703 15.5547L13.6172 4.04688H12.3594L11.8359 15.4219C11.8203 15.8906 11.4844 16.2188 11.0234 16.2188H4.09375C3.64844 16.2188 3.3125 15.8828 3.28906 15.4219L2.73438 4.04688H1.50781L2.0625 15.5625C2.11719 16.6797 2.85156 17.3984 3.98438 17.3984Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_549_88">
              <rect width="15.5312" height="18.7891" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    default:
      null;
  }
}
