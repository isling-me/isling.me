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
          avatar
        }
      }
      topic {
        name
        slug
      }
    }
  }
`;

export const createPostMutation = gql`
  mutation createPostMutation($title: String, $text: String) {
    createPost(data: { title: $title, content: { text: $text } }) {
      id
      title
      content {
        text
      }
    }
  }
`;

export const updatePostContentOnlyMutation = gql`
  mutation updatePostContentOnlyMutation(
    $title: String
    $text: String
    $id: ID!
  ) {
    updatePost(id: $id, data: { title: $title, content: { text: $text } }) {
      id
      title
      content {
        text
      }
    }
  }
`;

export const postContentOnlyQuery = gql`
  query postContentOnlyQuery($id: ID!) {
    ownPost(id: $id) {
      title
      content {
        text
      }
    }
  }
`;
