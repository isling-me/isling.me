import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { popularPostsQuery } from '../../../graphql/post';
import PostCard from '../../../components/PostCardMini/PostCardMini';
import { formatPostForCard } from '../../../helpers/post';

function SectionPopular() {
  const { data } = useQuery(popularPostsQuery);

  return (
    <div className="pt-6">
      <div className="container">
        <div className="p-6 pl-2">
          {data &&
            data.popularPosts &&
            data.popularPosts.map(formatPostForCard).map((p, idx) => (
              <div className="pb-5" key={p.slug}>
                <PostCard index={`0${idx + 1}`} {...p} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SectionPopular;
