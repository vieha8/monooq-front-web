import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { authReducer } from '../modules/auth';
import { searchReducer } from '../modules/search';
import { messagesReducer } from '../modules/messages';
import { uiReducer } from '../modules/ui';
import { apiReducer } from '../modules/api';
import rootSaga from '../modules/sagas';

export default history => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [routerMiddleware(history), sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
  }

  const store = createStore(
    combineReducers({
      api: apiReducer,
      auth: authReducer,
      router: routerReducer,
      search: searchReducer,
      messages: messagesReducer,
      ui: uiReducer,
    }),
    applyMiddleware(...middleware),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
