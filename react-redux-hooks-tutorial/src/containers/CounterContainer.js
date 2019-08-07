import React, { useCallback } from 'react';
import Counter from '../components/Counter';
import { increment, decrement } from '../modules/counter';
import { useSelector, useDispatch, useStore } from 'react-redux';

const CounterContainer = props => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter, []);
  // const number = useStore;
  const onIncrease = useCallback(() => {
    console.log(increment);
    dispatch(increment);
  }, []);
  const onDecrease = useCallback(() => {
    console.log(decrement);
    dispatch(decrement);
  }, []);

  return (
    <Counter number={counter} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
