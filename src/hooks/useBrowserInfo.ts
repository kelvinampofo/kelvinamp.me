import { useMemo } from "react";

interface BrowserInfo {
  name: string;
  version: string;
}

const BROWSERS: ReadonlyArray<{ name: string; regex: RegExp }> = [
  { name: "Safari", regex: /Version\/(\d+\.\d+).*Safari/ },
  { name: "Chrome", regex: /Chrome\/(\d+\.\d+)/ },
  { name: "Firefox", regex: /Firefox\/(\d+\.\d+)/ },
  { name: "Edge", regex: /Edg\/(\d+\.\d+)/ },
];

export function useBrowserInfo(): BrowserInfo {
  return useMemo(() => {
    const userAgent = navigator.userAgent;

    for (const { name, regex } of BROWSERS) {
      const match = regex.exec(userAgent);
      if (match) {
        return { name, version: match[1] };
      }
    }

    return { name: "Unknown", version: "0.0" };
  }, []);
}
