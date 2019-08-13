import * as types from '../actions/ActionType';

const initialState = {
  test: 'test',
  toggle: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TEST_TYPE:
      return {
        ...state,
        test: action.test
      };
    default:
      return state;
  }
};

export default reducer;
