import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export default function useTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    /*
     * Using requestAnimationFrame for better performance and synchronisation with the browser's rendering cycle.
     */
    const updateCurrentTime = () => {
      setTime(new Date());
      window.requestAnimationFrame(updateCurrentTime);
    };

    const timer = setTimeout(updateCurrentTime, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const timezoneOffset = `UTC ${format(new Date(), 'xxx')}`;

  const currentTime = format(time, 'HH:mm:ss a');

  return { currentTime, timezoneOffset };
}
