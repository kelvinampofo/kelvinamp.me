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

declare global {
  interface ImportMeta {
    // Next's glob has no module generic (https://github.com/vercel/next.js/pull/96991)
    glob<TModule>(
      pattern: string | string[],
      options?: ImportMetaGlobOptions & { eager?: false | undefined }
    ): Record<string, () => Promise<TModule>>;
  }
}
