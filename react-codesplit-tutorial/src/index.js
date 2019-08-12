import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppRouter from './App-Router';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
  document.getElementById('root')
);
