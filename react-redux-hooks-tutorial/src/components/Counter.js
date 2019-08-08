import React, { useReducer } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import counter, {
  increment,
  decrement,
  initialState
} from '../modules/counter';

const Counter = () => {
  // [ 방법 1 ] : react-redux 의 hooks
  const dispatcher = useDispatch();
  const { number } = useSelector(state => state.counter, []);
  const store = useStore();
  const hooksStoreNumber = store.getState().counter.number;

  // [ 방법 2 ] : react 의 hooks
  const [state, dispatch] = useReducer(counter, initialState);
  

  // 버그 테스팅
  console.log(increment);
  console.log(decrement);

  return (
    <div>
      <div style={{ border: '1px solid tomato' }}>
        <h1>react-redux : Hooks</h1>
        <p>useSelector, useDispatch, useStore</p>
        <h2>{number}</h2>
        <h2>{hooksStoreNumber}</h2>
      </div>
      <div style={{ border: '1px solid tomato' }}>
        <h1>react : Hooks</h1>
        <p>useReducer</p>
        <h2>{state.number}</h2>
      </div>
      <div>
        {/* [ 방법 1 ] */}
        <button onClick={() => dispatcher({ type: 'counter/INCREMENT' })}>
          +1
        </button>
        <button onClick={() => dispatcher({ type: 'counter/DECREMENT' })}>
          -1
        </button>

        {/* [ 방법 2 ] */}
        {/* <button onClick={() => dispatcher(increment)}>+1</button>
        <button onClick={() => dispatcher(decrement)}>-1</button> */}

        {/* [ 방법 3 ] */}
        {/* <button onClick={() => dispatcher(increment)}>+1</button>
        <button onClick={() => dispatcher(decrement)}>-1</button> */}

        {/* [ 방법 1 ] */}
        <button onClick={() => dispatch(increment)}>
          +1
        </button>
        <button onClick={() => dispatch(decrement)}>
          -1
        </button>
      </div>
    </div>
  );
};

export default Counter;
