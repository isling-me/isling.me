import React, { Fragment, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../Header/Header';
import {
  updatePostContentMutation,
  ownPostContentQuery,
  createPostMutation
} from '../../graphql/post';
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/default.min.css';
import '../../components/MediumEditor/lib/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.css';
import '../../components/MediumEditor/lib/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin-frontend.css';
import Editor from '../../components/MediumEditor';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import PostPublishDialog from './PostPublish';
import config from '../../configs/index';

const timeDelaySaveAfterTyped = 3000;

const textEditorOptions = {
  placeholder: {
    text: 'Tell your story',
    hideOnClick: true
  },
  toolbar: {
    buttons: [
      'bold',
      'italic',
      'underline',
      'anchor',
      'h2',
      'h3',
      'justifyCenter',
      'justifyFull',
      'unorderedlist',
      'orderedlist',
      'quote',
      'removeFormat'
    ]
  }
};

function PostEditor({ match, history }) {
  const { id } = match.params;
  const ref = useRef({});
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [uploadingImage, setUploadingImage] = useState(0);
  const [showEditor, setShowEditor] = useState(false);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [updatePost, { loading, error }] = useMutation(
    updatePostContentMutation,
    {
      variables: { title, text, postId: id }
    }
  );
  const [
    createPost,
    { loading: creating, data, error: creatError }
  ] = useMutation(createPostMutation, {
    variables: { title, text },
    update(
      cache,
      {
        data: { createPost }
      }
    ) {
      cache.writeQuery({
        query: ownPostContentQuery,
        variables: { postId: createPost.id },
        data: { ownPost: createPost }
      });
    },
    refetchQueries() {
      return ['ownPostsDraftQuery'];
    }
  });

  const save = ({ force } = { force: false }) => {
    if (uploadingImage > 0) {
      return;
    }

    if (
      !force &&
      (loading ||
        error ||
        creating ||
        creatError ||
        ref.current.isInsertingImage)
    ) {
      return;
    }

    if (id) {
      updatePost();
    } else if (title !== '' || text !== '') {
      createPost();
    }
  };

  const saveJob = () => {
    if (ref.current.jobId) {
      clearTimeout(ref.current.jobId);
    }
    ref.current.jobId = setTimeout(save, timeDelaySaveAfterTyped);
  };

  const handleChangeText = newText => {
    saveJob();
    setText(newText);
  };

  const handleChangeTitle = newTitle => {
    saveJob();
    setTitle(newTitle);
  };

  const feedPostRes = useQuery(ownPostContentQuery, {
    variables: { postId: id },
    skip: !id,
    onCompleted({ ownPost }) {
      setText(ownPost.content.text);
      setTitle(ownPost.title);
      setShowEditor(true);
    }
  });

  const onClosePublishDialog = () => {
    setOpenPublishDialog(false);
  };

  const onOpenPublishDialog = () => {
    setOpenPublishDialog(true);
  };

  const plugins = {
    mediumInsert: {
      options: {
        addons: {
          images: {
            deleteScript: file => {
              const arr = file.split('/');
              const url = `${config.URI}/posts/images?bucket=${
                arr[3]
              }&name=${arr.slice(4).join('/')}`;
              axios.delete(url);
            },
            captionPlaceholder: 'Type caption for image',
            fileUploadOptions: {
              // (object) File upload configuration. See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
              url: `${config.URI}/posts/images`, // (string) A relative path to an upload script
              acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i // (regexp) Regexp of accepted file types
            },
            autoGrid: 3,
            messages: {
              acceptFileTypesError: 'This file is not in a supported format: ',
              maxFileSizeError: 'This file is too big: '
            },
            actions: null,
            uploadCompleted() {
              setUploadingImage(count => count - 1);
            },
            uploadAdd() {
              setUploadingImage(count => count + 1);
            },
            uploadFailed() {
              setUploadingImage(count => count - 1);
            }
            // uploadProgress($el, data) {},
            // uploadProgressAll($el, data) {
            //   const ratio = parseInt((data.loaded / data.total) * 100, 10);
            //   if (ratio === 100) {
            //     setUploadingImage(false);
            //   }
            // }
          }
          // embeds: {
          //   oembedProxy: 'https://medium.iframe.ly/api/oembed?iframe=1'
          // }
        },
        handleShowAddons() {
          ref.current.isInsertingImage = true;
        },
        handleHideAddons() {
          ref.current.isInsertingImage = false;
          saveJob();
        }
      }
    }
  };

  useEffect(() => {
    if (!id) {
      setShowEditor(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    return () => save({ force: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!id) {
      if (data && typeof data.createPost.id === 'string') {
        history.push(`/p/${data.createPost.id}/edit`);
      } else {
        setTitle('');
        setText('');
      }
    }
  }, [data, history, id]);

  return (
    <div className="root">
      <div className="lg:hidden">
        <NavBar />
      </div>
      <div className="hidden lg:block">
        <Header
          leftChild={
            <div className="flex items-center">
              {id && !(loading || uploadingImage !== 0) && 'Saved'}
              {id && loading && 'Saving...'}
              {id && uploadingImage !== 0 && 'Image uploading...'}
              {!id && !creating && 'Draft'}
              {!id && creating && 'Saving...'}
            </div>
          }
          rightChild={
            id && (
              <button
                className="btn btn-pill btn-outline"
                onClick={onOpenPublishDialog}
              >
                {feedPostRes.data &&
                feedPostRes.data.ownPost &&
                feedPostRes.data.ownPost.state === 'PUBLISHED'
                  ? 'Edit preview, description, topic'
                  : 'Publish this post'}
              </button>
            )
          }
        />
      </div>

      {feedPostRes.data &&
        feedPostRes.data.ownPost &&
        feedPostRes.data.ownPost.state && (
          <PostPublishDialog
            openDialog={openPublishDialog}
            onCloseDialog={onClosePublishDialog}
            post={{
              id,
              state: feedPostRes.data.ownPost.state
            }}
          />
        )}

      <div className="container m-auto pb-24">
        <div className="post m-auto">
          <div className="postContent px-6 lg:px-0 pt-6 lg:pt-24">
            {(() => {
              if (id && (!feedPostRes.data || !feedPostRes.data.ownPost)) {
                return <div>Loading...</div>;
              }

              return (
                <Fragment>
                  {showEditor && (
                    <Fragment>
                      <input
                        className="title text-3xl lg:text-4xl text-justify outline-none cursor-text"
                        value={title}
                        onChange={e => handleChangeTitle(e.target.value)}
                        placeholder="Title"
                      />
                      <Editor
                        className="markdown text-justify text-base outline-none pt-6 cursor-text"
                        text={text}
                        onChange={handleChangeText}
                        options={textEditorOptions}
                        plugins={plugins}
                      />
                    </Fragment>
                  )}
                </Fragment>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(PostEditor);
