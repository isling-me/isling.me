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
        readingTime
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

export const postQuery = gql`
  query postQuery($postId: ID!) {
    post(id: $postId) {
      title
      content {
        text
      }
      readingTime
      publishedDate
      author {
        id
        username
        profile {
          name
        }
      }
      topic {
        name
        slug
      }
    }
  }
`;
