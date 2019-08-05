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
    default:
      return state;
  }
};

export default TodoReducer;
