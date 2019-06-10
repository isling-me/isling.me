import { findManyPosts, countPosts, findManyPopulars, findManyPostsBySlug } from '../db';

export const getPosts = (page = 0, perPage = 10) => {
  return new Promise((resolve) => {
    resolve({
      data: {
        items: findManyPosts({ page, perPage }),
        hasNext: (page + 1) * perPage < countPosts(),
      },
    });
  });
};

export const getPopular = () => {
  return new Promise((resolve) => {
    const ids = findManyPopulars();
    resolve({
      data: {
        items: findManyPostsBySlug(ids),
        ids,
      },
    });
  });
};

export const getOnePost = (slug) => {
  return new Promise(async (resolve, reject) => {
    const result = findManyPostsBySlug([slug]);

    if (!Array.isArray(result) || result.length === 0) {
      return reject({
        error: {
          code: 404,
          message: 'notFound',
        },
      });
    }

    const data = result[0];

    resolve({
      data,
    });
  });
};
