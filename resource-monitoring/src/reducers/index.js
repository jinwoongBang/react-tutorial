import { combineReducers } from 'redux';
import HeaderReducer from './HeaderReducer';
import DeviceReducer from './DeviceReducer';

const rootReducer = combineReducers({
    Header: HeaderReducer,
    Device: DeviceReducer
});

export default rootReducer;