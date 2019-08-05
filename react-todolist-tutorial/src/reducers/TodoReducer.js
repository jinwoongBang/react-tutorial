import * as types from '../actions/ActionType';

const initialState = {
  todos: [],
};

const TodoReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case types.ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat({
          id: action.id,
          text: action.text,
          color: action.color,
          checked: action.checked,
        }),
      };
    case types.TOGGLE_TODO:
      const todos = state.todos;
      const index = todos.findIndex((todo) => todo.id === action.id);
      const toggleTodo = todos[index];
      return {
        ...state,
        todos: [
          ...todos.slice(0, index),
          {
            ...toggleTodo,
            checked: !toggleTodo.checked,
          },
          ...todos.slice(index + 1, todos.length),
        ],
      };
    default:
      return state;
  }
};

export default TodoReducer;
