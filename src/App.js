import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Post from './views/Post/Post';
import NewPost from './views/Post/NewPost';
import Home from './views/Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/posts/:slug/:id" component={Post} />
        <Route path="/new-post" component={NewPost} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
