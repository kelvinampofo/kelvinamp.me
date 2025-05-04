import { format } from "date-fns";
import { useEffect, useState, useMemo } from "react";

type Options = {
  timeZone?: string;
};

export const useTime = ({ timeZone = "Europe/London" }: Options = {}) => {
  const [time, setTime] = useState(new Date());

  useEffect(function updateTime() {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  // convert the current time based on the provided timeZone
  const convertedTime = useMemo(() => {
    return timeZone ? new Date(time.toLocaleString("en", { timeZone })) : time;
  }, [time, timeZone]);

  const currentTime = useMemo(
    () => format(convertedTime, "HH:mm:ss"),
    [convertedTime]
  );

  const timezoneOffset = useMemo(
    () => format(convertedTime, "zzzz"),
    [convertedTime]
  );

  const timezoneName = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      timeZoneName: "short",
    });

    const parts = formatter.formatToParts(convertedTime);
    return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  }, [convertedTime, timeZone]);

  return {
    currentTime,
    timezoneOffset,
    timezoneName,
  };
};
