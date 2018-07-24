import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_BUCKET
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
}

  // Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  )(createStore)

const initialState = {};

const middleware = [thunk];

const store = createStoreWithFirebase(
    rootReducer, 
    initialState, 
    compose(
    applyMiddleware(...middleware, thunk.withExtraArgument(getFirebase)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;