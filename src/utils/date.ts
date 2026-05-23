import { clamp } from "./math";

type DateInput = Date | number | string;

const DEFAULT_LOCALE = "en-GB";
const DISPLAY_TIME_ZONE = "UTC";

const formatterCache = new Map<string, Intl.DateTimeFormat>();

/**
 * Returns true when the first date occurs after the comparison date.
 */
export function isAfter(date: DateInput, comparisonDate: DateInput) {
  return parseDate(date).getTime() > parseDate(comparisonDate).getTime();
}

/**
 * Returns true when the date and reference date fall in the same UTC year.
 */
export function isThisYear(
  date: DateInput,
  referenceDate: DateInput = new Date()
) {
  return (
    parseDate(date).getUTCFullYear() ===
    parseDate(referenceDate).getUTCFullYear()
  );
}

/**
 * Subtracts whole calendar months while preserving the UTC time fields.
 *
 * If the target month is shorter, the day is clamped to the last day of that
 * month.
 */
export function subMonths(date: DateInput, amount: number) {
  const parsedDate = parseDate(date);

  const year = parsedDate.getUTCFullYear();
  const month = parsedDate.getUTCMonth() - amount;
  const day = parsedDate.getUTCDate();

  const lastDayOfTargetMonth = new Date(
    Date.UTC(year, month + 1, 0)
  ).getUTCDate();

  return new Date(
    Date.UTC(
      year,
      month,
      clamp(day, 1, lastDayOfTargetMonth),
      parsedDate.getUTCHours(),
      parsedDate.getUTCMinutes(),
      parsedDate.getUTCSeconds(),
      parsedDate.getUTCMilliseconds()
    )
  );
}

/**
 * Formats a date with Intl.DateTimeFormat using the site's default locale and
 * UTC timezone unless a different locale is provided.
 */
export function formatDate(
  date: DateInput,
  options: Intl.DateTimeFormatOptions,
  locale = DEFAULT_LOCALE
) {
  return getFormatter(locale, options).format(parseDate(date));
}

function parseDate(input: DateInput) {
  const date =
    input instanceof Date ? new Date(input.getTime()) : new Date(input);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${input}`);
  }

  return date;
}

function getFormatter(locale: string, options: Intl.DateTimeFormatOptions) {
  const key = JSON.stringify([locale, options]);
  const cachedFormatter = formatterCache.get(key);

  if (cachedFormatter) {
    return cachedFormatter;
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone: DISPLAY_TIME_ZONE,
    ...options,
  });

  formatterCache.set(key, formatter);

  return formatter;
}
