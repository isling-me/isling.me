import { useState } from 'react';
import { currentUserQuery } from '../graphql/user';
import { useQuery } from '@apollo/react-hooks';
import {
  logout,
  getUserData,
  saveUserData,
  getAuthToken
} from '../helpers/auth';

function useCurrentUser() {
  const token = getAuthToken();
  const cachedData = getUserData();

  const [currentUser, setCurrentUser] = useState(cachedData);
  const { error } = useQuery(currentUserQuery, {
    onCompleted({ me }) {
      setCurrentUser(me);
      saveUserData(me);
    },
    onError(error) {
      if (
        error.message &&
        (error.message.includes('unauthorized') ||
          error.message.includes('jwt expired'))
      ) {
        logout();
        setCurrentUser(null);
      }
    },
    skip: !token
  });

  if (!token) {
    return [null, { login: false }];
  }

  return [currentUser, { error, login: currentUser !== null, saveUserData }];
}

export default useCurrentUser;
