import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Intercom from 'react-intercom';

import Top from 'containers/Top';
import SearchPage from 'containers/Search/SearchPage';
import SpacePage from 'containers/Space/SpacePage';
import NewSpaceSpaceInfo from 'containers/NewSpace/SpaceInfo';
import AboutBaggage from 'containers/NewSpace/AboutBaggage';
import ReceiveBaggage from 'containers/NewSpace/ReceiveBaggage';
import SpaceSize from 'containers/NewSpace/SpaceSize';
import AboutPrice from 'containers/NewSpace/AboutPrice';
import AllUsePrice from 'containers/NewSpace/AllUsePrice';
import SpaceCreatedCompletion from 'containers/NewSpace/SpaceCreatedCompletion';
import Message from 'containers/Message/';
import Messages from 'containers/Messages/';
import SignUp from 'containers/SignUp';
import SpaceForm from 'containers/SpaceForm';
import SpaceManageList from 'containers/SpaceManageList';
import Login from 'containers/Login';
import Logout from 'containers/Logout';
import Payment from 'containers/Payment';
import Payments from 'containers/Payments/';
import RequestCancel from 'containers/RequestCancel';
import Accept from 'containers/Accept';
import Estimate from 'containers/Estimate';
import HostSpaceList from 'containers/HostSpaceList';
import DepositSchedule from 'containers/DepositSchedule';
import CancelSchedule from 'containers/CancelSchedule';
import PostHostReview from 'containers/PostHostReview';
import HostReview from 'containers/HostReview';
import EditProfile from 'containers/EditProfile';
import Inquiry from 'containers/Inquiry';
import Unsubscribe from 'containers/Unsubscribe';
import SalesTransferList from 'containers/SalesTransfer/SalesTransferList';
import EditBankAccount from 'containers/SalesTransfer/EditBankAccount';
import TransferRequest from 'containers/SalesTransfer/TransferRequest';
import Report from 'containers/Report';

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
    component: NewSpaceSpaceInfo,
  },
  spaceNewBaggage: {
    path: '/space/new/about-baggage',
    component: AboutBaggage,
  },
  spaceNewReceive: {
    path: '/space/new/receive-baggage',
    component: ReceiveBaggage,
  },
  spaceNewSize: {
    path: '/space/new/space-size',
    component: SpaceSize,
  },
  spaceNewPrice: {
    path: '/space/new/about-price',
    component: AboutPrice,
  },
  spaceNewAllPrice: {
    path: '/space/new/all-use-price',
    component: AllUsePrice,
  },
  spaceCreated: {
    path: '/space/new/space-created',
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
    component: SignUp,
  },
  profile: {
    path: '/profile/:user_id',
    component: HostReview,
  },
  editProfile: {
    path: '/profile/:user_id/edit',
    component: EditProfile,
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
  logout: {
    path: '/logout',
    component: Logout,
  },
  payment: {
    path: '/payment/:payment_id',
    component: Payment,
  },
  payments: {
    path: '/payments',
    component: Payments,
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
  mySpaceList: {
    path: '/:host_id/space-list',
    component: HostSpaceList,
  },
  depositSchedule: {
    path: '/:host_id/deposit-schedule',
    component: DepositSchedule,
  },
  cancelSchedule: {
    path: '/:host_id/deposit-schedule/:schedule_id/cancel',
    component: CancelSchedule,
  },
  postHostReview: {
    path: '/:host_id/review/new',
    component: PostHostReview,
  },
  inquiry: {
    path: '/inquiry',
    component: Inquiry,
  },
  unsubscribe: {
    path: '/unsubscribe',
    component: Unsubscribe,
  },
  salesTransferList: {
    path: '/:host_id/sales-transfer',
    component: SalesTransferList,
  },
  editBankAccount: {
    path: '/:host_id/bank-account/edit',
    component: EditBankAccount,
  },
  transferRequest: {
    path: '/:host_id/transfer-request',
    component: TransferRequest,
  },
  report: {
  path: '/report',
  component: Report,
  },
};

export default props => (
  <ConnectedRouter history={props.history}>
    <div>
      <Auth />
      <Intercom appID="v0rdx0ap" />
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
