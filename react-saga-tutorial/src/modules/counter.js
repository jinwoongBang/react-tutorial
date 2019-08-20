import { delay } from 'redux-saga/effects';
import { put, takeEvery } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';

// Action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const DECREMENT_ASYNC = 'DECREMENT_ASYNC';

// Action creator
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const incrementAsync = createAction(INCREMENT_ASYNC);
export const decrementAsync = createAction(DECREMENT_ASYNC);

// const initialState = {
//   number: 0
// };

function* incrementAsyncSaga() {
  yield delay(1000);
  yield put(increment());
}

function* decrementAsyncSaga() {
  yield delay(1000);
  yield put(decrement());
}

export function* counterSaga() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
  yield takeEvery(DECREMENT_ASYNC, decrementAsyncSaga);
}

export default handleActions(
  {
    [INCREMENT]: (state, action) => state + 1,
    [DECREMENT]: (state, action) => state - 1
  },
  0
);

// export const increment = () => ({
//   type: INCREMENT
// });

// export const decrement = () => ({
//   type: DECREMENT
// });

// const initialState = {
//     number: 0
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT:
//             console.log("INCREMENT");
//       return {
//         ...state,
//         number: state.number + 1
//       };
//     case DECREMENT:
//         console.log("DECREMENT");
//       return {
//         ...state,
//         number: state.number - 1
//       };
//     default:
//         return state;
//   }
// };

// export default reducer;
