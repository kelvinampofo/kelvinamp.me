import { useMemo } from 'react';

interface BrowserInfo {
  name: string;
  version: string;
}

export function useBrowserInfo(): BrowserInfo {
  const browserInfo = useMemo<BrowserInfo>(() => {
    const userAgent = navigator.userAgent;

    const browsers = [
      // more precise match to avoid chrome/safari overlap on ios devices
      { name: 'Safari', regex: /Version\/(\d+\.\d+).*Safari/ },
      { name: 'Chrome', regex: /Chrome\/(\d+\.\d+)/ },
      { name: 'Firefox', regex: /Firefox\/(\d+\.\d+)/ },
      { name: 'Edge', regex: /Edg\/(\d+\.\d+)/ }
    ];

    const matchedBrowser = browsers.find(({ regex }) => regex.test(userAgent));

    if (matchedBrowser) {
      const match = userAgent.match(matchedBrowser.regex);
      if (match) {
        return { name: matchedBrowser.name, version: match[1] };
      }
    }

    return { name: 'Unknown', version: '0.0' };
  }, []);

  return browserInfo;
}
