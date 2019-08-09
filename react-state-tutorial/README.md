## 목차

### `class 형 컴포넌트 & 함수형 컴포넌트`
```
// [방법 1 - class 형 컴포넌트]
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
}

// [방법 2 - 함수형 컴포넌트]
const MyName = ({ name }) => {
  return (
    <div>
      안녕하세요! 제 이름은 <b>{name}</b> 입니다.
    </div>
  );
};

MyName.defaultProps = {
  name: "기본 이름"
};```




