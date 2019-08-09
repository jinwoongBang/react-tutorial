import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './components/modules/counter';
import axios from 'axios';

class App extends Component {

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
             .then(response => console.log(response.data));
  }

  render() {
    const { CounterActions, number } = this.props;

    return (
      <div>
        <h1>{number}</h1>
        {/* [1] Redux-Thunk 미 적용 */}
        {/* <button onClick={CounterActions.increment}>+</button>
        <button onClick={CounterActions.decrement}>-</button> */}

        {/* [2] Redux-Thunk 적용 */}
        <button onClick={CounterActions.incrementAsync}>+</button>
        <button onClick={CounterActions.decrementAsync}>-</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    number: state.counter
  }),
  dispatch => ({
    CounterActions: bindActionCreators(counterActions, dispatch)
  })
)(App);
