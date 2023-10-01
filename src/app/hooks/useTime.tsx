import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export default function useTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      if (newTime.getSeconds() !== currentTime.getSeconds()) {
        setCurrentTime(newTime);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [currentTime]);

  const formattedTime = format(currentTime, 'HH:mm:ss');
  const timePeriod = currentTime.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <>
      <span className="w-[3.2rem] md:w-[3.8rem]">{formattedTime}</span>
      <span>{timePeriod}</span>
    </>
  );
}
