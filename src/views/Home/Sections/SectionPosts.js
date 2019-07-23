import React, { useState, useEffect } from 'react';
import PostCard from '../../../components/PostCard/PostCard';
import { postsQuery } from '../../../graphql/post';
import { formatPostForCard } from '../../../helpers/post';
import { useQuery } from '@apollo/react-hooks';

function SectionPosts() {
  const { loading, error, data = {} } = useQuery(postsQuery);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data.posts) {
      const newPosts = data.posts.items.map(formatPostForCard);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
    }
  }, [data.posts]);

  return (
    <div className="lg:py-10">
      <div className="lg:pr-6">
        {(() => {
          if (loading) {
            return <div>Loading...</div>;
          }

          if (error) {
            return <div>Error</div>;
          }

          return posts.map(p => (
            <div className="mb-6 lg:mb-12" key={`${p.slug}-${p.id}`}>
              <PostCard {...p} />
            </div>
          ));
        })()}
      </div>
    </div>
  );
}

export default SectionPosts;
