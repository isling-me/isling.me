import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <div className="sideBar fixed w-0 top-0">
      <div className="z-50 w-40 m-12 justify-start bg-transparent">
        <div className="brand inline-block">
          <Link to="/">
            <div className="flex items-center">
              <img
                className="rounded-b-full w-10 h-10"
                src="/logo.jpg"
                alt="ISLING"
              />
              <div className="text text-xl font-bold text-gray-900">isling</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
