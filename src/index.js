import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';

import Top from './containers/Top';
import Search from './containers/Search/';
import Space from './containers/Space/';
import Message from './containers/Message/';
import Messages from './containers/Messages/';
import Signup from './containers/Signup';
import ProfileForm from './containers/ProfileForm';
import Profile from './containers/Profile';
import SpaceForm from './containers/SpaceForm';
import SpaceManageList from './containers/SpaceManageList';
import Login from './containers/Login';

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
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/edit/profile/:user_id" component={ProfileForm} />
        <Route exact path="/profile/:user_id" component={Profile} />
        <Route exact path="/edit/space/:id" component={SpaceForm} />
        <Route exact path="/manage/space/list" component={SpaceManageList} />
        <Route exact path="/login" component={Login} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
