import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from './lib/loggerMiddleware';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import modules, { rootSaga } from './modules';

const sagaMiddleware = createSagaMiddleware();
// const store = createStore(modules, applyMiddleware(loggerMiddleware));
const store = createStore(modules, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;