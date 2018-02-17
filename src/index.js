import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
import { firebaseConfig } from './config';

import { authReducer } from './modules/auth';
import { searchReducer } from './modules/search';
import rootSaga from './modules/sagas';

import Routes from './routes';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = [routerMiddleware(history), sagaMiddleware, logger]; // TODO productionはlogger切る

const store = createStore(
  combineReducers({
    auth: authReducer,
    router: routerReducer,
    search: searchReducer,
  }),
  applyMiddleware(...middleware),
);

sagaMiddleware.run(rootSaga);
firebase.initializeApp(firebaseConfig());

ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
