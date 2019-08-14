import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, DeviceList } from '../pages';
import Header from '../container/HeaderContainer';
import Footer from '../components/Footer';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const AppContainer = styled(Container)`
  a:hover {
    text-decoration:none;
  }
`;
// 차장님은 여기서 라우터를 안넣고 레이아웃만 잡아줌 이전 Root.js 에서 라우터를 다 넣어주고
// Root.js -> App.js 로 갈 때 전환될 페이지 목록들을 자식 프로퍼티로 모두 전달
class App extends Component {
  render() {
    return (
      <AppContainer className="text-center" fluid={true}>
        <Row className="sticky-top">
          <Col className="p-0">
            <Header />
          </Col>
        </Row>
        <Row>
          <Col className="p-0">
            {/* 모든 페이지들은 기본적으로 Container 로 시작해야 함 */}
            <Route exact path="/" component={Home} />
            <Switch>
              <Route path={['/about/:name', '/about']} component={About} />
              <Route path={['/deviceList']} component={DeviceList} />
            </Switch>
          </Col>
        </Row>
        <Row>
          <Col className="p-0">
            <Footer />
          </Col>
        </Row>
      </AppContainer>
    );
  }
}

export default App;
