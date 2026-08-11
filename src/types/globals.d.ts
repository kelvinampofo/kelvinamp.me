import "react";

declare module "react" {
  // allow custom properties in JSX style objects
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
