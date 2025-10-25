import { useEffect, useState } from "react";

type Options = {
  timeZone?: string;
};

export const useTime = ({ timeZone = "Europe/London" }: Options = {}) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setTime(new Date());

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (time === null) {
    return { currentTime: "", timezoneOffset: "", timezoneName: "" };
  }

  const currentTime = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(time);

  const offsetParts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(time);

  const timezoneOffset =
    offsetParts.find((part) => part.type === "timeZoneName")?.value ?? "";

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(time);

  const timezoneName =
    parts.find((part) => part.type === "timeZoneName")?.value ?? "";

  return { currentTime, timezoneOffset, timezoneName };
};
