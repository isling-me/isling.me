import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PostCard(props) {
  const {
    title,
    description,
    publishedDate,
    preview,
    readingTime,
    link,
    author,
    topic,
    className
  } = props;
  return (
    <div className={`postCard w-full ${className}`}>
      <Link to={link}>
        <div className="flex">
          {preview && (
            <div className="w-4/12 mr-4 lg:w-6/12 lg:mr-6">
              <div
                className="w-full h-full float-right clearfix lg:h-full lg:w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${preview})` }}
              />
            </div>
          )}
          <div className="flex-1">
            <div className="w-full">
              <div className="text-base lg:text-xl font-semibold mt-0 text-gray-900 line-height-100">
                {title}
              </div>
              <div className="mt-1 text-gray-700 text-xs lg:text-base font-light line-height-120 lg:line-height-140">
                {description}
              </div>
            </div>
            <div className="mt-1">
              <div className="text-xs lg:text-base my-0 -mt-1">
                <Link
                  to={`${author.link}`}
                  className="link hover:underline focus:underline"
                >
                  {author.name}
                </Link>
                {topic && (
                  <Fragment>
                    <div className="px-1 inline">in</div>
                    <Link
                      to={`${topic.link}`}
                      className="link hover:underline focus:underline"
                    >
                      {topic.name}
                    </Link>
                  </Fragment>
                )}
              </div>
              <div className="text-xs lg:text-sm font-light my-0">
                <time className="inline">{publishedDate}</time>
                <div className="inline px-1 middotDivider text-xs font-semibold" />
                <div className="inline">{readingTime}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  publishedDate: PropTypes.string.isRequired,
  preview: PropTypes.string,
  readingTime: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired,
  topic: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  })
};

export default PostCard;
