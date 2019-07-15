import { AUTH_TOKEN, USER_DATA } from '../constants';

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(USER_DATA);
};

export const saveAuthToken = token => {
  localStorage.setItem(AUTH_TOKEN, token);
};

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN);

export const saveUserData = userData => {
  localStorage.setItem(USER_DATA, JSON.stringify(userData));
};

export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA);

  try {
    return JSON.parse(userData);
  } catch (e) {
    localStorage.removeItem(USER_DATA);
    return null;
  }
};
