import {
  findManyPosts,
  countPosts,
  findManyPopulars,
  findManyPostsBySlug
} from '../db';
import gql from 'graphql-tag';

export const postsQuery = gql`
  {
    posts(page: { first: 8 }) {
      total
      items {
        id
        title
        slug
        description
        publishedDate
        topic {
          name
          slug
        }
        author {
          id
          username
          profile {
            name
          }
        }
      }
    }
  }
`;

export const getPosts = (page = 0, perPage = 10) => {
  return new Promise(resolve => {
    resolve({
      data: {
        items: findManyPosts({ page, perPage }),
        hasNext: (page + 1) * perPage < countPosts()
      }
    });
  });
  // return (
  //   <Query query={POSTS_QUERY}>
  //     {({ loading, error, data }) => {
  //       if (loading) {
  //         return {
  //           loading
  //         };
  //       }

  //       if (error) {
  //         return { error };
  //       }

  //       return {
  //         items: data.posts.items,
  //         hasNext: false
  //       };
  //     }}
  //   </Query>
  // );
};

export const getPopular = () => {
  return new Promise(resolve => {
    const ids = findManyPopulars();
    resolve({
      data: {
        items: findManyPostsBySlug(ids),
        ids
      }
    });
  });
};

export const getOnePost = slug => {
  return new Promise(async (resolve, reject) => {
    const result = findManyPostsBySlug([slug]);

    if (!Array.isArray(result) || result.length === 0) {
      return reject({
        error: {
          code: 404,
          message: 'notFound'
        }
      });
    }

    const data = result[0];

    resolve({
      data
    });
  });
};
