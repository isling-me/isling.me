import React from 'react';
import { logout } from '../../helpers/auth';
import Header from '../Header/Header';

function Logout() {
  logout();
  window.location.replace('/');

  return <Header />;
}

export default Logout;
