import {combineReducers} from 'react-redux';
import robotReducer from './robot';

export default combineReducers({
  robot: robotReducer
});
