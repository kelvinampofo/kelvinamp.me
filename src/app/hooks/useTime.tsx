import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export default function useTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    /*
     * Using requestAnimationFrame for better performance and synchronisation with the browser's rendering cycle.
     */
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
      window.requestAnimationFrame(updateCurrentTime);
    };

    const timer = setTimeout(updateCurrentTime, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const formattedTime = format(currentTime, 'HH:mm:ss a');

  return { formattedTime };
}
