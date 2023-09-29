import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export default function useTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsClient(true);
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
  const period = currentTime.getHours() >= 12 ? 'PM' : 'AM';

  if (isClient) {
    return (
      <div className="flex">
        <span className="w-[3.5rem] md:w-[4rem]">{formattedTime}</span>
        <span>{period}</span>
      </div>
    );
  }
}
