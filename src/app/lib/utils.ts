import { isWithinInterval, subMonths } from 'date-fns';
import type { Prototype } from './prototypes';

export const isWithin1Month = (postDate: Date) => {
  const currentDate = new Date();
  return isWithinInterval(postDate, {
    start: subMonths(currentDate, 1),
    end: currentDate
  });
};

export const findPrototype = (prototypes: Prototype[], titleToMatch: string) => {
  const found = prototypes.find(({ title }) => title === titleToMatch);
  if (!found) {
    throw new Error(`Prototype "${titleToMatch}" is not found.`);
  }
  return found;
};

export const parseError = (error: unknown): string => {
  const message = error instanceof Error ? error.message : String(error);

  return message;
};

export const isMacOS =
  typeof window !== 'undefined' && /^(?=.*Macintosh)(?=.*Mac OS X).*$/.test(navigator.userAgent);
