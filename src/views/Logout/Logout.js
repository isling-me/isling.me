import React from 'react';
import { withRouter } from 'react-router-dom';
import { logout } from '../../helpers/auth';

function Logout({ history }) {
  logout();
  window.location.replace('/');

  return <div>Logout</div>;
}

export default withRouter(Logout);
