import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { Counter } from './Counter';
import rootReducer from './store/modules';
import rootSaga from './store/saga';

const sagaMiddleware = createSagaMiddleware();
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, compose(
  applyMiddleware(sagaMiddleware),
  devTools
));
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <div>
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
