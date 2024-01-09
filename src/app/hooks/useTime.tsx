import { format } from 'date-fns';
import { useEffect, useState } from 'react';

type Options = {
  useLondonTime: boolean;
};

export const useTime = (options: Options = { useLondonTime: true }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => setTime(new Date());
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { useLondonTime } = options;

  // convert the current time to 'Europe/London' timezone, otherwise use system time directly
  const convertedTime = useLondonTime
    ? new Date(time.toLocaleString('en', { timeZone: 'Europe/London' }))
    : time;

  const formatTime = () => {
    const formattedTime = format(convertedTime, 'HH:mm:ss');
    const formattedMeridiem = format(convertedTime, 'a');
    const formattedTimezoneOffset = `${format(convertedTime, 'zzzz')}`;

    return { formattedTime, formattedMeridiem, formattedTimezoneOffset };
  };

  const { formattedTime, formattedMeridiem, formattedTimezoneOffset } = formatTime();

  return {
    currentTime: formattedTime,
    meridiem: formattedMeridiem,
    timezoneOffset: formattedTimezoneOffset
  };
};
