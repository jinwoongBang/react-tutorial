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
