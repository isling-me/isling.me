import gql from 'graphql-tag';

export const postsQuery = gql`
  {
    posts(page: { first: 8 }, orderBy: publishedDate_DESC) {
      total
      items {
        id
        title
        slug
        description
        preview
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

export const popularPostsQuery = gql`
  query popularPostsQuery {
    popularPosts {
      id
      slug
      title
      author {
        username
        id
        profile {
          name
        }
      }
      publishedDate
      readingTime
      topic {
        slug
        name
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
      description
      preview
      topic {
        id
        name
      }
      state
      publishedDate
    }
  }
`;

export const publishPostMutation = gql`
  mutation publishPostMutation(
    $postId: ID!
    $preview: String
    $description: String
    $topic: ID
  ) {
    updatePost(
      id: $postId
      data: {
        preview: $preview
        description: $description
        topic: $topic
        state: PUBLISHED
      }
    ) {
      id
      slug
    }
  }
`;

export const unpublishPostMutation = gql`
  mutation publishPostMutation($postId: ID!) {
    updatePost(id: $postId, data: { state: DRAFT }) {
      id
      slug
    }
  }
`;

export const deletePostMutation = gql`
  mutation deletePostMutation($postId: ID!) {
    deletePost(id: $postId) {
      status
      message
    }
  }
`;
