import React from 'react';

function AppBar({ children, border }) {
  return (
    <header
      className={`fixed w-screen top-0 z-40 bg-white${border &&
        ' border-b border-gray-300'}`}
    >
      <div className="container mx-auto h-12">
        <div className="flex flex-grow items-center h-full">{children}</div>
      </div>
    </header>
  );
}

export default AppBar;
