import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { topicsSearchQuery } from '../../graphql/topic';
import {
  publishPostMutation,
  postQuery,
  ownPostPreviewQuery
} from '../../graphql/post';
import useUploadFile from '../../hooks/useUploadFile';
import FullScreenDialog from '../../components/Dialog/FullScreenDialog';
import { makePostUri } from '../../helpers/post';

const maxLengthDescription = 140;
const topicRandom = { name: 'Random' };

const PostPublish = ({ openDialog, onCloseDialog, post, history }) => {
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');
  const [topic, setTopic] = useState(topicRandom);
  const [showItems, setShowItems] = useState(false);
  const [postLink, setPostLink] = useState(false);
  const { data, refetch, loading } = useQuery(topicsSearchQuery, {
    variables: { filter: topic.name }
  });
  const [uploadImage, { loading: uploading }] = useUploadFile();
  const [publishPost] = useMutation(publishPostMutation, {
    variables: {
      postId: post.id,
      preview,
      description,
      topic: topic.id
    },
    onCompleted({ updatePost }) {
      setPostLink(true);
      setTimeout(
        () => history.push(makePostUri(updatePost.slug, updatePost.id)),
        1000
      );
    },
    update(
      cache,
      {
        data: { updatePost }
      }
    ) {
      cache.writeQuery({
        query: postQuery,
        variables: { postId: updatePost.id },
        data: {
          post: {
            ...updatePost
          }
        }
      });
    },
    refetchQueries() {
      return ['postsQuery', 'ownPostsDraftQuery', 'ownPostsPublishedQuery'];
    }
  });
  const { refetch: fetchPublishInfo } = useQuery(ownPostPreviewQuery, {
    variables: { postId: post.id }
  });

  const onChangeDescription = newDes => {
    if (newDes.length > maxLengthDescription) {
      return;
    }

    setDescription(newDes);
  };

  const onChangePostPreview = async ({
    target: {
      files: [file],
      validity
    }
  }) => {
    if (validity.valid) {
      const result = await uploadImage({
        variables: {
          file
        }
      });
      setPreview(result.data.singleUpload.path);
    }
  };

  const onChangeTopic = ({ target: { value } }) => {
    setTopic(prev => ({
      ...prev,
      name: value
    }));
    refetch({ filter: value });
    setShowItems(true);
  };

  // const onBlurTopic = () => {
  //   if (topic.name === '') {
  //     setTopic({ name: 'Random' });
  //     setShowItems(false);
  //   }
  // };

  const onFocusTopic = () => {
    if (topic.name === 'Random') {
      setTopic({ name: '' });
      setShowItems(true);
    }
  };

  const onSelectTopic = topic => {
    setTopic(topic);
    setShowItems(false);
  };

  useEffect(() => {
    fetchPublishInfo().then(({ data: { ownPost: post } }) => {
      setDescription(post.description || '');
      setPreview(post.preview || '');
      setTopic(post.topic || topicRandom);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FullScreenDialog visible={openDialog} onClose={onCloseDialog}>
      <div className="flex flex-column justify-start">
        <div className="w-6/12 pr-12">
          <div>
            <p className="font-semibold mb-2 text-lg">Post preview</p>
            <div className="w-full h-40 bg-gray-300 relative">
              <input
                type="file"
                id="post-preview-input"
                accept="image/*"
                onChange={onChangePostPreview}
                className="absolute"
              />
              <div className="left-0 top-0 w-full h-full z-0">
                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <p className="font-semibold pt-4 mb-2 border-b border-gray-300 text-lg">
            {post.title}
          </p>
          <div>
            <textarea
              type="text"
              id="description"
              placeholder="Write description that will appears in public places like homepage — not the post itself."
              value={description}
              onChange={e => onChangeDescription(e.target.value)}
              className="w-full outline-none"
            />
            <p className="text-sm text-gray-500">
              {`${description.length}/${maxLengthDescription}`}
            </p>
          </div>
        </div>
        <div className="w-6/12 pl-12">
          {/* <div>
            <p>
              Add or change tags (up to 5) so readers know what your post is
              about
            </p>
            <textarea
              type="text"
              id="tag"
              placeholder="Add tags..."
              className="w-full p-3 border border-gray-300 outline-none"
            />
          </div> */}
          <div className="relative w-full">
            <p className="font-semibold mb-2 text-lg inline-block">Topic</p>
            <p className="mb-2 text-gray-500 inline-block ml-2">
              - choosing a topic for your post. Default: Random
            </p>
            <input
              type="text"
              value={topic.name}
              onChange={onChangeTopic}
              // onBlur={onBlurTopic}
              onFocus={onFocusTopic}
              className="w-full px-2 py-2 border border-gray-300"
            />
            {showItems && (
              <div className="absolute bg-white w-full border border-gray-300">
                {loading && <div className="py-2 px-3">Loading...</div>}
                {!loading &&
                  data &&
                  data.topics &&
                  data.topics.items.map(topic => (
                    <div
                      key={topic.id}
                      onClick={() => onSelectTopic(topic)}
                      className="cursor-pointer hover:bg-blue-300 py-2 px-3"
                    >
                      {topic.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="pt-4 flex items-center">
            <button
              className="btn btn-pill btn-primary"
              disabled={uploading}
              onClick={() => publishPost()}
            >
              {post.state === 'PUBLISHED' ? 'Save' : 'Publish now'}
            </button>
            {postLink && (
              <p className="font-bold pl-4">Redirect to post's page...</p>
            )}
          </div>
        </div>
      </div>
    </FullScreenDialog>
  );
};

export default withRouter(PostPublish);
