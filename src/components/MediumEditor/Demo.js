import React, { useState } from 'react';
import MediumEditor from './MediumEditor';
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/default.css';

const Demo = () => {
  const [text, setText] = useState('');
  return (
    <div className="root">
      <div className="container mx-auto pt-24">
        <MediumEditor text={text} onChange={setText} />
      </div>
    </div>
  );
};

export default Demo;
