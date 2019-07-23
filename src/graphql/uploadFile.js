import gql from 'graphql-tag';

export const uploadFileMutation = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      mimetype
      path
    }
  }
`;
