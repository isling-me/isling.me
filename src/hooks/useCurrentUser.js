import { useState } from 'react';
import { currentUserQuery } from '../graphql/user';
import { useQuery } from '@apollo/react-hooks';
import { logout, getUserData, saveUserData } from '../helpers/auth';

function useCurrentUser() {
  const cachedData = getUserData();

  const [currentUser, setCurrentUser] = useState(cachedData);
  const { error } = useQuery(currentUserQuery, {
    onCompleted({ me }) {
      setCurrentUser(me);
      saveUserData(me);
    },
    onError() {
      logout();
      setCurrentUser(null);
    },
    skip: !!cachedData
  });

  return [currentUser, { error, login: currentUser !== null }];
}

export default useCurrentUser;
