import React from 'react';
import PropTypes from 'prop-types';
// core components
import PostCard from '../../../components/PostCard/PostCard';

function SectionPosts(prop) {
  const { posts } = prop;
  return (
    <div className="lg:py-10">
      <div className="lg:pr-6">
        {posts.map(p => (
          <div className="mb-6 lg:mb-12" key={p.slug}>
            <PostCard {...p} />
          </div>
        ))}
      </div>
    </div>
  );
}

SectionPosts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default SectionPosts;
