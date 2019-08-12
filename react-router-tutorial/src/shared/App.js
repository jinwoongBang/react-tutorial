import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Posts } from 'pages';
import Menu from 'components/Menu';

class App extends Component {
  state = {
    SplitMe: null
  };

  showSplitMe = () => {
    // 비동기적으로 코드를 불러옵니다. 함수의 결과는 Promise 를 반환합니다.
    // import() 는 모듈의 전체 네임스페이스를 불러오므로, default 를 직접 지정해 주어야합니다.
    import('components/SplitMe').then(({ default: Component }) => {
      // 불러오고 난 다음에 컴포넌트를 state 에 집어 넣습니다.
      this.setState({
        SplitMe: Component
      });
    });
  };

  render() {
    const { SplitMe } = this.state;

    return (
      <div>
        <Menu />
        {SplitMe && <SplitMe />}
        <button onClick={this.showSplitMe}>ClickMe</button>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/about/:name" component={About} />
          <Route path="/about" component={About} />
        </Switch>
        <Route path="/posts" component={Posts} />
      </div>
    );
  }
}

export default App;
