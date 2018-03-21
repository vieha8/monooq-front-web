import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { authReducer } from '../modules/auth';
import { searchReducer } from '../modules/search';
import { messagesReducer } from '../modules/messages';
import { uiReducer } from '../modules/ui';
import { apiReducer } from '../modules/api';
import { spaceReducer } from '../modules/space';
import { userReducer } from '../modules/user';
import { requestReducer } from '../modules/request';
import { errorReducer } from '../modules/error';
import rootSaga from '../modules/sagas';

export let store = null;

export default history => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [routerMiddleware(history), sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  store = createStore(
    combineReducers({
      api: apiReducer,
      auth: authReducer,
      router: routerReducer,
      search: searchReducer,
      messages: messagesReducer,
      space: spaceReducer,
      user: userReducer,
      ui: uiReducer,
      request: requestReducer,
      error: errorReducer,
    }),
    composeEnhancers(applyMiddleware(...middleware)),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
