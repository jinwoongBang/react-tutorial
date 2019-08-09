import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Buttons from './components/Buttons';
import LineChart from './components/LineChart';
// import RefSample from './components/RefSample';

export default class App extends Component {
  state = {
    pair: 'BTCUSD',
    data: []
  };

  handleChangePair = pair => {
    // pair 값을 바꾸는 함수
    this.setState({ pair });
  };

  getData = async () => {
    const { pair } = this.state;
    try {
      // API 호출
      const response = await axios.get(
        `https://api.bitfinex.com/v2/candles/trade:5m:t${pair}/hist?limit=288`
      );
      // 데이터 형식 : [ MTS, OPEN, CLOSE, HIGH, LOW, VOLUME ]
      const data = response.data
        .map(candle => ({
          date: moment(candle[0]).format('LT'),
          value: candle[2]
        }))
        .reverse();

      this.setState({
        data
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    // 첫 로딩시에 getData 호출
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    // pair 값이 바뀌면, getData 호출
    if (prevState.pair !== this.state.pair) {
      this.getData();
    }
  }

  render() {
    return (
      <div className="App">
        <Buttons onChangePair={this.handleChangePair} />
        {/* 데이터가 없으면 렌더링하지 않음 */}
        {this.state.data.length > 0 && (
          <LineChart data={this.state.data} pair={this.state.pair} />
        )}
      </div>
    );
  }
}
