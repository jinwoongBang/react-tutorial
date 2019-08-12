import React, { Component } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  border: 1px solid tomato;
  
  .border {
    border: 1px solid tomato;
  }
`;

class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <h1>Header</h1>
      </HeaderContainer>
    );
  }
}

export default Header;
