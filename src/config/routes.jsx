import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import Top from '../containers/Top';
import SearchPage from '../containers/Search/SearchPage';
import SpacePage from '../containers/Space/SpacePage';
import CreateSpaceSpaceInfo from '../containers/CreateSpace/SpaceInfo';
import Message from '../containers/Message/';
import Messages from '../containers/Messages/';
import Signup from '../containers/Signup';
import ProfileForm from '../containers/ProfileForm';
import Profile from '../containers/Profile';
import SpaceForm from '../containers/SpaceForm';
import SpaceManageList from '../containers/SpaceManageList';
import Login from '../containers/Login';
import Payment from '../containers/Payment';
import RequestCancel from '../containers/RequestCancel';
import Accept from '../containers/Accept';
import Estimate from '../containers/Estimate';

import Header from '../components/Header';
import { Auth } from '../components/Auth';

/* eslint-disable no-multi-spaces */
const routes = [
  { path: '/',                          component: Top },
  { path: '/search/:location',          component: SearchPage },
  { path: '/space/new/info',            component: CreateSpaceSpaceInfo },
  { path: '/space/:id',                 component: SpacePage },
  { path: '/messages',                  component: Messages },
  { path: '/messages/:room_id',         component: Message },
  { path: '/signup',                    component: Signup },
  { path: '/edit/profile/:user_id',     component: ProfileForm },
  { path: '/profile/:user_id',          component: Profile },
  { path: '/edit/space/:id',            component: SpaceForm },
  { path: '/manage/space/list',         component: SpaceManageList },
  { path: '/login',                     component: Login },
  { path: '/payment/:payment_id',       component: Payment },
  { path: '/cancel/:payment_id',        component: RequestCancel },
  { path: '/accept/:payment_id',        component: Accept },
  { path: '/estimate/:payment_id',      component: Estimate },
];
/* eslint-enable no-multi-spaces */

export default props => (
  <ConnectedRouter history={props.history}>
    <div>
      <Auth />
      <Header />
      {routes.map((r, i) => <Route key={`route_${i}`} exact path={r.path} component={r.component} />)}
    </div>
  </ConnectedRouter>
);
