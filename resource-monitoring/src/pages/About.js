import React from 'react';
import styled from 'styled-components';
import { Row, Col, Container } from 'reactstrap';

const About = ({ match }) => {
  return (
    <Row className="border">
      <Col className="border">
        <h2>About {match.params.name}</h2>
      </Col>
    </Row>
  );
};

export default About;
