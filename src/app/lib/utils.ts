import { isWithinInterval, subMonths } from 'date-fns';
import type { Prototype } from './data';

export const isWithin1Month = (postDate: Date) => {
  const currentDate = new Date();
  return isWithinInterval(postDate, {
    start: subMonths(currentDate, 1),
    end: currentDate
  });
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  const hasValidMessage =
    error && typeof error === 'object' && 'message' in error && typeof error.message === 'string';

  if (hasValidMessage) {
    return error.message as string;
  }

  return 'Something went wrong.';
};

export const findPrototype = (prototype: Prototype[], titleToMatch: string) => {
  return prototype.find(({ title }) => title === titleToMatch) as Prototype;
};
