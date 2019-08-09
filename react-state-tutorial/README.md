## 목차

### `1. class 형 컴포넌트 & 함수형 컴포넌트`
[방법 1 - class 형 컴포넌트]
```javascript
export default class MyName extends Component {
  static defaultProps = {
    name: "기본 이름"
  };

  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
      </div>
    );
  }
};
```

[방법 2 - 함수형 컴포넌트]
```javascript
const MyName = ({ name }) => {
  return (
    <div>
      안녕하세요! 제 이름은 <b>{name}</b> 입니다.
    </div>
  );
};

MyName.defaultProps = {
  name: "기본 이름"
};
```

### `2. life cycle`
```javascript
componentWillMount() {
    // 최초 render() 전
    console.log("componentWillMount() - deprecated");
  }
```
```javascript
  componentDidMount() {
    // 최초 render() 후
    // ajax, fetch, DOM 의 속성을 읽거나 직접 변경하는 작업
    console.log("componentDidMount()");
  }
```
```javascript
  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps : ", nextProps);
    console.log("nextState : ", nextState);
    console.log("shouldComponentUpdate(nextProps, nextState)");

    // [false] render() 가 호출되지 않음 (변환된 상태를 출력하지 않음)
    if (nextState.number % 5 === 0) return false;

    // [true] render() 호출
    return true;
  }
```
```javascript
  componentWillUpdate(nextProps, nextState) {
    // shouldComponentUpdate 가 true 일 경우에만 호출
    console.log("nextProps : ", nextProps);
    console.log("nextState : ", nextState);
    console.log("componentWillUpdate(nextProps, nextState)");
  }
```
```javascript
  componentDidUpdate(prevProps, prevState) {
    // render() 호출 후
    console.log("prevProps : ", prevProps);
    console.log("prevState : ", prevState);
    console.log("componentDidUpdate(prevProps, prevState)");
  }
```
```javascript
  componentWillUnmount() {
    // 컴포넌트 제거 (이벤트 제거 등에 사용)
    console.log("componentWillUnmount()");
  }
```
```javascript
  componentDidCatch(error, info) {
    console.log("error", error);
    console.log("info", info);
    this.setState({
      error: true
    });
  }
```


