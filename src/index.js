import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';

import { searchReducer } from './modules/search';
import rootSaga from './modules/sagas';

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
import Payment from './containers/Payment';
import RequestCancel from './containers/RequestCancel';
import Accept from './containers/Accept';
import Estimate from './containers/Estimate';
// TODO routerはindexから分離する

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = [routerMiddleware(history), sagaMiddleware, logger]; // TODO productionはlogger切る

const store = createStore(
  combineReducers({
    router: routerReducer,
    search: searchReducer,
  }),
  applyMiddleware(...middleware),
);

sagaMiddleware.run(rootSaga);

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
        <Route exact path="/payment/:payment_id" component={Payment} />
        <Route exact path="/cancel/:payment_id" component={RequestCancel} />
        <Route exact path="/accept/:payment_id" component={Accept} />
        <Route exact path="/estimate/:payment_id" component={Estimate} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
