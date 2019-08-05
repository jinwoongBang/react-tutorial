import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import TodoListTemplate from './components/TodoListTemplate';
import Palette from './components/Palette';

import * as actions from './actions/ActionCreator';

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
    input: '',
    todos: [
      // { id: 0, text: ' 리액트 소개', checked: false, color: '#f03e3e' },
      // { id: 1, text: ' 리액트 소개', checked: true, color: '#f03e3e' },
      // { id: 2, text: ' 리액트 소개', checked: false, color: '#f03e3e' },
    ],
    colors: ['#343a40', '#f03e3e', '#12b886', '#228ae6'],
    color: '',
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleCreate = () => {
    const { input, color } = this.state;
    const { store } = this.props;
    console.log('text : ', input);

    // [ 리덕스 적용 전 ]
    // this.setState({
    //   input: '',
    //   todos: todos.concat({
    //     id: this.id++,
    //     text: input,
    //     checked: false,
    //     color: color,
    //   }),
    // });

    // [ 리덕스 적용 후 ]
    store.dispatch(actions.addTodo(input, color));

  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') this.handleCreate();
  };

  handleToggle = (id) => {
    console.log('handleToggle() - ', id);
    // const { todos } = this.state;

    // const index = todos.findIndex((todo) => todo.id === id);
    // const selected = todos[index];

    // [ 방법 1 ]
    // const nextTodos = [...todos];

    // nextTodos[index] = {
    //   ...selected,
    //   checked: !selected.checked
    // };

    // this.setState({
    //   todos: nextTodos
    // })

    // [ 방법 2 ]
    // this.setState({
    //   todos: [
    //     ...todos.slice(0, index),
    //     {
    //       ...selected,
    //       checked: !selected.checked,
    //     },
    //     ...todos.slice(index + 1, todos.length),
    //   ],
    // });

    // [ 리덕스 적용 ]
    const { store } = this.props;
    store.dispatch(actions.toggleTodo(id));
  };

  handleRemove = (id) => {
    const { todos } = this.state;
    const nextTodos = todos.filter((todo) => todo.id !== id);

    this.setState({
      todos: nextTodos,
    });
  };

  handleColor = (color) => {
    console.log('선택된 색상 : ', color);

    this.setState({
      color: color,
    });
  };

  render() {
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleColor,
    } = this;
    const { input, todos, colors, color } = this.state;
    return (
      <TodoListTemplate
        form={
          <Form
            onChange={handleChange}
            value={input}
            onCreate={handleCreate}
            onKeyPress={handleKeyPress}
            selectedColor={color}
          />
        }
        palette={
          <Palette
            colors={colors}
            onSelect={handleColor}
            selectedColor={color}
          />
        }
      >
        {
          <TodoItemList
            todos={this.props.store.getState().todos}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        }
      </TodoListTemplate>
    );
  }
}

export default App;
