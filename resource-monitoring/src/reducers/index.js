import { combineReducers } from 'redux';
import TestReducer from './TestReducer';
import MenuReducer from './MenuReducer';

const rootReducer = combineReducers({
    Test: TestReducer,
    Menu: MenuReducer
});

export default rootReducer;