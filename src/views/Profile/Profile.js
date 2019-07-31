import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Header from '../Header/Header';
import Avatar from '../../components/Avatar/Avatar';
import useCurrentUser from '../../hooks/useCurrentUser';
import { userProfileQuery } from '../../graphql/user';
import { userPostsQuery } from '../../graphql/post';
import { useQuery } from '@apollo/react-hooks';
import { formatPublishedDate, makePostUri } from '../../helpers/post';

const Profile = ({ match }) => {
  const { username } = match.params;
  const [currentUser, { login }] = useCurrentUser();
  const { data } = useQuery(userProfileQuery, {
    variables: { username },
    fetchPolicy: 'cache-and-network'
  });
  const { data: postsData } = useQuery(userPostsQuery, {
    variables: { username }
  });
  const getProfileEditorUrl = () => '/me/profile/edit';

  const isOwner = login && currentUser.username === username;

  return (
    <div className="root">
      <Header
        rightChild={
          isOwner && (
            <Link
              className="btn btn-outline btn-pill"
              to={getProfileEditorUrl()}
            >
              Edit profile
            </Link>
          )
        }
      />
      <div className="container mx-auto mt-24">
        {data && data.user && (
          <div className="flex items-center">
            <Avatar
              name={data.user.profile.name}
              size="xl"
              imageUrl={data.user.profile.avatar}
            />
            <div className="ml-4">
              <div className="text-2xl font-bold">{data.user.profile.name}</div>
              <div className="text-gray-800">{data.user.profile.intro}</div>
            </div>
          </div>
        )}
        <div className="pt-16">
          <div className="border-b border-gray-300 text-2xl font-bold">
            <p className="inline-block border-b border-gray-900 py-2">
              Published posts
            </p>
          </div>
          <div>
            {postsData &&
              postsData.user &&
              postsData.user.posts.items.map(p => (
                <div key={p.id} className="py-4 border-b border-gray-300">
                  <Link to={makePostUri(p.slug, p.id)}>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-gray-800">{p.description}</div>
                    <div className="text-gray-600 text-sm">
                      {`Published at ${formatPublishedDate(p.publishedDate)}`}
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Profile);
