import React, { useState } from 'react';
import Counter from './components/Counter';
import CounterReducer from './components/Counter-Reducer';
import Info from './components/Info';
import InfoReducer from './components/Info-Reducer';
import InfoCustomHooks from './components/Info-CustomHooks';
import ContextSample from './components/ContextSample';
import AverageUseMemo from './components/Average-UseMemo';
import AverageUseCallback from './components/Average-UseCallback';
import AverageUseRef from './components/Average-UseRef';
import UsePromiseSample from './components/UsePromiseSample';

// function App() {
//   const [visible, setVisible] = useState(false);


//   return (
//     <div>
//       <button onClick={() => {setVisible(!visible)}}>
//         { visible ? '숨기기' : '보이기'}
//       </button>
//       <hr />
//       {visible && <Info />}
//     </div>
//   );
// }

const App = () => {
  return <UsePromiseSample />
}

export default App;
