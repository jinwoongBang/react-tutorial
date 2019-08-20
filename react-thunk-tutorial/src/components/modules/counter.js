import { handleActions, createAction } from 'redux-actions';

// [action types]
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// [action creator]
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

// [reducers]
// redux-thunk 적용
export const incrementAsync = () => dispatch => {
  // 1초 뒤 액션 디스패치
  setTimeout(() => {
    dispatch(increment());
  }, 1000);
};
export const decrementAsync = () => dispatch => {
  // 1초 뒤 액션 디스패치
  setTimeout(() => {
    dispatch(decrement());
  }, 1000);
};

export default handleActions(
  {
    [INCREMENT]: (state, action) => state + 1,
    [DECREMENT]: (state, action) => state - 1
  },
  0
);
