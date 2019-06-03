import React from 'react';
import avatar from './avatar.jpg';

function App() {
  return (
    <div className="post text-gray-900 m-auto">
      <div className="mt-20">
        <h1 className="title">Our story</h1>
      </div>
      <div className="flex bg-white rounded-lg pt-6 author items-center">
        <img className="w-10 h-10 rounded-full mx-auto" alt="no description" src={avatar}/>
        <div className="text-left flex-1 pl-2">
          <div className="text-xl leading-tight">Erin Lindford</div>
          <div className="info">
            <div className="text-gray-600 text-xs leading-tight inline">Jun 03</div>
          </div>
        </div>
      </div>
      <div className="markdown text-justify">
        <p>
          The quick fox jump on slow rabbit. The quick fox jump on slow rabbit. The quick fox jump on slow rabbit.
          The quick fox jump on slow rabbit. The quick fox jump on slow rabbit. The quick fox jump on slow rabbit.
        </p>
        <p>
          The quick fox jump on slow rabbit. The quick fox jump on slow rabbit. The quick fox jump on slow rabbit.
          The quick fox jump on slow rabbit. The quick fox jump on slow rabbit. The quick fox jump on slow rabbit.
        </p>
        <p>
          The quick fox jump on slow rabbit. The quick fox jump on slow rabbit. The quick fox jump on slow rabbit.
          The quick fox jump on slow rabbit. The quick fox jump on slow rabbit. The quick fox jump on slow rabbit.
        </p>
        <h3>Waiting for me come home</h3>
        <p>
          The quick fox jump on slow rabbit. The quick fox jump on slow rabbit. The quick fox jump on slow rabbit.
          The quick fox jump on slow rabbit. The quick fox jump on slow rabbit. The quick fox jump on slow rabbit.
        </p>
      </div>
    </div>
  );
}

export default App;
