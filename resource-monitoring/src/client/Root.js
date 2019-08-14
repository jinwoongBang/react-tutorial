import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';
import { Provider } from 'react-redux';
import store from '../config/store';
import 'bootstrap/dist/css/bootstrap.min.css';

// [ 차장님은 여기서 routeConfig 를 따로 빼서 모든 전환 될 페이지들을 넣어줌 ]

// function renderRouteConfigV3(routes, contextPath) {
//   const children = (
//     <Route
//       key={newContextPath}
//       component={item.component}
//       path={newContextPath}
//       exact
//     />
//   );

//   return <Switch>{children}</Switch>;
// }

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default Root;
