import React, { Component } from "react";
import MyName from "./components/MyName";
import Counter1 from "./components/Counter_setState";
import Counter2 from "./components/Counter_life_cycle";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "test",
      index: 0
    };
  }

  refreshBtn = () => {
      this.setState(({index}) => ({
          index: index + 1
      }))
    this.setState(({test, index}) => ({
        test: test + index
    }))
  };

  render() {
    // return <MyName name="test" />;
    return (
      <div className="border">
        <Counter2 test={this.state.test} />
        <button onClick={this.refreshBtn}>refresh</button>
      </div>
    );
  }
}

export default App;
