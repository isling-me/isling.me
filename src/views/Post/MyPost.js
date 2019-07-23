import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import { ownPostsQuery } from '../../graphql/user';
import { deletePostMutation, unpublishPostMutation } from '../../graphql/post';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { stripHtml, timeDifference } from '../../helpers/utils';
import { formatPublishedDate } from '../../helpers/post';

function totalPosts(data) {
  return data && data.me ? data.me.posts.total : 0;
}

const pageInit = { first: 5, skip: 0 };
const isStateDraft = state => state === 'draft';
const isStatePublished = state => state === 'published';

function MyPost({ match }) {
  const { state } = match.params;
  const [page, setPage] = useState(pageInit);
  const { data, loading, refetch, networkStatus } = useQuery(ownPostsQuery, {
    variables: {
      state: state.toUpperCase(),
      page,
      orderBy: isStateDraft(state) ? 'updatedAt_DESC' : 'publishedDate_DESC'
    }
  });
  const [deletePost, { loading: deleting }] = useMutation(deletePostMutation, {
    onCompleted() {
      refetch({ skip: deleting });
    },
    onError() {
      refetch();
    }
  });

  const [unpublishPost] = useMutation(unpublishPostMutation, {
    refetchQueries() {
      return [
        {
          query: ownPostsQuery,
          variables: {
            state: 'DRAFT',
            page: pageInit,
            orderBy: 'updatedAt_DESC'
          }
        }
      ];
    },
    onCompleted() {
      refetch();
    }
  });

  const nextPage = () => {
    setPage(prev => ({
      first: prev.first,
      skip: prev.skip + prev.first
    }));
    refetch();
  };

  const prevPage = () => {
    setPage(prev => ({
      first: prev.first,
      skip: prev.skip - prev.first
    }));
    refetch();
  };

  const handleDeletePost = id => {
    deletePost({ variables: { postId: id } });
  };

  const handleUnpublishPost = id => {
    unpublishPost({ variables: { postId: id } });
  };

  useEffect(() => {
    setPage(pageInit);
  }, [state]);

  return (
    <div className="root">
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="container mx-auto mt-24">
        <div className="flex items-center clearfix mb-6">
          <div className="flex-1 items-center">
            <h1>Your posts</h1>
          </div>
          <Link to="/new-post" className="btn btn-pill btn-outline">
            New post
          </Link>
        </div>
        <div className="border-b border-gray-300 inline-block w-full">
          <Link
            to="/me/posts/draft"
            className={`float-left mr-3 py-2 ${
              isStateDraft(state) ? 'border-b border-gray-900' : 'text-gray-600'
            }`}
          >
            Drafts
          </Link>
          <Link
            to="/me/posts/published"
            className={`float-left mr-3 py-2 ${
              isStatePublished(state)
                ? 'border-b border-gray-900'
                : 'text-gray-600'
            }`}
          >
            Published
          </Link>
          <div className="flex float-right items-center py-2">
            <button
              onClick={prevPage}
              disabled={page.skip <= 0 || loading}
              className="btn-base"
            >
              Back
            </button>
            <div className="mx-4">
              <p>
                {page.skip + page.first} / {totalPosts(data)}
              </p>
            </div>
            <button
              onClick={nextPage}
              disabled={page.skip + page.first >= totalPosts(data) || loading}
              className="btn-base"
            >
              Next
            </button>
          </div>
        </div>
        {(() => {
          if (networkStatus === 4) {
            return <div>Refetching</div>;
          }
          if (loading) {
            return <div>Loading...</div>;
          }

          return data.me.posts.items.map(post => (
            <div
              className="py-4 border-b border-gray-300 flex items-center"
              key={`${post.slug}-${post.id}`}
            >
              <div className="w-10/12">
                <Link
                  to={
                    isStateDraft(state)
                      ? `/p/${post.id}/edit`
                      : `/posts/${post.slug}/${post.id}`
                  }
                >
                  <h3 className="text-gray-900">{post.title}</h3>
                  <div className="text-gray-700 break-words truncate">
                    {stripHtml(post.content.text, ' ')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isStateDraft(state) &&
                      `Last edited ${timeDifference(post.updatedAt)} ago`}
                    {isStatePublished(state) &&
                      `Published at ${formatPublishedDate(post.publishedDate)}`}
                  </div>
                </Link>
              </div>
              <div className="flex items-center justify-end pl-4 w-full">
                <Link to={`/p/${post.id}/edit`} className="mr-2">
                  <i className="material-icons text-gray-700 cursor-pointer block">
                    create
                  </i>
                </Link>
                {isStatePublished(state) && (
                  <i
                    className="material-icons text-gray-700 cursor-pointer block mr-2"
                    onClick={() => handleUnpublishPost(post.id)}
                  >
                    drafts
                  </i>
                )}
                <i
                  className="material-icons text-red-500 cursor-pointer block"
                  onClick={() => handleDeletePost(post.id)}
                >
                  delete_sweep
                </i>
              </div>
            </div>
          ));
        })()}
      </div>
    </div>
  );
}

export default withRouter(MyPost);
