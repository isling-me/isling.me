import React, { Fragment, useState, useEffect, useRef } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../Header/Header';
import { createPostMutation, ownPostContentQuery } from '../../graphql/post';
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/default.min.css';
import Editor from 'react-medium-editor';
import { useMutation } from '@apollo/react-hooks';
import { stripHtml } from '../../helpers/utils';
import { withRouter } from 'react-router-dom';

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

function NewPost({ history }) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [createPost, { loading, data, error }] = useMutation(
    createPostMutation,
    {
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
      }
    }
  );
  const ref = useRef({});

  const save = () => {
    if (loading || error) {
      return;
    }
    if (!id) {
      if (text !== '' || title !== '') {
        createPost();
      }
    }
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

  useEffect(() => {
    if (data && typeof data.createPost.id === 'string') {
      setId(data.createPost.id);
      history.push(`/p/${data.createPost.id}/edit`);
    }
  }, [data, history]);

  return (
    <Fragment>
      <div className="lg:hidden">
        <NavBar />
      </div>
      <div className="hidden lg:block">
        <Header
          leftChild={
            <Fragment>
              {!data && 'Draft'}
              {loading && 'Saving...'}
            </Fragment>
          }
        />
      </div>
      <div className="container m-auto">
        <div className="post m-auto">
          <div className="postContent px-6 lg:px-0">
            <Editor
              className="title text-3xl lg:text-4xl pt-6 lg:pt-24 text-justify outline-none cursor-text"
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
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(NewPost);
