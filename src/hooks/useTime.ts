import { format } from "date-fns";
import { useEffect, useState } from "react";

type Options = {
  timeZone?: string;
};

export const useTime = ({ timeZone = "Europe/London" }: Options = {}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

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
    parts.find((part) => part.type === "timeZoneName")?.value ?? "";

  return {
    currentTime,
    timezoneOffset,
    timezoneName,
  };
};
