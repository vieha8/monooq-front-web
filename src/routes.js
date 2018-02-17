import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

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

import Header from './components/Header';
import { Auth } from './components/Auth';

export default props => (
  <ConnectedRouter history={props.history}>
    <div>
      <Auth />
      <Header />
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
);
