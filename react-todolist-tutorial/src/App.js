import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';

import TodoListTemplate from './components/TodoListTemplate';
import Palette from './components/Palette';

import * as actions from './actions/ActionCreator';
import FormContainer from './components/Form';
import TodoItemListContainer from './containers/TodoItemListContainer';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: #f9f9f9;
  }
`;
class App extends Component {
  // id = 3;

  state = {
    colors: ['#343a40', '#f03e3e', '#12b886', '#228ae6'],
  };

  handleToggle = (id) => {
    // const { store } = this.props;
    // store.dispatch(actions.toggleTodo(id));
  };

  handleRemove = (id) => {
    // [ 리덕스 적용 ]
    // const { store } = this.props;
    // store.dispatch(actions.removeTodo(id));
  };

  handleColor = (color) => {
    // [ 리덕스 적용 ]
    // const { store } = this.props;
    // store.dispatch(actions.chageTodoColor(color));
  };

  render() {
    const { handleColor } = this;
    const { colors } = this.state;

    return (
      <TodoListTemplate
        form={<FormContainer />}
        palette={
          <Palette
            colors={colors}
            // onSelect={handleColor}
            // selectedColor={store.getState().color}
          />
        }
      >
        {<TodoItemListContainer />}
      </TodoListTemplate>
    );
  }
}

export default App;
