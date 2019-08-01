import React, { Component } from "react";

// [ 방법 1 ]
// export default class Counter extends Component {
//   state = {
//     number: 0
//   };

//   handleIncrease = () => {
//     this.setState({
//       number: this.state.number + 1
//     });
//   };

//   render() {
//     return (
//       <div>
//         <h1>Counter</h1>
//         <div>값 : {this.state.number}</div>
//         <button onClick={this.handleIncrease}>+</button>
//         <button onClick={this.handleDecrease}>-</button>
//       </div>
//     );
//   }
// }

// [ 방법 2 ]
export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }

  handleIncrease = () => {
    // [ 방법 1 ]
    // this.setState({
    //   number: this.state.number + 1
    // });

    // [ 방법 2 ]
    // this.setState(state => ({
    //   number: state.number + 1
    // }));

    // [ 방법 3 ]
    // this.setState(({ number }) => ({
    //   number: number + 1
    // }));

    // [ 방법 4 ]
    const { number } = this.state;
    this.setState({
      number: number + 1
    });
  };

  handleDecrease = () => {
    // [ 방법 1 ]
    // this.setState({
    //   number: this.state.number - 1
    // });

    // [ 방법 2 ]
    // this.setState(() => ({
    //   number: this.state.number - 1
    // }));

    // [ 방법 3 ]
    // this.setState(({ number }) => ({
    //   number: number - 1
    // }));

    // [ 방법 4 ]
    const { number } = this.state;
    this.setState({
        number: number - 1
    })
  };

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <div>값 : {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}
