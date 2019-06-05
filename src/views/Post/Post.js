import React, { Fragment, useEffect, useState } from 'react';
import MarkDown from 'react-markdown';
import { withRouter, Link } from 'react-router-dom';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import { getOnePost } from '../../api';

function App({ match }) {
  const { slug } = match.params;

  const [post, setPost] = useState(null);

  useEffect(() => {
    // getDataBySlug
    getOnePost(slug)
      .then((res) => {
        setPost((prev) => ({
          ...prev,
          ...res.data,
        }));
      })
      .catch(e => {
        alert(e.error.message);
      });
  }, [slug]);

  return (
    <Fragment>
      <LeftSideBar/>
      <div className="container m-auto">
        <div className="post m-auto">
          {post && (
            <div className="postContent px-6 lg:px-0">
              <div className="title text-2xl lg:text-3xl pt-6 lg:pt-24 text-justify">
                {post.title}
              </div>
              <div className="pt-1 text-base text-gray-700">
                {post.caption}
              </div>
              <div className="flex bg-white rounded-lg pt-4 pb-4 author items-center">
                <img className="w-10 h-10 rounded-full mx-auto" alt="no description" src={post.author.avatar}/>
                <div className="text-left flex-1 pl-2">
                  <Link to={post.author.link}>
                    <div className="leading-tight">
                      {post.author.name}
                    </div>
                  </Link>
                  <div className="info">
                    <div className="text-gray-600 text-xs leading-tight inline">
                      {post.publishedDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="markdown text-justify text-base">
                <MarkDown source={post.content || ''}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(App);
