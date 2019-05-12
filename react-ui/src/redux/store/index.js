import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

import { authReducer } from '../modules/auth';
import { messagesReducer } from '../modules/messages';
import { uiReducer } from '../modules/ui';
import { spaceReducer } from '../modules/space';
import { userReducer } from '../modules/user';
import { requestReducer } from '../modules/request';
import { salesReducer } from '../modules/sales';
import { errorReducer } from '../modules/error';
import { initReducer } from '../modules/init';
import { homeReducer } from '../modules/home';
import rootSaga from '../sagas';

import gaMiddleware from '../middlewares/googleAnalytics';
import keenMiddleware from '../middlewares/keen';
import sentryMiddleware from '../middlewares/sentry';

export let store = null;

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
    gaMiddleware,
    keenMiddleware,
    sentryMiddleware({}),
  ];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
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
    home: homeReducer,
  });

  store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);

  return store;
};
