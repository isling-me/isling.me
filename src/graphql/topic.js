import gql from 'graphql-tag';

export const topicsSearchQuery = gql`
  query topicsSearchQuery($filter: String) {
    topics(filter: $filter, page: { first: 8 }) {
      items {
        id
        name
      }
    }
  }
`;
