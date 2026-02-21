import { useEffect, useRef, useState } from "react";

interface TimeParts {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

type Tick = "interval" | "quartz";

interface Options {
  timeZone?: string;
  tick?: Tick;
}

const TWO_DIGITS = 2;
const DECIMAL_RADIX = 10;
const MILLISECONDS_PER_SECOND = 1000;

export const useTime = ({
  timeZone = "Europe/London",
  tick = "interval",
}: Options = {}) => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    initTimeoutRef.current = setTimeout(() => {
      setCurrentDate(new Date());
    }, 0);

    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (tick !== "interval") {
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, MILLISECONDS_PER_SECOND);

    return () => {
      clearInterval(intervalId);
    };
  }, [tick]);

  useEffect(() => {
    if (tick !== "quartz") {
      return;
    }

    // scheduleNextTick aligns updates to exact wall-clock second boundaries
    // (e.g. hh:mm:ss.000) to avoid setInterval drift over time.
    const scheduleNextTick = () => {
      const elapsedInCurrentSecond = Date.now() % MILLISECONDS_PER_SECOND;

      const remainingToNextSecond =
        MILLISECONDS_PER_SECOND - elapsedInCurrentSecond;

      const delay = remainingToNextSecond || MILLISECONDS_PER_SECOND;

      timeoutRef.current = setTimeout(() => {
        setCurrentDate(new Date());
        scheduleNextTick();
      }, delay);
    };

    scheduleNextTick();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [tick]);

  if (!currentDate) {
    return {
      currentTime: "",
      timezoneOffset: "",
      timezoneName: "",
      currentDate: null,
      timeParts: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
    };
  }

  const date = currentDate;

  function formatToParts(options: Intl.DateTimeFormatOptions) {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone,
      ...options,
    }).formatToParts(date);
  }

  const hmsParts = formatToParts({
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  function parseClockPart(type: "hour" | "minute" | "second") {
    const { value } = hmsParts.find((part) => part.type === type) ?? {};
    const parsed = Number.parseInt(value ?? "", DECIMAL_RADIX);

    return Number.isNaN(parsed) ? undefined : parsed;
  }

  const timeParts: TimeParts = {
    hours: parseClockPart("hour") ?? date.getHours(),
    minutes: parseClockPart("minute") ?? date.getMinutes(),
    seconds: parseClockPart("second") ?? date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  };

  function padTimeUnit(value: number) {
    return String(value).padStart(TWO_DIGITS, "0");
  }

  const paddedHours = padTimeUnit(timeParts.hours);
  const paddedMinutes = padTimeUnit(timeParts.minutes);
  const paddedSeconds = padTimeUnit(timeParts.seconds);

  const currentTime = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;

  function getTimeZoneLabel(timeZoneName: "short" | "long") {
    const parts = formatToParts({ timeZoneName });
    const matchedPart = parts.find(({ type }) => type === "timeZoneName");

    return matchedPart?.value ?? "";
  }

  const timezoneName = getTimeZoneLabel("short");
  const timezoneOffset = getTimeZoneLabel("long");

  return {
    currentTime,
    timezoneOffset,
    timezoneName,
    currentDate: date,
    timeParts,
  };
};
