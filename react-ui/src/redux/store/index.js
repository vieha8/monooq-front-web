import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore, compose } from 'redux';
import { createBrowserHistory } from 'history';
import createReducers from 'redux/store/reducers';
import sagaMiddleware, { rootSaga } from 'redux/middlewares/saga';

import gaMiddleware from '../middlewares/googleAnalytics';
import keenMiddleware from '../middlewares/keen';
import sentryMiddleware from '../middlewares/sentry';

export const history = createBrowserHistory();
history.listen((location, action) => {
  if (action === 'POP') {
    return;
  }
  window.scrollTo(0, 0);
});

let store = null;

const configureStore = () => {
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

  const reducers = createReducers(history);

  store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
