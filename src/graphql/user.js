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
