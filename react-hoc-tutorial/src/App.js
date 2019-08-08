import React, { Component } from 'react';
import Post from './components/Post';
import Comments from './components/Comments';
import PostHoc from './components/Post-hoc';
import CommentsHoc from './components/Comments-hoc';

class App extends Component {
  render() {
    return (
      <div>
        <h1>포스트</h1>
        {/* <Post /> */}
        <PostHoc />
        <h2>덧글</h2>
        <CommentsHoc />
      </div>
    );
  }
}

export default App;
