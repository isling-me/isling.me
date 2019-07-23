import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PostCardMini(props) {
  const {
    index,
    title,
    publishedDate,
    readingTime,
    link,
    author,
    topic
  } = props;
  return (
    <div className="flex-grow">
      <Link to={link}>
        <div className="flex">
          <div className="mr-3">
            <h4 className="text-5xl font-normal text-gray-300 leading-none">
              {index}
            </h4>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-base">{title}</div>
            <div className="pt-0">
              <div className="text-sm">
                <Link
                  to={`${author.link}`}
                  className="link hover:underline focus:underline"
                >
                  {author.name}
                </Link>
                <div className="inline px-1">in</div>
                <Link
                  to={`${topic.link}`}
                  className="link hover:underline focus:underline"
                >
                  {topic.name}
                </Link>
              </div>
              <div className="text-xs font-light">
                <time className="inline">{publishedDate}</time>
                <div className="middotDivider px-1 inline" />
                <div className="inline">{readingTime}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

PostCardMini.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  publishedDate: PropTypes.string.isRequired,
  readingTime: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired,
  topic: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired
};

export default PostCardMini;
