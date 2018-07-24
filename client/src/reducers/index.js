import { combineReducers } from 'redux';
import tradeReducer from './tradeReducer';
import { firebaseReducer } from 'react-redux-firebase'



export default combineReducers({
    trade: tradeReducer,
    firebase: firebaseReducer
})