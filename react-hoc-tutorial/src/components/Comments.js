import React, { Component } from 'react';
import axios from 'axios';

class Comments extends Component {
  state = {
    data: null
  }

  async initialize() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1');
      this.setState({
        data: response.data
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }


  render() {
    const { data } = this.state;

    if (!data) return null;

    return (
      <div>
        {JSON.stringify(this.state.data)}
      </div>
    );
  }
}


export default Comments;