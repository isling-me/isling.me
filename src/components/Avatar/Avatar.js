import React from 'react';
import { Link } from 'react-router-dom';

const sizeCustomDefault = { width: 8, textSize: 'xl' };

const Avatar = ({
  className,
  link,
  imageUrl,
  name,
  size = 'md',
  sizeCustom = sizeCustomDefault
}) => {
  const sizeConfig = {
    sm: {
      width: 8,
      textSize: 'xl'
    },
    md: {
      width: 12,
      textSize: '2xl'
    },
    lg: {
      width: 16,
      textSize: '3xl'
    },
    xl: {
      width: 24,
      textSize: '4xl'
    },
    custom: sizeCustom
  };

  const chooseSize = size in sizeConfig ? size : 'md';

  return (
    <div className={className}>
      <Link to={link ? link : '#'}>
        {imageUrl ? (
          <img
            className={`rounded-full w-${sizeConfig[chooseSize].width} h-${
              sizeConfig[chooseSize].width
            } block`}
            src={imageUrl}
            alt={name}
          />
        ) : (
          <div
            className={`rounded-full w-${sizeConfig[chooseSize].width} h-${
              sizeConfig[chooseSize].width
            } block bg-blue-600 flex justify-center items-center`}
          >
            <div
              className={`text-${
                sizeConfig[chooseSize].textSize
              } font-semibold text-white`}
            >
              {name.charAt(0)}
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default Avatar;
