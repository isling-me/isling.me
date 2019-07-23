import gql from 'graphql-tag';

export const currentUserQuery = gql`
  query currentUserQuery {
    me {
      id
      username
      role
      profile {
        name
        avatar
      }
    }
  }
`;

export const ownPostsQuery = gql`
  query ownPostsQuery(
    $state: PostState = DRAFT
    $page: PageInput!
    $orderBy: PostOrderByInput = updatedAt_DESC
  ) {
    me {
      posts(state: $state, page: $page, orderBy: $orderBy) {
        total
        items {
          id
          slug
          title
          content {
            text
          }
          updatedAt
          publishedDate
        }
      }
    }
  }
`;
