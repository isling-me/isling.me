import React, { Fragment } from 'react';
import PostCard from '../../../components/PostCard/PostCard';
import PostCardLarge from '../../../components/PostCard/PostCardLarge';
import { postsQuery } from '../../../graphql/post';
import { formatPostForCard } from '../../../helpers/post';
import { useQuery } from '@apollo/react-hooks';

function SectionPosts() {
  const { data } = useQuery(postsQuery, {
    fetchPolicy: 'cache-and-network'
  });

  return (
    <div>
      {(() => {
        if (!data || !data.posts) {
          return <div>Loading...</div>;
        }

        return (
          <Fragment>
            {data.posts.items
              .slice(0, 1)
              .map(formatPostForCard)
              .map(p => (
                <div className="mb-6 lg:mb-8" key={`${p.slug}-${p.id}`}>
                  <PostCardLarge {...p} />
                </div>
              ))}

            {data.posts.items.length > 1 && (
              <Fragment>
                <div className="border-b border-gray-300 text-md font-bold mb-4">
                  <p className="inline-block border-b border-gray-900 py-2">
                    Latest
                  </p>
                </div>
                {data.posts.items
                  .slice(1)
                  .map(formatPostForCard)
                  .map(p => (
                    <div className="mb-6 lg:mb-12" key={`${p.slug}-${p.id}`}>
                      <PostCard {...p} />
                    </div>
                  ))}
              </Fragment>
            )}
          </Fragment>
        );
      })()}
    </div>
  );
}

export default SectionPosts;
