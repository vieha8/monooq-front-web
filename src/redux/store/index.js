import { applyMiddleware, createStore, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import Router from 'next/router';
import { createRouterMiddleware, initialRouterState } from 'connected-next-router';
import createReducers from 'redux/store/reducers';
import sagaMiddleware, { rootSaga } from 'redux/middlewares/saga';
import gaMiddleware from '../middlewares/googleAnalytics';
import sentryMiddleware from '../middlewares/sentry';
import prevPathMiddleware from '../middlewares/prevPath';

let store = null;
const routerMiddleware = createRouterMiddleware();

const configureStore = context => {
  const middleware = [
    prevPathMiddleware,
    routerMiddleware,
    sagaMiddleware,
    gaMiddleware,
    sentryMiddleware({}),
  ];

  const { asPath } = context.ctx || Router.router || {};
  let initialState;
  if (asPath) {
    initialState = {
      router: initialRouterState(asPath),
    };
  }

  let composeEnhancers = compose;
  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middleware.push(logger);
    composeEnhancers = (global.window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  }
  const reducers = createReducers();
  store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);
  return store;
};

export default createWrapper(configureStore, { debug: true });
