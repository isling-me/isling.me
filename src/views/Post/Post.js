import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { postQuery } from '../../graphql/post';
import NavBar from '../../components/NavBar/NavBar';
import { makeUserUri } from '../../helpers/user';
import { formatPublishedDate } from '../../helpers/post';
import { useQuery } from '@apollo/react-hooks';
import Header from '../Header/Header';

function Post({ match }) {
  const { id } = match.params;
  const { loading, error, data } = useQuery(postQuery, {
    variables: {
      postId: id
    }
  });

  return (
    <div className="root">
      <div className="lg:hidden">
        <NavBar />
      </div>
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="container mx-auto pb-24">
        <div className="post mx-auto">
          <div className="postContent px-6 lg:px-0 pt-6 lg:pt-24">
            {(() => {
              if (loading) {
                return <div>Loading...</div>;
              }

              if (error) {
                return <div>Error</div>;
              }

              const { post } = data;
              return (
                <Fragment>
                  <div className="title text-3xl lg:text-4xl text-justify">
                    {post.title}
                  </div>
                  {/*<div className="pt-1 text-base text-gray-700">*/}
                  {/*  {post.caption}*/}
                  {/*</div>*/}
                  <div className="flex bg-white rounded-lg pt-8 pb-8 author items-center">
                    <img
                      className="w-10 h-10 rounded-full mx-auto"
                      alt="avatar"
                      src={post.author.profile.avatar}
                    />
                    <div className="text-left flex-1 pl-2">
                      <Link
                        to={makeUserUri(post.author.id, post.author.username)}
                      >
                        <div className="leading-tight">
                          {post.author.profile.name}
                        </div>
                      </Link>
                      <div className="info">
                        <div className="text-gray-600 text-xs leading-tight inline">
                          {formatPublishedDate(post.publishedDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="markdown text-justify text-base"
                    dangerouslySetInnerHTML={{ __html: post.content.text }}
                  />
                </Fragment>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Post);
