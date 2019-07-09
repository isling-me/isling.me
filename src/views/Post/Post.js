import React, { Fragment } from 'react';
import MarkDown from 'react-markdown';
import { withRouter, Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { postQuery } from '../../graphql/post';
import { makeUserUri } from '../../helpers/user';
import { formatPublishedDate } from '../../helpers/post';

function Post({ match }) {
  const { id } = match.params;

  return (
    <Fragment>
      <div className="lg:hidden">
        <NavBar />
      </div>
      <div className="hidden lg:block">
        <SideBar />
      </div>
      <div className="container m-auto">
        <div className="post m-auto">
          <Query query={postQuery} variables={{ postId: id }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <div>Loading...</div>;
              }

              if (error) {
                return <div>Error</div>;
              }

              const { post } = data;
              return (
                <div className="postContent px-6 lg:px-0">
                  <div className="title text-3xl lg:text-4xl pt-6 lg:pt-24 text-justify">
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
                  <div className="markdown text-justify text-base">
                    <MarkDown source={post.content.text} />
                  </div>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(Post);
