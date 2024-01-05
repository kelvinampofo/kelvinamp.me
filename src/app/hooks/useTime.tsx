import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface Options {
  useLondonTime?: boolean;
}

export const useTime = (options: Options = {}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateCurrentTime = () => setTime(new Date());
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { useLondonTime = true } = options;

  let currentTime: string;
  let meridiem: string;
  let timezoneOffset: string;

  if (useLondonTime) {
    // convert the current time to 'Europe/London' timezone
    const londonTime = new Date(time.toLocaleString('en', { timeZone: 'Europe/London' }));
    currentTime = format(londonTime, 'HH:mm:ss');
    meridiem = format(londonTime, 'a');
    timezoneOffset = `UTC ${format(londonTime, 'xxx')}`;
  } else {
    // use system time directly
    currentTime = format(time, 'HH:mm:ss');
    meridiem = format(time, 'a');
    timezoneOffset = `UTC ${format(time, 'xxx')}`;
  }

  return { currentTime, meridiem, timezoneOffset };
};
