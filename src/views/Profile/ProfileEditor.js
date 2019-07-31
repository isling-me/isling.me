import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import Avatar from '../../components/Avatar/Avatar';
import useCurrentUser from '../../hooks/useCurrentUser';
import useUploadFile from '../../hooks/useUploadFile';
import { updateProfileMutation, userProfileQuery } from '../../graphql/user';
import { useMutation, useQuery } from '@apollo/react-hooks';

const diff = (obj, compareWith) => {
  const keys = Object.keys(obj);
  const diffValue = {};
  keys.forEach(k => {
    if (!Object.is(obj[k], compareWith[k])) {
      diffValue[k] = obj[k];
    }
  });
  return diffValue;
};

const flatUser = u => ({
  name: u.profile.name || '',
  username: u.username,
  intro: u.profile.intro || '',
  avatar: u.profile.avatar || ''
});

const Profile = () => {
  const [currentUser, { login, saveUserData }] = useCurrentUser();
  const { refetch } = useQuery(userProfileQuery, {
    variables: { username: currentUser.username }
  });
  const currentUserInfo = flatUser(currentUser);
  const [userData, setUserData] = useState(currentUserInfo);
  const taskIdRef = useRef({});
  const lastChange = useRef(currentUserInfo);
  const inputRef = useRef(null);
  const [updateProfile, { loading: updating }] = useMutation(
    updateProfileMutation,
    {
      variables: { ...diff(userData, lastChange.current) },
      onCompleted({ updateProfile }) {
        saveUserData(updateProfile);
        lastChange.current = flatUser(updateProfile);
      }
    }
  );
  const [uploadImage] = useUploadFile();

  const handleChangeUsername = username => {
    setUserData({
      ...userData,
      username
    });
    handleUpdateProfile();
  };

  const handleChangeName = name => {
    setUserData({
      ...userData,
      name
    });
    handleUpdateProfile();
  };

  const handleChangeIntro = intro => {
    setUserData({
      ...userData,
      intro
    });
    handleUpdateProfile();
  };

  const handleChangeAvatar = async ({
    target: {
      files: [file],
      validity
    }
  }) => {
    if (validity) {
      const result = await uploadImage({ variables: { file } });
      setUserData({
        ...userData,
        avatar: result.data.singleUpload.path
      });
      handleUpdateProfile();
    }
  };

  const handleUpdateProfile = () => {
    if (taskIdRef.current.taskId) {
      clearTimeout(taskIdRef.current.taskId);
    }
    taskIdRef.current.taskId = setTimeout(updateProfile, 1500);
  };

  useEffect(() => {
    refetch().then(({ data: { user } }) => {
      setUserData(flatUser(user));
      lastChange.current = flatUser(user);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="root">
      <Header
        leftChild={
          <div>
            {updating && <div>Saving...</div>}
            {!updating && <div>Auto save</div>}
          </div>
        }
      />
      <div className="container mx-auto mt-24">
        {login && (
          <div className="flex items-center">
            <div className="relative bg-gray-600 hover:bg-gray-900 rounded-full">
              <Avatar
                className="opacity-80"
                name={userData.name}
                size="xl"
                imageUrl={userData.avatar}
              />
              <div className="absolute top-0 w-full h-full flex justify-center items-center">
                <input
                  type="file"
                  id="post-preview-input"
                  accept="image/*"
                  onChange={handleChangeAvatar}
                  hidden
                  ref={inputRef}
                />
                <button
                  className="btn w-full h-full"
                  onClick={() => inputRef.current.click()}
                >
                  <i className="material-icons text-5xl text-white">
                    cloud_upload
                  </i>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <div>
                <input
                  className="text-2xl font-bold outline-none"
                  value={userData.name}
                  onChange={event => handleChangeName(event.target.value)}
                />
              </div>
              <div>
                @
                <input
                  className="text-blue-800 outline-none"
                  value={userData.username}
                  onChange={event => handleChangeUsername(event.target.value)}
                />
              </div>
              <div>
                <input
                  className="text-gray-800 outline-none"
                  value={userData.intro}
                  placeholder="What next?"
                  onChange={event => handleChangeIntro(event.target.value)}
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Profile);
