This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Exam 01

### `life cycle 관련 함수`
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

### `생성자 생성 및 setState 의 여러가지 방법
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
