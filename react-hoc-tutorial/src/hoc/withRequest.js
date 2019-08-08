import React, { Component } from 'react';
import axios from 'axios';

// [ 방법 1 ]
const withRequest = url => WrappedComponent => {
  return class extends Component {
    state = {
      data: null
    };

    async initialize() {
      try {
        const response = await axios.get(url);
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
      return <WrappedComponent data={data} />;
    }
  };
};

export default withRequest;
