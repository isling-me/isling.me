import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { uploadFileMutation } from '../../graphql/uploadFile';

const UploadFile = () => {
  const [upload, { loading, error }] = useMutation(uploadFileMutation);

  const handleChange = ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    validity.valid && upload({ variables: { file } });
  };

  return (
    <div>
      <input type="file" required onChange={handleChange} />
      {loading && <div>Uploading...</div>}
      {error && <div>Error</div>}
    </div>
  );
};

export default UploadFile;
