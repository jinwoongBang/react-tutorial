import React, { Component } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  border: 1px solid tomato;
  
  .border {
    border: 1px solid tomato;
  }
`;

class Footer extends Component {
  render() {
    return (
      <FooterContainer>
        <h1>Footer</h1>
      </FooterContainer>
    );
  }
}

export default Footer;
