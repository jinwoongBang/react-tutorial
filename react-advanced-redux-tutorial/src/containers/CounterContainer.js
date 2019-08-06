// 리덕스와 연동된 컨테이너 컴포넌트 작성

import React, { Component } from "react";
import Counter from "../components/Counter";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as counterActions from "store/modules/counter"; // 액션 함수 가져오기

class CounterContainer extends Component {
  handleIncrement = () => {
    const { CounterActions } = this.props;
    CounterActions.increment();
  };

  handleDecrement = () => {
    const { CounterActions } = this.props;
    CounterActions.decrement();
  };

  render() {
    const { handleIncrement, handleDecrement } = this;
    const { number } = this.props;

    return (
      <Counter
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        number={number}
      />
    );
  }
}

// [ 방법 1 ]
// const mapStateToProps = state => ({
//   number: state.counter.number
// });

// const mapDispatchToProps = dispatch => ({
//   increment: () => dispatch(counterActions.increment()),
//   decrement: () => dispatch(counterActions.decrement())
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CounterContainer);

// [ 방법 2 ]
export default connect(
  state => ({
    number: state.counter.number
  }),
  dispatch => ({
    CounterActions: bindActionCreators(counterActions, dispatch)
  })
)(CounterContainer);
