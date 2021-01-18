import { applyMiddleware, createStore, compose } from 'redux';
import createReducers from 'redux/store/reducers';
import sagaMiddleware, { rootSaga } from 'redux/middlewares/saga';
import { createWrapper } from 'next-redux-wrapper';
import gaMiddleware from '../middlewares/googleAnalytics';
import sentryMiddleware from '../middlewares/sentry';
import prevPathMiddleware from '../middlewares/prevPath';

let store = null;

const configureStore = () => {
  const middleware = [prevPathMiddleware, sagaMiddleware, gaMiddleware, sentryMiddleware({})];

  let composeEnhancers = compose;
  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middleware.push(logger);
    composeEnhancers = (global.window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  }
  const reducers = createReducers();
  store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createWrapper(configureStore, { debug: true });
