import React, { Component } from 'react';
import styled from 'styled-components';

const SideNavContainer = styled.div`
  border: 1px solid tomato;
  width: 300px;
  height: 1000px;
  .border {
    border: 1px solid tomato;
  }
`;

class SideNav extends Component {
  render() {
    return (
      <SideNavContainer>
        <h1>Side</h1>
      </SideNavContainer>
    );
  }
}

export default SideNav;
