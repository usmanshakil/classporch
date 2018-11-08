import {compose, createStore, applyMiddleware, combineReducers} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import ReduxThunk from 'redux-thunk'
import reducers from './reducers';
import {loadState} from './localStorage';
import {createEpicMiddleware} from 'redux-observable';
import epics from './epics';
import firebase from 'firebase';
import {firebaseConfig} from "../config";

require('firebase/firestore');

firebase.initializeApp(firebaseConfig);
firebase.storage().setMaxUploadRetryTime(15000);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const history = createHistory();
const routeMiddleWare = routerMiddleware(history);
const epicMiddleWare = createEpicMiddleware(epics, {
  dependencies: {
    auth,
    firestore,
    storage,
    serverTime: firebase.firestore.FieldValue.serverTimestamp()
  }
});

const middlewares = [
  // logger(),
  ReduxThunk,
  routeMiddleWare,
  epicMiddleWare
];

const enhancers = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

// Create store

const persistedState = loadState();

const store = createStore(
  combineReducers({
    ...reducers,
    router:routerReducer
  }),
  persistedState,
  enhancers
);

export {store, history};