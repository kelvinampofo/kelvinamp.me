import { isWithinInterval, subMonths } from 'date-fns';

export const isWithin2Months = (postDate: Date) => {
  const currentDate = new Date();
  return isWithinInterval(postDate, {
    start: subMonths(currentDate, 1),
    end: currentDate
  });
};