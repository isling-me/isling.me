import { useMutation } from '@apollo/react-hooks';
import { uploadFileMutation } from '../graphql/uploadFile';

const useUploadFile = () => {
  const [upload, { loading, error }] = useMutation(uploadFileMutation);

  return [upload, { loading, error }];
};

export default useUploadFile;
