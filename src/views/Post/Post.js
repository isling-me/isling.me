import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { postQuery } from '../../graphql/post';
import NavBar from '../../components/NavBar/NavBar';
import { makeUserUri } from '../../helpers/user';
import { formatPublishedDate } from '../../helpers/post';
import { makeTopicUri } from '../../helpers/topic';
import { useQuery } from '@apollo/react-hooks';
import Header from '../Header/Header';
import Avatar from '../../components/Avatar/Avatar';
import '../../components/MediumEditor/lib/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin-frontend.css';

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
        <Header
          leftChild={
            data &&
            data.post && (
              <div>
                <Link
                  to={
                    data.post.topic ? makeTopicUri(data.post.topic.slug) : '/'
                  }
                  className="text-lg border-l border-gray-300 pl-4 text-gray-800"
                >
                  {data.post.topic ? data.post.topic.name : 'Home'}
                </Link>
              </div>
            )
          }
        />
      </div>
      <div className="container mx-auto pb-24">
        <div className="post mx-auto">
          <div className="postContent px-6 lg:px-0 pt-6 lg:pt-24">
            {(() => {
              if (loading) {
                return <div>Loading...</div>;
              }

              if (error) {
                return <div>Error{console.log(error)}</div>;
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
                    <Avatar
                      imageUrl={post.author.profile.avatar}
                      name={post.author.profile.name}
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
                    className="markdown text-justify text-base post-present"
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
