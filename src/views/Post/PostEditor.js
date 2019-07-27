import React, { Fragment, useState, useEffect, useRef } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../Header/Header';
import {
  updatePostContentMutation,
  ownPostContentQuery
} from '../../graphql/post';
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/default.min.css';
import Editor from 'react-medium-editor';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { stripHtml } from '../../helpers/utils';
import { withRouter } from 'react-router-dom';
import PostPublishDialog from './PostPublish';

const textEditorOptions = {
  placeholder: {
    text: 'Tell your story',
    hideOnClick: false
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

const titleEditorOptions = {
  placeholder: {
    text: 'Title',
    hideOnClick: false
  },
  toolbar: {
    buttons: ['bold', 'italic']
  }
};

function PostEditor({ match }) {
  const { id } = match.params;
  const ref = useRef({});
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [updatePost, { loading, error }] = useMutation(
    updatePostContentMutation,
    {
      variables: { title, text, postId: id }
    }
  );

  const save = () => {
    if (loading || error) {
      return;
    }
    updatePost();
  };

  const saveJob = () => {
    if (ref.current.jobId) {
      clearTimeout(ref.current.jobId);
    }
    ref.current.jobId = setTimeout(save, 3000);
  };

  const handleChangeText = newText => {
    saveJob();
    setText(newText);
  };

  const handleChangeTitle = newTitle => {
    saveJob();
    setTitle(stripHtml(newTitle));
  };

  const feedPostRes = useQuery(ownPostContentQuery, {
    variables: { postId: id }
  });

  const onClosePublishDialog = () => {
    setOpenPublishDialog(false);
  };

  const onOpenPublishDialog = () => {
    setOpenPublishDialog(true);
  };

  useEffect(() => {
    feedPostRes.refetch().then(({ data: { ownPost } }) => {
      setText(ownPost.content.text);
      setTitle(ownPost.title);
      setShowEditor(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => updatePost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="root">
      <div className="lg:hidden">
        <NavBar />
      </div>
      <div className="hidden lg:block">
        <Header
          leftChild={
            <div className="flex items-center mr-8">
              {!loading && 'Saved'}
              {loading && 'Saving...'}
              <div className="flex-1" />
              <button
                className="btn btn-pill btn-primary"
                onClick={onOpenPublishDialog}
              >
                {feedPostRes.data &&
                feedPostRes.data.ownPost &&
                feedPostRes.data.ownPost.state === 'PUBLISHED'
                  ? 'Edit preview, description, topic'
                  : 'Publish this post'}
              </button>
            </div>
          }
        />
      </div>

      <PostPublishDialog
        openDialog={openPublishDialog}
        onCloseDialog={onClosePublishDialog}
        post={{
          id
        }}
      />

      <div className="container m-auto">
        <div className="post m-auto">
          <div className="postContent px-6 lg:px-0 pt-6 lg:pt-24">
            {(() => {
              if (feedPostRes.loading) {
                return <div>Loading...</div>;
              }

              return (
                <Fragment>
                  {showEditor && (
                    <Fragment>
                      <Editor
                        className="title text-3xl lg:text-4xl text-justify outline-none cursor-text"
                        text={title}
                        onChange={handleChangeTitle}
                        options={titleEditorOptions}
                      />
                      <Editor
                        className="markdown text-justify text-base outline-none pt-6 cursor-text"
                        text={text}
                        onChange={handleChangeText}
                        options={textEditorOptions}
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
