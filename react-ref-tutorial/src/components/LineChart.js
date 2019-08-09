import React, { Component } from 'react';
import Chart from 'chart.js';
// import './LineChart.css';

class LineChart extends Component {
  chart = null;

  draw() {
    // 새로 그려질 때 기존 인스턴스 제거
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const { data, pair } = this.props;

    const config = {
      type: 'line',
      data: {
        labels: data.map(d => d.date),
        datasets: [
          {
            label: 'price',
            data: data.map(d => d.value),
            fill: false,
            backgroundColor: 'blue',
            borderColor: 'blue',
            lineTension: 0,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: `${pair} 24hr Chart`
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    }; // config end

    const ctx = this.canvas.getContext('2d');
    this.chart = new Chart(ctx, config);
  }

  // 최초 랜더 후
  componentDidMount() {
    this.draw();
  }

  // 최초가 아닌 이후의 랜더 후
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.draw();
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  render() {
    return (
      <div className="LineChart">
        <canvas ref={ref => (this.canvas = ref)} />
      </div>
    );
  }
}

export default LineChart;
