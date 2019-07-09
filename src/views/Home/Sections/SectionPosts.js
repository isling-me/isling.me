import React from 'react';
import { Query } from 'react-apollo';
import PostCard from '../../../components/PostCard/PostCard';
import { postsQuery } from '../../../graphql/post';
import { formatPublishedDate, makePostUri } from '../../../helpers/post';
import { makeUserUri } from '../../../helpers/user';
import { makeTopicUri } from '../../../helpers/topic';

function SectionPosts(prop) {
  return (
    <div className="lg:py-10">
      <div className="lg:pr-6">
        <Query query={postsQuery}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }

            if (error) {
              return <div>Error</div>;
            }

            const posts = data.posts.items.map(p => ({
              ...p,
              link: makePostUri(p.slug, p.id),
              author: {
                name: p.author.profile.name,
                link: makeUserUri(p.author.id, p.author.username)
              },
              topic: {
                name: p.topic.name,
                link: makeTopicUri(p.topic.slug)
              },
              readingTime: `${p.readingTime} min`,
              publishedDate: formatPublishedDate(new Date(p.publishedDate))
            }));

            return posts.map(p => (
              <div className="mb-6 lg:mb-12" key={p.slug}>
                <PostCard {...p} />
              </div>
            ));
          }}
        </Query>
      </div>
    </div>
  );
}

export default SectionPosts;
