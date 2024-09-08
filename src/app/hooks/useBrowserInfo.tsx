'use client';

import { useEffect, useState } from 'react';

export const useBrowserInfo = () => {
  const [browserInfo, setBrowserInfo] = useState({ name: 'Unknown', version: '0.0' });

  useEffect(() => {
    const getBrowserInfo = () => {
      const userAgent = navigator.userAgent;

      const browserNameAndRegex = [
        { name: 'Chrome', regex: /Chrome\/(\d+\.\d+)/ },
        { name: 'Firefox', regex: /Firefox\/(\d+\.\d+)/ },
        { name: 'Safari', regex: /Version\/(\d+\.\d+)/ }
      ];

      const matchedBrowser = browserNameAndRegex.find(({ regex }) => regex.test(userAgent));

      if (matchedBrowser) {
        const match = userAgent.match(matchedBrowser.regex);
        if (match) {
          const [major, minor] = match[1].split('.');
          return { name: matchedBrowser.name, version: `${major}.${minor}` };
        }
      }

      return { name: 'Unknown', version: '0.0' };
    };

    const { name, version } = getBrowserInfo();

    setBrowserInfo({ name, version });
  }, []);

  return browserInfo;
};
