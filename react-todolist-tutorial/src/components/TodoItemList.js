import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItmeList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    console.log('TodoItmeList');
    const { todos, onToggle, onRemove } = this.props;
    const todoList = todos.map(({ id, text, checked, color }) => (
      <TodoItem
        id={id}
        text={text}
        checked={checked}
        onToggle={onToggle}
        onRemove={onRemove}
        key={id}
        color={color}
      />
    ));

    return <div>{todoList}</div>;
  }
}

export default TodoItmeList;
