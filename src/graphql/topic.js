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

export const hotTopicsQuery = gql`
  query hotTopicsQuery {
    topics(page: { first: 5 }) {
      items {
        id
        name
        slug
      }
    }
  }
`;

export const topicLightQuery = gql`
  query topicLightQuery($slug: String!) {
    topic(slug: $slug) {
      id
      slug
      name
    }
  }
`;

export const topicQuery = gql`
  query topicQuery(
    $slug: String!
    $page: PageInput = { first: 8 }
    $orderBy: PostOrderByInput = publishedDate_DESC
  ) {
    topic(slug: $slug) {
      id
      slug
      name
      posts(page: $page, orderBy: $orderBy) {
        items {
          id
          title
          description
          slug
          preview
          publishedDate
          readingTime
          author {
            id
            username
            profile {
              id
              name
              avatar
            }
          }
        }
        total
      }
    }
  }
`;

export const topicRandomQuery = gql`
  query topicRandomQuery {
    topic(slug: "random") {
      id
      slug
      name
    }
  }
`;
