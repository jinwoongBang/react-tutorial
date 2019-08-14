import React from 'react';
import styled from 'styled-components';
import { Row, Col, Container } from 'reactstrap';

const HomeContainer = styled(Container)``;

const Home = ({ match }) => {
  return (
    <HomeContainer className="border" fluid={true}>
      <Row>
        <Col className="border">
          <h2>Contents Page</h2>
          <p>전환이 계속 될 페이지 (라우터)</p>
        </Col>
      </Row>
    </HomeContainer>
  );
};

export default Home;
