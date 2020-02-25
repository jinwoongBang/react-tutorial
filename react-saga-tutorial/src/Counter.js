import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementAsync } from './store/modules/counter';

export function Counter(props) {
    const { number } = useSelector(state => state.counter, []);
    const dispatch = useDispatch();

    const onIncrement = useCallback(() => {
        dispatch(increment());
    }, [])
    const onIncrementAsync = useCallback(() => {
        dispatch(incrementAsync());
    }, [])
    const onDecrement = useCallback(() => {
        dispatch(decrement());
    }, [])

    return (
        <div>
            <div className="Age-label">
                your number: <span>{number}</span>
            </div>
            <button onClick={onIncrement}>Age UP</button>
            <button onClick={onDecrement}>Age Down</button>
            <button onClick={onIncrementAsync}>onIncrementAsync</button>
        </div>
    );
}