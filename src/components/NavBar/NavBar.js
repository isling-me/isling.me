import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="bottom-0 w-full fixed lg:w-0 lg:top-0">
      <div className="z-50 bg-gray-800 bg-transparent w-full flex justify-center lg:w-24 lg:m-6 lg:justify-start lg:bg-transparent">
        <Link to="/">
          <img className="m-1 rounded-full w-10 h-10 lg:rounded-t-lg lg:w-10 lg:h-10" src="/logo.jpg" alt="ISLING"/>
        </Link>
      </div>
    </div>
  )
}

export default NavBar;
