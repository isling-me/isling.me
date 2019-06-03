import React from 'react';
import { Link } from 'react-router-dom';

function LeftSideBar() {
  return (
    <div className="leftSideBar bottom-0 w-full fixed desktop:w-0 desktop:top-0">
      <div className="component bg-gray-800 bg-transparent w-full flex justify-center desktop:w-24 desktop:m-6 desktop:justify-start desktop:bg-transparent">
        <Link to="/">
          <img className="m-1 rounded-full w-10 h-10 desktop:rounded-t-lg desktop:w-10 desktop:h-10" src="/logo.jpg" alt="ISLING"/>
        </Link>
      </div>
    </div>
  )
}

export default LeftSideBar;
