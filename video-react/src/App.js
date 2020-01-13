import React, { useRef } from 'react';
import { Row, Col, Layout } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';

// import videoSource1 from './video/테스트.mp4';
import videoSource1 from './video/유출금지.mov';
// import videoSource2 from './video/test.MOV';
// import videoSource2 from './video/뉴스.mov';
import videoSource2 from './video/남자축구.mp4';
import imageSource from './image/bono.PNG';
// import imageSource2 from './image/download.jpg';

import MalgnPlayer from './MalgnPlayer';

const AppContainer = styled(Layout)`
  .border-white {
    border: 1px solid white;
  }
  .border-tomato {
    border: 1px solid tomato;
  }
  .border-black {
    border: 1px solid black;
  }
  .border-gray {
    border: 1px solid gray;
  }
`;

const App = () => {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <AppContainer className="layout">
      {/* <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <Row>
            <Col span={24}>
              <h1>Custom Video Player</h1>
            </Col>
          </Row>
          <Row className="border-black" type="flex" justify="center">
            <Col span={24} className="border-black">
              <CustomVideoPlayer src={videoSource} />
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer>Footer</Footer> */}
      <Row className="border-black" type="flex" justify="center">
        <Col span={15} className="">
          <MalgnPlayer src={videoSource1} skim={imageSource} />
        </Col>
      </Row>
    </AppContainer>
  )
}

export default App;
