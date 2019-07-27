import React from 'react';
import PostCard from '../../../components/PostCard/PostCard';
import { postsQuery } from '../../../graphql/post';
import { formatPostForCard } from '../../../helpers/post';
import { useQuery } from '@apollo/react-hooks';

function SectionPosts() {
  const { error, data = {} } = useQuery(postsQuery, {
    fetchPolicy: 'cache-and-network'
  });

  return (
    <div className="lg:py-10">
      <div className="lg:pr-6">
        {(() => {
          if (!data || !data.posts) {
            return <div>Loading...</div>;
          }

          if (error) {
            return <div>Error</div>;
          }

          return data.posts.items.map(formatPostForCard).map(p => (
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
