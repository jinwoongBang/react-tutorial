import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import TodoListTemplate from './components/TodoListTemplate';
import FormContainer from './containers/FormContainer';
import TodoItemListContainer from './containers/TodoItemListContainer';
import PaletteContainer from './containers/PaletteContainer';

import util from './util/ColorList';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #f9f9f9;
  }
`;
const AppLayout = styled.div`
  font-family: sans-serif;
`;

class App extends Component {
  render() {
    const COLORS = util.callColorList();

    return (
      <AppLayout>
        <GlobalStyle />
        <TodoListTemplate
          form={<FormContainer />}
          palette={<PaletteContainer colors={COLORS} />}
        >
          {<TodoItemListContainer />}
        </TodoListTemplate>
      </AppLayout>
    );
  }
}

export default App;
