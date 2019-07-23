import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Post from './views/Post/Post';
import NewPost from './views/Post/NewPost';
import PostEditor from './views/Post/PostEditor';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Logout from './views/Logout/Logout';
import MyPost from './views/Post/MyPost';
import PostPublish from './views/Post/PostPublish';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/posts/:slug/:id" component={Post} />
        <Route path="/p/:id/edit" component={PostEditor} />
        <Route path="/p/:id/publish" component={PostPublish} />
        <Route path="/new-post" component={NewPost} />
        <Route path="/me/posts/:state" component={MyPost} />
        <Route path="/signin" component={Login} />
        <Route path="/signout" component={Logout} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
