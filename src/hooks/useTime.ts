import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Options {
  timeZone?: string;
}

export const useTime = ({ timeZone = "Europe/London" }: Options = {}) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    const timeoutId = setTimeout(() => setTime(new Date()), 0);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!time) {
    return {
      currentTime: "",
      timezoneOffset: "",
      timezoneName: "",
    };
  }

  const convertedTime = timeZone
    ? new Date(time.toLocaleString("en", { timeZone }))
    : time;

  const currentTime = format(convertedTime, "HH:mm:ss");
  const timezoneOffset = format(convertedTime, "zzzz");

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    timeZoneName: "short",
  });

  const parts = formatter.formatToParts(convertedTime);

  const timezoneName =
    parts.find(({ type }) => type === "timeZoneName")?.value ?? "";

  return {
    currentTime,
    timezoneOffset,
    timezoneName,
  };
};
