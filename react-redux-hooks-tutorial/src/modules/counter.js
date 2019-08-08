/**
 * Ducks 패턴의 Redux
 */

// [1. Action type]
export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT = 'counter/DECREMENT';

// [2. Action Creator]
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// [3. initial state]
export const initialState = {
  number: 0
};

// [4. Reducer]
const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        number: state.number + 1
      };
    case DECREMENT:
      return {
        number: state.number - 1
      };
    default:
        return state;
  }
};

export default counter;
