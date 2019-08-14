import React from 'react';
import styled from 'styled-components';
import { Row, Col, Container } from 'reactstrap';

const AboutContainer = styled(Container)``;

const About = ({ match }) => {
  return (
    <AboutContainer fluid={true}>
      <Row className="border">
        <Col className="border">
          <h2>About {match.params.name}</h2>
        </Col>
      </Row>
    </AboutContainer>
  );
};

export default About;
