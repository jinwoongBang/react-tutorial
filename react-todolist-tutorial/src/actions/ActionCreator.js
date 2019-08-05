import * as types from './ActionType';

let todoId = 0;

export const addTodo = (text, color) => ({
  type: types.ADD_TODO,
  id: todoId++,
  text: text,
  color: color,
  checked: false,
});

export const toggleTodo = (id) => ({
  type: types.TOGGLE_TODO,
  id: id,
});

export const removeTodo = (id) => ({
  type: types.REMOVE_TODO,
  id: id,
});

export const chageTodoColor = (color) => ({
  type: types.CHANGE_COLOR,
  color: color,
});

export const changeTodoInput = (input) => ({
  type: types.CHANGE_INPUT,
  input,
  input,
});
