import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import TodoReducer from './reducers/TodoReducer';

const store = createStore(TodoReducer);

const render = () => {
  console.log('render()');
  ReactDom.render(<App store={store} />, document.getElementById('root'));
};
render();

store.subscribe(render);
