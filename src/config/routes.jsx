import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import Top from 'containers/Top';
import SearchPage from 'containers/Search/SearchPage';
import SpacePage from 'containers/Space/SpacePage';
import CreateSpaceSpaceInfo from 'containers/CreateSpace/SpaceInfo';
import AboutBaggage from 'containers/CreateSpace/AboutBaggage';
import ReceiveBaggage from 'containers/CreateSpace/ReceiveBaggage';
import SpaceSize from 'containers/CreateSpace/SpaceSize';
import AboutPrice from 'containers/CreateSpace/AboutPrice';
import AllUsePrice from 'containers/CreateSpace/AllUsePrice';
import SpaceCreatedCompletion from 'containers/CreateSpace/SpaceCreatedCompletion';
import Message from 'containers/Message/';
import Messages from 'containers/Messages/';
import Signup from 'containers/Signup';
import ProfileForm from 'containers/ProfileForm';
import Profile from 'containers/Profile';
import SpaceForm from 'containers/SpaceForm';
import SpaceManageList from 'containers/SpaceManageList';
import Login from 'containers/Login';
import Payment from 'containers/Payment';
import RequestCancel from 'containers/RequestCancel';
import Accept from 'containers/Accept';
import Estimate from 'containers/Estimate';

import Header from 'components/Header';
import { Auth } from 'components/Auth';

export const routes = {
  root: {
    path: '/',
    component: Top,
  },
  search: {
    path: '/search/:location',
    component: SearchPage,
  },
  spaceNewInfo: {
    path: '/space/new/info',
    component: CreateSpaceSpaceInfo,
  },
  spaceNewBaggage: {
    path: '/space/new/about_baggage',
    component: AboutBaggage,
  },
  spaceNewReceive: {
    path: '/space/new/receive_baggage',
    component: ReceiveBaggage,
  },
  spaceNewSize: {
    path: '/space/new/space_size',
    component: SpaceSize,
  },
  spaceNewPrice: {
    path: '/space/new/about_price',
    component: AboutPrice,
  },
  spaceNewAllPrice: {
    path: '/space/new/all_use_price',
    component: AllUsePrice,
  },
  spaceCreated: {
    path: '/space/new/space_created',
    component: SpaceCreatedCompletion,
  },
  space: {
    path: '/space/:id',
    component: SpacePage,
  },
  messages: {
    path: '/messages',
    component: Messages,
  },
  messageOfRoom: {
    path: '/messages/:room_id',
    component: Message,
  },
  signup: {
    path: '/signup',
    component: Signup,
  },
  editProfile: {
    path: '/edit/profile/:user_id',
    component: ProfileForm,
  },
  profile: {
    path: '/profile/:user_id',
    component: Profile,
  },
  editSpace: {
    path: '/edit/space/:id',
    component: SpaceForm,
  },
  spaceList: {
    path: '/manage/space/list',
    component: SpaceManageList,
  },
  login: {
    path: '/login',
    component: Login,
  },
  payment: {
    path: '/payment/:payment_id',
    component: Payment,
  },
  cancel: {
    path: '/cancel/:payment_id',
    component: RequestCancel,
  },
  accept: {
    path: '/accept/:payment_id',
    component: Accept,
  },
  estimate: {
    path: '/estimate/:payment_id',
    component: Estimate,
  },
};

export default props => (
  <ConnectedRouter history={props.history}>
    <div>
      <Auth />
      <Header />
      {Object.keys(routes).map((routeKey, i) => (
        <Route
          key={`route_${i}`}
          exact
          path={routes[routeKey].path}
          component={routes[routeKey].component}
        />
      ))}
    </div>
  </ConnectedRouter>
);
