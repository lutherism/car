import {combineReducers} from 'redux';
import robotReducer from './robot';

export default combineReducers({
  robot: robotReducer
});
