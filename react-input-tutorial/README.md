## 목차

### `1. input 태그의 value 값 바꾸기`
```javascript
handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
```
