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

export const updatePostContentMutation = gql`
  mutation updatePostContentMutation(
    $title: String
    $text: String
    $postId: ID!
  ) {
    updatePost(id: $postId, data: { title: $title, content: { text: $text } }) {
      id
      title
      content {
        text
      }
    }
  }
`;

export const ownPostContentQuery = gql`
  query ownPostContentQuery($postId: ID!) {
    ownPost(id: $postId) {
      title
      content {
        text
      }
    }
  }
`;
