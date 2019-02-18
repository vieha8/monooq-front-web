import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';

import { authReducer } from '../modules/auth';
import { messagesReducer } from '../modules/messages';
import { uiReducer } from '../modules/ui';
import { spaceReducer } from '../modules/space';
import { userReducer } from '../modules/user';
import { requestReducer } from '../modules/request';
import { salesReducer } from '../modules/sales';
import { errorReducer } from '../modules/error';
import { initReducer } from '../modules/init';
import rootSaga from '../sagas';

import { googleAnalytics } from '../middlewares/reactGAMiddlewares';

export let store = null;

Raven.config('https://d3223c25da3e4dcda892c9ac1cf7b0be@sentry.io/1287932').install();

export default history => {
  const sagaMiddleware = createSagaMiddleware({
    onError(error) {
      setImmediate(() => {
        throw error;
      });
    },
  });
  const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
    googleAnalytics,
    createRavenMiddleware(Raven, {}),
  ];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const reducers = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    messages: messagesReducer,
    space: spaceReducer,
    user: userReducer,
    ui: uiReducer,
    request: requestReducer,
    sales: salesReducer,
    error: errorReducer,
    init: initReducer,
  });

  store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);

  return store;
};
