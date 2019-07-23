import React from 'react';

const FullScreenDialog = ({ children, title, onClose, visible = true }) => {
  return (
    <div
      className={`fixed left-0 top-0 bg-white z-40 w-screen h-full bg-white${!visible &&
        ' hidden'}`}
    >
      <div className="container mx-auto mt-40">
        <div className="flex items-center mb-8">
          <div className="flex-1 text-gray-600 text-base">{title}</div>
          <div className="float-right">
            <i
              className="material-icons text-gray-500 cursor-pointer"
              onClick={onClose}
            >
              close
            </i>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FullScreenDialog;
