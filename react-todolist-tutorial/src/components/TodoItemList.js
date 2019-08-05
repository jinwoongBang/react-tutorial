import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItmeList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  static defaultProps = {
    todos: []
  }
  
  render() {
    const { todos } = this.props;
    console.log('TodoItmeList - ', todos);
    const todoList = todos.map(({ id, text, checked, color }) => (
      <TodoItem
        id={id}
        text={text}
        checked={checked}
        key={id}
        color={color}
      />
    ));
    // const { todos, onToggle, onRemove } = this.props;
    // const todoList = todos.map(({ id, text, checked, color }) => (
    //   <TodoItem
    //     id={id}
    //     text={text}
    //     checked={checked}
    //     onToggle={onToggle}
    //     onRemove={onRemove}
    //     key={id}
    //     color={color}
    //   />
    // ));

    return <div>{todoList}</div>;
  }
}

export default TodoItmeList;
