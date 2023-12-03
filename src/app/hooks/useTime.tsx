import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const useTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateCurrentTime = () => setTime(new Date());
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const currentTime = format(time, 'HH:mm:ss a');

  const timezoneOffset = `UTC ${format(new Date(), 'xxx')}`;

  return { currentTime, timezoneOffset };
};

export default useTime;
