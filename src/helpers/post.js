import { format } from 'date-fns';
import { makeUserUri } from './user';
import { makeTopicUri } from './topic';

export const formatPublishedDate = date => {
  if (!date) {
    return 'undefined';
  }
  const dateObj = date instanceof Date ? date : new Date(date);

  if (dateObj.getFullYear() === new Date().getFullYear()) {
    return format(dateObj, 'MMM dd');
  }

  return format(dateObj, 'MMM dd, yyyy');
};

export const makePostUri = (slug, id) => `/posts/${slug}/${id}`;

export const formatPostForCard = p => ({
  ...p,
  link: makePostUri(p.slug, p.id),
  author: {
    name: p.author.profile.name,
    link: makeUserUri(p.author.id, p.author.username)
  },
  topic: p.topic
    ? {
        name: p.topic.name,
        link: makeTopicUri(p.topic.slug)
      }
    : undefined,
  readingTime: `${p.readingTime} min`,
  publishedDate: formatPublishedDate(new Date(p.publishedDate))
});
