import React from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { increment, decrement } from '../modules/counter';

const Counter = () => {
    const dispatch = useDispatch();
    const { number } = useSelector(state => state.counter, []);
    const store = useStore();
    console.log(store);
    console.log(store.getState());
    const hooksStoreNumber = store.getState().counter.number;
    console.log(hooksStoreNumber);
  return (
    <div>
      <h1>{number}</h1>
      <h1>{hooksStoreNumber}</h1>
      <div>
        <button onClick={()=> dispatch({ type: "counter/INCREMENT" })}>+1</button>
        <button onClick={()=> dispatch({ type: "counter/DECREMENT" })}>-1</button>
      </div>
    </div>
  );
};

export default Counter;