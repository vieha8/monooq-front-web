import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { authReducer } from '../modules/auth';
import { searchReducer } from '../modules/search';
import { messagesReducer } from '../modules/messages';
import { uiReducer } from '../modules/ui';
import { spaceReducer } from '../modules/space';
import { userReducer } from '../modules/user';
import { requestReducer } from '../modules/request';
import { salesReducer } from '../modules/sales';
import { errorReducer } from '../modules/error';
import rootSaga from '../modules/sagas';

import { googleAnalytics } from '../middlewares/reactGAMiddlewares';

export let store = null;

export default history => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [routerMiddleware(history), sagaMiddleware, googleAnalytics];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  store = createStore(
    connectRouter(history)(
      combineReducers({
        auth: authReducer,
        search: searchReducer,
        messages: messagesReducer,
        space: spaceReducer,
        user: userReducer,
        ui: uiReducer,
        request: requestReducer,
        sales: salesReducer,
        error: errorReducer,
      }),
    ),
    composeEnhancers(applyMiddleware(...middleware)),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
