import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Header from '../Header/Header';
import { topicQuery, topicLightQuery } from '../../graphql/topic';
import { useQuery } from '@apollo/react-hooks';
import { formatPostForCard } from '../../helpers/post';
import { makeTopicUri } from '../../helpers/topic';
import PostCardLarge from '../../components/PostCard/PostCardLarge';
import PostCard from '../../components/PostCard/PostCard';

const Profile = ({ match }) => {
  const { slug } = match.params;
  const { data } = useQuery(topicQuery, {
    variables: { slug },
    fetchPolicy: 'cache-and-network'
  });
  const { data: dataLight } = useQuery(topicLightQuery, {
    variables: { slug }
  });

  return (
    <div className="root">
      <Header
        leftChild={
          dataLight &&
          dataLight.topic && (
            <Link
              to={makeTopicUri(dataLight.topic.slug)}
              className="text-lg border-l border-gray-300 pl-4 text-gray-800"
            >
              {dataLight.topic.name}
            </Link>
          )
        }
      />
      <div className="container mx-auto mt-24">
        <div className="flex">
          <div className="w-8/12 pr-4">
            {data &&
              data.topic &&
              data.topic.posts.items
                .slice(0, 1)
                .map(formatPostForCard)
                .map(post => <PostCardLarge {...post} key={post.id} />)}
            {data && data.topic && data.topic.posts.items.length > 1 && (
              <div className="pt-8">
                <div className="border-b border-gray-300 text-md font-bold">
                  <p className="inline-block border-b border-gray-900 py-2">
                    Latest
                  </p>
                </div>
                <div>
                  {data.topic.posts.items
                    .slice(1)
                    .map(formatPostForCard)
                    .map(post => (
                      <div className="py-4" key={post.id}>
                        <PostCard {...post} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 pl-8">
            {data && data.topic && (
              <div className="border-b border-gray-300 pb-4">
                <div className="text-2xl font-semibold">{data.topic.name}</div>
                <div className="pt-1">
                  {data.topic.posts.total === 0 && (
                    <p className="text-gray-600 font-base">
                      This topic is empty
                    </p>
                  )}
                  {data.topic.posts.total === 1 && (
                    <p className="text-gray-600 font-base">
                      There is 1 post in this topic
                    </p>
                  )}
                  {data.topic.posts.total > 1 && (
                    <p className="text-gray-600 font-base">
                      There are {data.topic.posts.total} posts in this topic
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Profile);
