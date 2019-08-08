import React, { Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator/SpaceNavigator';
import Viewer from './components/Viewer/Viewer';
import moment from 'moment';

import * as api from './lib/api';

// 59R4sCmlQNKFh9I1mD75XfK624cJvUIao1Qc806J
// https://api.nasa.gov/planetary/apod?api_key=59R4sCmlQNKFh9I1mD75XfK624cJvUIao1Qc806J

class App extends Component {
  state = {
    loading: false,
    maxDate: null,
    date: null,
    url: null,
    mediaType: null
  };

  // [ 방법 1 ]
  // getAPOD = date => {
  //   api.getAPOD(date).then(response => {
  //     console.log(response);
  //   });
  // };

  // [ 방법 2 ]
  getAPOD = async date => {
    if (this.state.loading) return; // 이미 요청중이라면 무시

    // 로딩 상태 시작
    this.setState({
      loading: true
    });

    try {
      const response = await api.getAPOD(date);
      // 비구조화 할당 + 새로운 이름
      const { date: retrievedDate, url, media_type: mediaType } = response.data;

      if (!this.state.maxDate) {
        // 만약에 maxDate 가 없으면 지금 받은 date 로 지정
        this.setState({
          maxDate: retrievedDate
        });
      }

      // 전달받은 데이터 넣어주기
      this.setState({
        date: retrievedDate,
        mediaType,
        url
      });
    } catch (e) {
      // 오류가 났을 경우
      console.log(e);
    }

    // 로딩 상태 종료
    this.setState({
      loading: false
    });
  };

  handlePrev = () => {
    const { date } = this.state;
    const prevDate = moment(date)
      .subtract(1, 'days')
      .format('YYYY-MM-DD');
    console.log(prevDate);
    this.getAPOD(prevDate);
  };

  handleNext = () => {
    const { date, maxDate } = this.state;
    if (date === maxDate) return;

    const nextDate = moment(date)
      .add(1, 'days')
      .format('YYYY-MM-DD');
    this.getAPOD(nextDate);
  };

  componentDidMount() {
    this.getAPOD();
  }

  render() {
    const { url, mediaType, loading } = this.state;
    const { handlePrev, handleNext } = this;
    
    return (
      <ViewerTemplate
        spaceNavigator={
          <SpaceNavigator onPrev={handlePrev} onNext={handleNext} />
        }
        // [이미지]
        viewer={<Viewer url={url} mediaType={mediaType} loading={loading} />}

        // [영상]
        // viewer={
        //   <Viewer
        //     url="https://www.youtube.com/embed/uj3Lq7Gu94Y?rel=0"
        //     mediaType="video"
        //   />
        // }
      />
    );
  }
}

export default App;
