import { formatDistance } from 'date-fns';

export const stripHtml = (string, replace = '') =>
  string.replace(/<[^>]*>?/gm, replace);

export const timeDifference = time => {
  const timeObj = time instanceof Date ? time : new Date(time);

  return formatDistance(timeObj, new Date());
};
