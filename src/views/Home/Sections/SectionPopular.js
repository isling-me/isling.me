import React from "react";
import PropTypes from 'prop-types';
import PostCard from '../../../components/PostCardMini/PostCardMini';

function SectionPopular(props) {
  const { posts } = props;
  return (
    <div className="pt-6">
      <div className="container">
        <div className="p-6">
          {posts.map((p, idx) => (
            <div className="pb-5" key={p.slug}>
              <PostCard
                index={`0${idx + 1}`}
                {...p}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

SectionPopular.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default SectionPopular;
