import React, { Component } from 'react';
// import notify from './notify';
import withSplitting from './withSplitting';

const SplitMe = withSplitting(() => import('./SplitMe'));

class App extends Component {
  state = {
    // SplitMe: null
    visible: false
  };

  // [방법 1]
  //   handleClick = () => {
  //     notify();
  //   };

  // [방법 2]
  //   handleClick = () => {
  //     import('./notify').then(({ default: notify }) => ( notify() ))
  //   };

  // [방법 3 - 코드 스플리팅]
  //   handleClick = () => {
  //     import('./SplitMe').then(({ default: SplitMe }) => {
  //       this.setState({ SplitMe });
  //     });
  //   };

  // [방법 4 - 코드 스플리팅 + HOC]
  handleClick = () => {
    this.setState({
        visible: true
    });
  };

  render() {
    // const { SplitMe } = this.state;
    const { visible } = this.state;

    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        {/* {SplitMe && <SplitMe />} */}
        {visible && <SplitMe />}
      </div>
    );
  }
}

export default App;
