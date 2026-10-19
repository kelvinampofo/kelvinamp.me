interface BrowserInfo {
  name: string;
  version: string;
}

const BROWSERS: ReadonlyArray<{ name: string; regex: RegExp }> = [
  { name: "Edge", regex: /Edg(?:A|iOS)?\/(\d+\.\d+)/ },
  { name: "Safari", regex: /Version\/(\d+\.\d+).*Safari/ },
  { name: "Chrome", regex: /Chrome\/(\d+\.\d+)/ },
  { name: "Firefox", regex: /Firefox\/(\d+\.\d+)/ },
];

export function getBrowserInfo(userAgent: string): BrowserInfo {
  for (const { name, regex } of BROWSERS) {
    const version = regex.exec(userAgent)?.[1];
    if (version) {
      return { name, version };
    }
  }

  return { name: "Unknown", version: "0.0" };
}
