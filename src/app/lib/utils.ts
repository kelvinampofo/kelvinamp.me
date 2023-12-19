import { isWithinInterval, subMonths } from 'date-fns';
import type { Prototype } from './prototypes';

export const isWithin1Month = (postDate: Date) => {
  const currentDate = new Date();
  return isWithinInterval(postDate, {
    start: subMonths(currentDate, 1),
    end: currentDate
  });
};

export const findPrototype = (prototype: Prototype[], titleToMatch: string) => {
  return prototype.find(({ title }) => title === titleToMatch) as Prototype;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return 'Something went wrong.';
};

export const isMacOS =
  typeof window !== 'undefined' ? /\bMacintosh\b|\bMac OS X\b/.test(navigator.userAgent) : false;
