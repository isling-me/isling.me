import gql from 'graphql-tag';

export const postsQuery = gql`
  {
    posts(page: { first: 36 }, orderBy: publishedDate_DESC) {
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
          id
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
        id
        slug
        name
      }
    }
  }
`;

export const postQuery = gql`
  query postQuery($postId: ID!) {
    post(id: $postId) {
      id
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
        id
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
      slug
      title
      content {
        id
        text
      }
      state
      updatedAt
      publishedDate
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
      slug
      updatedAt
      content {
        id
        text
      }
    }
  }
`;

export const ownPostsDraftQuery = gql`
  query ownPostsDraftQuery(
    $state: PostState = DRAFT
    $page: PageInput = { first: 5 }
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
            id
            text
          }
          updatedAt
        }
      }
    }
  }
`;

export const ownPostsPublishedQuery = gql`
  query ownPostsPublishedQuery(
    $state: PostState = PUBLISHED
    $page: PageInput = { first: 5 }
    $orderBy: PostOrderByInput = publishedDate_DESC
  ) {
    me {
      posts(state: $state, page: $page, orderBy: $orderBy) {
        total
        items {
          id
          slug
          title
          content {
            id
            text
          }
          updatedAt
          publishedDate
        }
      }
    }
  }
`;

export const ownPostContentQuery = gql`
  query ownPostContentQuery($postId: ID!) {
    ownPost(id: $postId) {
      id
      title
      content {
        id
        text
      }
      state
    }
  }
`;

export const ownPostPreviewQuery = gql`
  query ownPostPreviewQuery($postId: ID!) {
    ownPost(id: $postId) {
      id
      title
      description
      topic {
        id
        name
      }
      preview
      state
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
      title
      slug
      content {
        id
        text
      }
      topic {
        id
        name
        slug
      }
      state
      description
      publishedDate
      preview
      readingTime
      author {
        id
        username
        profile {
          name
          avatar
        }
      }
    }
  }
`;

export const unpublishPostMutation = gql`
  mutation publishPostMutation($postId: ID!) {
    updatePost(id: $postId, data: { state: DRAFT }) {
      id
      slug
      state
      publishedDate
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
