import React, { Fragment, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/default.min.css';
import Editor from 'react-medium-editor';

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
      'unorderedlist',
      'orderedlist',
      'quote'
    ]
  },
  extensions: {
    // table: new MediumEditorTable()
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

function NewPost() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const handleChangeText = newText => setText(() => newText);
  const handleChangeTitle = newTitle => setTitle(() => newTitle);

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
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewPost;
