import React, { Component } from 'react';
import styled from 'styled-components';

const AppTemplateContainer = styled.div`
  /* display: flex; */
  .border {
    border: 1px solid black;
  }
`;

class AppTemplate extends Component {
  render() {
    const { children, header, footer, sideNav } = this.props;
    return (
      <AppTemplateContainer>
        <section>{header}</section>
        <section>{sideNav}</section>
        <section>{children}</section>
        <section>{footer}</section>
      </AppTemplateContainer>
    );
  }
}

export default AppTemplate;
