import { takeEvery, put } from "redux-saga/effects";
import { increment } from '../modules/counter';
import { INCREMENT_ASYNC } from '../modules/counter';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* incrementAsync() {
    yield console.log("call");
    yield delay(4000);
    yield put(increment());
}

export function* watchIncrementAsync() {
    yield takeEvery(INCREMENT_ASYNC, incrementAsync);
    // yield takeEvery("counter/INCREMENT_ASYNC", incrementAsync);
}