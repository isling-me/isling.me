import gql from 'graphql-tag';

export const currentUserQuery = gql`
  query currentUserQuery {
    me {
      id
      username
      role
      profile {
        id
        name
        avatar
      }
    }
  }
`;

export const userProfileQuery = gql`
  query userProfileQuery($username: String!) {
    user(username: $username) {
      id
      username
      profile {
        id
        name
        avatar
        intro
      }
    }
  }
`;

export const updateProfileMutation = gql`
  mutation updateProfileMutation(
    $username: String
    $name: String
    $intro: String
    $avatar: String
  ) {
    updateProfile(
      username: $username
      name: $name
      intro: $intro
      avatar: $avatar
    ) {
      id
      username
      role
      profile {
        id
        name
        avatar
        intro
      }
    }
  }
`;
