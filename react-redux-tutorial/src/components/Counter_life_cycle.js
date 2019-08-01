import React, { Component } from "react";

const Problematic = () => {
  throw new Error("버그가 나타났다.");
  return (
    <div>
      {/* 도달하지 못함 */}
    </div>
  );
};

// [ 방법 2 ]
export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      error: false
    };
  }

  componentWillMount() {
    // 최초 render() 전
    console.log("componentWillMount() - deprecated");
  }

  componentDidMount() {
    // 최초 render() 후
    // ajax, fetch, DOM 의 속성을 읽거나 직접 변경하는 작업
    console.log("componentDidMount()");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps : ", nextProps);
    console.log("nextState : ", nextState);
    console.log("shouldComponentUpdate(nextProps, nextState)");

    // [false] render() 가 호출되지 않음 (변환된 상태를 출력하지 않음)
    if (nextState.number % 5 === 0) return false;

    // [true] render() 호출
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    // shouldComponentUpdate 가 true 일 경우에만 호출
    console.log("nextProps : ", nextProps);
    console.log("nextState : ", nextState);
    console.log("componentWillUpdate(nextProps, nextState)");
  }

  componentDidUpdate(prevProps, prevState) {
    // render() 호출 후
    console.log("prevProps : ", prevProps);
    console.log("prevState : ", prevState);
    console.log("componentDidUpdate(prevProps, prevState)");
  }

  componentWillUnmount() {
    // 컴포넌트 제거 (이벤트 제거 등에 사용)
    console.log("componentWillUnmount()");
  }

  componentDidCatch(error, info) {
    console.log("error", error);
    console.log("info", info);
    this.setState({
      error: true
    });
  }

  handleIncrease = () => {
    // [ 방법 4 ]
    const { number } = this.state;
    this.setState({
      number: number + 1
    });
  };

  handleDecrease = () => {
    // [ 방법 3 ]
    this.setState(({ number }) => ({
      number: number - 1
    }));
  };

  render() {
    console.log("render() invoked");
    if (this.state.error) return (<h1>에러 발생</h1>);
    return (
      <div>
        <h1>Counter</h1>
        <div>값 : {this.state.number}</div>
        { this.state.number === 4 && <Problematic/> }
        <button onClick={this.handleIncrease}>
          +
        </button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}
