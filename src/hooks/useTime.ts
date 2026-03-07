import { useEffect, useRef, useState } from "react";

export interface TimeParts {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface UseTimeOptions {
  timeZone?: Intl.DateTimeFormatOptions["timeZone"];
}

export interface UseTimeResult {
  currentTime: string;
  timezoneOffset: string;
  currentDate: Date | null;
  timeParts: TimeParts;
}

type DateTimePartType = "hour" | "minute" | "second";
type TimeZoneNameStyle = Intl.DateTimeFormatOptions["timeZoneName"];

const TWO_DIGITS = 2;
const DECIMAL_RADIX = 10;
const MILLISECONDS_PER_SECOND = 1000;

export function useTime({
  timeZone = "Europe/London",
}: UseTimeOptions = {}): UseTimeResult {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // scheduleNextTick aligns updates to exact wall-clock second boundaries
    // (e.g. hh:mm:ss.000) to avoid setInterval drift over time.
    function scheduleTick(delay: number) {
      timeoutRef.current = setTimeout(() => {
        setCurrentDate(new Date());

        const elapsedInCurrentSecond = Date.now() % MILLISECONDS_PER_SECOND;
        const remainingToNextSecond =
          MILLISECONDS_PER_SECOND - elapsedInCurrentSecond;
        const nextDelay = remainingToNextSecond || MILLISECONDS_PER_SECOND;

        scheduleTick(nextDelay);
      }, delay);
    }

    const elapsedInCurrentSecond = Date.now() % MILLISECONDS_PER_SECOND;
    const remainingToNextSecond =
      MILLISECONDS_PER_SECOND - elapsedInCurrentSecond;
    const initialDelay = remainingToNextSecond || MILLISECONDS_PER_SECOND;

    scheduleTick(initialDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const date = currentDate;

  function formatToParts(options: Intl.DateTimeFormatOptions) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      ...options,
    });

    const formattedParts = formatter.formatToParts(date);

    return formattedParts;
  }

  const hmsParts = formatToParts({
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  function parseClockPart(type: DateTimePartType) {
    const { value } = hmsParts.find((p) => p.type === type) ?? {};

    const parsed = Number.parseInt(value ?? "", DECIMAL_RADIX);
    const parsedClockPart = Number.isNaN(parsed) ? undefined : parsed;

    return parsedClockPart;
  }

  const timeParts: TimeParts = {
    hours: parseClockPart("hour") ?? date.getHours(),
    minutes: parseClockPart("minute") ?? date.getMinutes(),
    seconds: parseClockPart("second") ?? date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  };

  function padTimeUnit(value: number) {
    const unit = String(value).padStart(TWO_DIGITS, "0");

    return unit;
  }

  const paddedHours = padTimeUnit(timeParts.hours);
  const paddedMinutes = padTimeUnit(timeParts.minutes);
  const paddedSeconds = padTimeUnit(timeParts.seconds);

  const currentTime = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;

  function getTimeZoneLabel(style: TimeZoneNameStyle) {
    const parts = formatToParts({ timeZoneName: style });
    const matchedPart = parts.find((p) => p.type === "timeZoneName");
    const timezoneLabel = matchedPart?.value ?? "";

    return timezoneLabel;
  }

  const timezoneOffset = getTimeZoneLabel("longOffset");

  return {
    currentTime,
    timezoneOffset,
    currentDate: date,
    timeParts,
  };
}
