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
#### (1) 최초 render() 전
```javascript
componentWillMount() {
    console.log("componentWillMount() - deprecated");
  }
```
#### (2) 최초 render() 후
- ajax, fetch, DOM 의 속성을 읽거나 직접 변경하는 작업에 사용
```javascript
  componentDidMount() {
    //
    console.log("componentDidMount()");
  }
```
#### (3) boolean 값에 따라 render() 호출
- true 일 때 render() 호출
- false 일 때 render() 비 호출
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
#### (4) shouldComponentUpdate 가 true 일 경우에만 호출
```javascript
  componentWillUpdate(nextProps, nextState) {
    console.log("nextProps : ", nextProps);
    console.log("nextState : ", nextState);
    console.log("componentWillUpdate(nextProps, nextState)");
  }
```
#### (5) render() 호출 후
- 최초 랜더 이후의 랜더
```javascript
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps : ", prevProps);
    console.log("prevState : ", prevState);
    console.log("componentDidUpdate(prevProps, prevState)");
  }
```
#### (6) 컴포넌트 제거 
- 이벤트 제거 등에 사용
```javascript
  componentWillUnmount() {
    console.log("componentWillUnmount()");
  }
```
#### (7) 에러 발생 시 호출
```javascript
  componentDidCatch(error, info) {
    console.log("error", error);
    console.log("info", info);
    this.setState({
      error: true
    });
  }
```


