import { format } from 'date-fns';
import { useEffect, useState } from 'react';

type Options = {
  useLondonTime: boolean;
};

export const useTime = (options: Options = { useLondonTime: true }) => {
  const [time, setTime] = useState(new Date());

  useEffect(function updateTime() {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { useLondonTime } = options;

  // convert the current time to 'Europe/London' timezone, otherwise use system time directly
  const convertedTime = useLondonTime
    ? new Date(time.toLocaleString('en', { timeZone: 'Europe/London' }))
    : time;

  const currentTime = format(convertedTime, 'HH:mm:ss');
  const meridiem = format(convertedTime, 'a');
  const timezoneOffset = format(convertedTime, 'zzzz');

  return {
    currentTime,
    meridiem,
    timezoneOffset
  };
};
