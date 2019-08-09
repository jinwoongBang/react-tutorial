import { createStore, applyMiddleware } from 'redux';
import modules from './components/modules';
import loggerMiddleware from './lib/loggerMiddleware';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

// const store = createStore(modules, applyMiddleware(loggerMiddleware));

const logger = createLogger();
const store = createStore(modules, applyMiddleware(logger, ReduxThunk));

export default store;