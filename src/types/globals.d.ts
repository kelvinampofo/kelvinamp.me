import "react";

declare module "*.css";
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
