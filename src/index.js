import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';

import Top from './containers/Top';
import Search from './containers/Search';
import Space from './containers/Space';
import Message from './containers/Message';
import Messages from './containers/Messages';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    router: routerReducer,
  }),
  applyMiddleware(middleware),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Top} />
        <Route exact path="/search/:location" component={Search} />
        <Route exact path="/space/:id" component={Space} />
        <Route exact path="/messages" component={Messages} />
        <Route exact path="/message/:user_id" component={Message} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
