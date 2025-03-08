import { format } from 'date-fns';
import { useEffect, useState } from 'react';

type Options = {
  useSysTimezone: boolean;
};

export const useTime = (options: Options = { useSysTimezone: false }) => {
  const [time, setTime] = useState(new Date());

  useEffect(function updateTime() {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { useSysTimezone } = options;

  // use system time directly otherwise convert the current time to 'Europe/London'
  const convertedTime = useSysTimezone
    ? time
    : new Date(time.toLocaleString('en', { timeZone: 'Europe/London' }));

  const currentTime = format(convertedTime, 'HH:mm:ss');
  const meridiem = format(convertedTime, 'a');
  const timezoneOffset = format(convertedTime, 'zzz');

  return {
    currentTime,
    meridiem,
    timezoneOffset
  };
};
