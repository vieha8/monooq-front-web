import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { authReducer } from 'redux/modules/auth';
import { searchReducer } from 'redux/modules/search';
import { messagesReducer } from 'redux/modules/messages';
import { uiReducer } from 'redux/modules/ui';
import rootSaga from 'redux/modules/sagas';

export default history => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [routerMiddleware(history), sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
  }

  const store = createStore(
    combineReducers({
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
