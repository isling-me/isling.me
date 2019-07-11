import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { createPostMutation } from '../../graphql/post';
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
  const handleChangeText = newText => setText(newText);
  const handleChangeTitle = newTitle => setTitle(stripHtml(newTitle));
  const [createPost, { loading, data, error }] = useMutation(
    createPostMutation,
    {
      variables: { title, text }
    }
  );

  useEffect(() => {
    const save = () => {
      if (loading || error) {
        console.log('[x] Loading or error');
        return;
      }

      if (!id) {
        console.log('[c] Create story. Title:', title, 'Content:', text);
        if (text !== '' || title !== '') {
          createPost();
        }
      } else {
        console.log('[u] Update story');
      }
    };

    const saveJobId = setInterval(save, 3000);

    return () => clearInterval(saveJobId);
  }, [createPost, error, id, loading, text, title]);

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
        <SideBar />
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
            {loading && <div>Saving...</div>}
            {!loading && id && <div>Saved. ID: {id}</div>}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(NewPost);
