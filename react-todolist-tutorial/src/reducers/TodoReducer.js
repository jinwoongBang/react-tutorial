import * as types from '../actions/ActionType';

const initialState = {
  input: '',
  todos: [],
  color: ''
};

const TodoReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case types.ADD_TODO:
      return {
        ...state,
        input: '',
        todos: state.todos.concat({
          id: action.id,
          text: action.text,
          color: action.color,
          checked: action.checked,
        }),
      };
    case types.TOGGLE_TODO:
      let index = state.todos.findIndex((todo) => todo.id === action.id);
      let toggleTodo = state.todos[index];
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index),
          {
            ...toggleTodo,
            checked: !toggleTodo.checked,
          },
          ...state.todos.slice(index + 1, state.todos.length),
        ],
      };
    case types.REMOVE_TODO:
      let nextTodos = state.todos.filter((todo) => todo.id !== action.id);
      return {
        ...state,
        todos: nextTodos,
      };
    case types.CHANGE_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case types.CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    default:
      return state;
  }
};

export default TodoReducer;
