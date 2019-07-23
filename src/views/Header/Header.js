import React from 'react';
import { NavLink } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import AppBar from '../../components/AppBar/AppBar';

function MyHeader({ leftChild }) {
  const [currentUser, { login }] = useCurrentUser();

  if (login) {
    return (
      <AppBar border>
        <div className="inline-block">
          <NavLink to="/">
            <div className="flex items-center">
              <img
                className="rounded-b-full w-8 h-8 block"
                src="/logo.jpg"
                alt="ISLING"
              />
              <div className="uppercase ml-2 text-xl font-bold text-gray-900">
                isling
              </div>
            </div>
          </NavLink>
        </div>
        <div className="flex-1 pl-4">{leftChild}</div>
        <div className="justify-end block">
          <div className="dropdown cursor-pointer">
            <img
              className="rounded-full w-8 h-8 block"
              src={currentUser.profile.avatar}
              alt={currentUser.profile.name}
            />
            <div className="dropdown-content dropdown-content-center m-2 shadow rounded-sm bg-white border border-gray-300 w-48 text-gray-900">
              <div className="block pt-6 pb-2">
                <NavLink to="/me">
                  <div className="text-center text-lg font-bold">
                    {currentUser.profile.name}
                  </div>
                  <div className="text-center text-gray-600">
                    {currentUser.username && <div>@{currentUser.username}</div>}
                  </div>
                </NavLink>
              </div>
              <div className="border-t border-gray-200 mt-2 mb-2" />
              <div className="block">
                <NavLink to="/new-post">
                  <div className="py-1 px-6">New post</div>
                </NavLink>
                <NavLink to="/me/posts/draft">
                  <div className="py-1 px-6">Posts</div>
                </NavLink>
              </div>
              <div className="border-t border-gray-200 mt-2 mb-2" />
              <div className="block pb-2">
                <NavLink to="/signout">
                  <div className="py-1 px-6">Sign out</div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </AppBar>
    );
  }

  return (
    <AppBar border>
      <div className="brand inline-block">
        <NavLink to="/">
          <div className="flex items-center">
            <img
              className="rounded-b-full w-8 h-8"
              src="/logo.jpg"
              alt="ISLING"
            />
            <div className="text text-xl font-bold text-gray-900">isling</div>
          </div>
        </NavLink>
      </div>
      <div className="flex w-full justify-end">
        <NavLink
          to="/signin"
          className="border border-blue-800 text-blue-800 hover:text-white hover:bg-blue-800 p-1 px-3 rounded-full"
        >
          Sign in
        </NavLink>
      </div>
    </AppBar>
  );
}

export default MyHeader;
