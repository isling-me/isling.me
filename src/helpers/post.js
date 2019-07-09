import { format } from 'date-fns';

export const formatPublishedDate = date => {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (dateObj.getFullYear() === new Date().getFullYear()) {
    return format(dateObj, 'MMM dd');
  }

  return format(dateObj, 'MMM dd, yyyy');
};

export const makePostUri = (slug, id) => `/posts/${slug}/${id}`;
