import { createStore, applyMiddleware } from 'redux';
import modules from './components/modules';
import loggerMiddleware from './lib/loggerMiddleware';

const store = createStore(modules, applyMiddleware(loggerMiddleware));

export default store;