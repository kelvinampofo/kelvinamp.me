import { useMemo } from 'react';

interface BrowserInfo {
  name: string;
  version: string;
}

export const useBrowserInfo = () => {
  const browserInfo = useMemo<BrowserInfo>(() => {
    const userAgent = navigator.userAgent;

    const browsers = [
      { name: 'Chrome', regex: /Chrome\/(\d+\.\d+)/ },
      { name: 'Firefox', regex: /Firefox\/(\d+\.\d+)/ },
      // more precise match for safari to avoid chrome/safari overlap on ios
      { name: 'Safari', regex: /Version\/(\d+\.\d+)/ }
    ];

    const matchedBrowser = browsers.find(({ regex }) => regex.test(userAgent));

    if (matchedBrowser) {
      const match = userAgent.match(matchedBrowser.regex);
      if (match) {
        const [major, minor] = match[1].split('.');
        return { name: matchedBrowser.name, version: `${major}.${minor}` };
      }
    }

    return { name: 'Unknown', version: '0.0' };
  }, []);

  return browserInfo;
};
