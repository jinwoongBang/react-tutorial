import React, { useRef } from 'react';
import { Row, Col, Layout } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';

// import videoSource1 from './video/테스트.mp4';
// import videoSource1 from './video/유출금지.mov';
// import videoSource2 from './video/test.MOV';
// import videoSource2 from './video/뉴스.mov';
// import videoSource2 from './video/남자축구.mp4';

import imageSource from './image/thumbnail_example.png';
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

  /* The side navigation menu */
  .sidebar {
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: #f1f1f1;
    position: fixed;
    height: 100%;
    overflow: auto;
  }

  /* Sidebar links */
  .sidebar a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
  }

  /* Active/current link */
  .sidebar a.active {
    background-color: #4CAF50;
    color: white;
  }

  /* Links on mouse-over */
  .sidebar a:hover:not(.active) {
    background-color: #555;
    color: white;
  }

  /* Page content. The value of the margin-left property should match the value of the sidebar's width property */
  div.content {
    margin-left: 200px;
    padding: 1px 16px;;
  }

  /* On screens that are less than 700px wide, make the sidebar into a topbar */
  @media screen and (max-width: 700px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
    }
    .sidebar a {
      float: left;
    }
    div.content {
      margin-left: 0;
      }
  }

  /* On screens that are less than 400px, display the bar vertically, instead of horizontally */
  @media screen and (max-width: 400px) {
    .sidebar a {
      text-align: center;
      float: none;
    }
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
      {/* <Row className="border-black" type="flex" justify="center">
        <Col span={9} className="">
          
          </Col>
        <Col span={15} className="">
          <MalgnPlayer src={videoSource1} skim={imageSource} />
        </Col>
      </Row> */}
      <div className="sidebar">
        <a className="active" href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>

      <div className="content">
        <Row type="flex" justify="center">
          <Col span={18}>
            {/* <MalgnPlayer src={videoSource1} skim={imageSource} /> */}
            {/* <MalgnPlayer src="http://localhost:8080/upload/test.MOV" skim={imageSource} /> */}
            <MalgnPlayer src="http://localhost:8080/upload/남자축구.mp4" skim={imageSource} />
            {/* <MalgnPlayer src="https://youtu.be/wvebg9CQv_w" skim={imageSource} /> */}
          </Col>
        </Row>
      </div>
    </AppContainer>
  )
}

export default App;
