import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const FooterContainer = styled(Container)`
  /* text-align: center; */
`;

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FooterContainer className="border" fluid={true}>
        <Row className="">
          <Col className="">
            <p>Resource Monitoring 1.0 © 2019 Malgn Technology. All Right Reserved.</p>
          </Col>
        </Row>
      </FooterContainer>
    );
  }
}

export default Footer;
