import "react";

declare module "react" {
  // allow custom properties in JSX style objects
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
