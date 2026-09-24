import { useEffect, useState } from "react";

interface UseTimeOptions {
  timeZone?: Intl.DateTimeFormatOptions["timeZone"];
  enabled?: boolean;
}

type DateTimePartType = "hour" | "minute" | "second";

export function useTime({
  timeZone = "Europe/London",
  enabled = true,
}: UseTimeOptions = {}) {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!enabled) return;

    function updateTime() {
      setCurrentDate(new Date());
    }

    const initialTimeoutId = setTimeout(updateTime, 0);
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearTimeout(initialTimeoutId);
      clearInterval(intervalId);
    };
  }, [enabled]);

  if (!currentDate) {
    return {
      currentTime: "00:00:00",
      timezoneOffset: "",
      timeParts: { hours: 0, minutes: 0, seconds: 0 },
    };
  }

  const clockFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const timezoneFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    timeZoneName: "shortOffset",
  });

  const hmsParts = clockFormatter.formatToParts(currentDate);

  function parseClockPart(type: DateTimePartType) {
    const value = hmsParts.find((part) => part.type === type)?.value;
    return Number(value ?? 0);
  }

  const timeParts = {
    hours: parseClockPart("hour"),
    minutes: parseClockPart("minute"),
    seconds: parseClockPart("second"),
  };

  const timezoneOffset =
    timezoneFormatter
      .formatToParts(currentDate)
      .find((part) => part.type === "timeZoneName")?.value ?? "";

  return {
    currentTime: clockFormatter.format(currentDate),
    timezoneOffset,
    timeParts,
  };
}
