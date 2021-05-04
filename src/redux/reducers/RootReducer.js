import { combineReducers } from 'redux';
import userState from './UserReducer';
import UiReducer from './UiReducer';


const rootReducer = combineReducers({
	userState,
	UiReducer
});
export default rootReducer;
