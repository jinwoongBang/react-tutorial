import { all } from 'redux-saga/effects';
import { watchIncrementAsync } from './counter';

export default function* rootSaga() {
    yield all([
        watchIncrementAsync()
    ])
}