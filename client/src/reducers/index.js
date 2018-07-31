import { combineReducers } from 'redux';
import tradeReducer from './tradeReducer';
import botReducer from './botReducer';
import { firebaseReducer } from 'react-redux-firebase'



export default combineReducers({
    trade: tradeReducer, // everything trade related
    bot: botReducer,
    firebase: firebaseReducer // Add firebase to reducers
})