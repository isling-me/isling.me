import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { loginMutation } from '../../graphql/auth';
import { saveAuthToken, getAuthToken } from '../../helpers/auth';

const Login = ({ history }) => {
  const cachedToken = getAuthToken;

  if (typeof cachedToken === 'string') {
    history.push('/');
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(loginMutation, {
    variables: {
      email: username,
      password
    },
    onCompleted(data) {
      saveAuthToken(data.login.token);
      history.push('/');
    }
  });

  const handleChangeUsername = newUsername => setUsername(newUsername);
  const handleChangePassword = newPassword => setPassword(newPassword);

  const handleLogin = e => {
    e.preventDefault();
    login();
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="w-3/12">
          <div className="border-gray-300 border mx-auto my-auto p-12">
            <div className="mb-4 font-bold text-xl">Login</div>
            {error && <div>Error</div>}
            <form className="block w-full mt-4">
              <div className="flex items-center mt-1 mb-4">
                <div className="inline-block float-right w-full">
                  <input
                    placeholder="Email"
                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    id="username"
                    value={username}
                    onChange={e => handleChangeUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center mb-2 mt-2">
                <div className="inline-block float-right w-full">
                  <input
                    placeholder="Password"
                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="Password"
                    id="password"
                    value={password}
                    onChange={e => handleChangePassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-6">
                <input
                  type="button"
                  value="Sign in"
                  className="bg-blue-800 hover:bg-blue-800 cursor-pointer text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleLogin}
                  disabled={loading}
                />
              </div>
            </form>
          </div>
          <p className="text-center text-gray-500 text-xs pt-2 text-lg">
            &copy;2019 Isling. All rights reserved.
          </p>
          <div className="h-24" />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
