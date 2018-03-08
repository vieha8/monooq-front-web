import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import Top from 'containers/Top';
import SearchPage from 'containers/Search/SearchPage';
import HostSpaceList from 'containers/HostSpaceList';
import SpacePage from 'containers/Space/SpacePage';
import Payment from 'containers/Payment';
import NewSpaceSpaceInfo from 'containers/NewSpace/SpaceInfo';
import AboutBaggage from 'containers/NewSpace/AboutBaggage';
import ReceiveBaggage from 'containers/NewSpace/ReceiveBaggage';
import SpaceSize from 'containers/NewSpace/SpaceSize';
import AboutPrice from 'containers/NewSpace/AboutPrice';
import AllUsePrice from 'containers/NewSpace/AllUsePrice';
import SpaceCreatedCompletion from 'containers/NewSpace/SpaceCreatedCompletion';
import DepositSchedule from 'containers/DepositSchedule';
import CancelSchedule from 'containers/CancelSchedule';
import Messages from 'containers/Messages/';
import Message from 'containers/Message/';
import Estimate from 'containers/Estimate';
import HostReview from 'containers/HostReview';
import EditProfile from 'containers/EditProfile';
import PostHostReview from 'containers/PostHostReview';
import Payments from 'containers/Payments';
import SalesTransferList from 'containers/SalesTransfer/SalesTransferList';
import TransferRequest from 'containers/SalesTransfer/TransferRequest';
import EditBankAccount from 'containers/SalesTransfer/EditBankAccount';
import Inquiry from 'containers/Inquiry';
import SignUp from 'containers/SignUp';
import Login from 'containers/Login';
import Logout from 'containers/Logout';
import Unsubscribe from 'containers/Unsubscribe';

import NavigationHeader from 'containers/NavigationHeader';
import { TopPadding as HeaderPadding } from 'components/NavigationHeader';
import { Auth } from 'components/Auth';

import Path from './path';

require('./fontawesome-all.min.js');

export const routes = [
  { path: Path.top(), component: Top },
  { path: Path.search(), component: SearchPage },
  { path: Path.spaces(), component: HostSpaceList },
  { path: Path.space(), component: SpacePage },
  { path: Path.payment(), component: Payment },
  { path: Path.createSpaceInfo(), component: NewSpaceSpaceInfo },
  { path: Path.createSpaceBaggage(), component: AboutBaggage },
  { path: Path.createSpaceReceive(), component: ReceiveBaggage },
  { path: Path.createSpaceAreaSize(), component: SpaceSize },
  { path: Path.createSpaceAreaPrice(), compoennt: AboutPrice },
  { path: Path.createSpaceAllPrice(), component: AllUsePrice },
  { path: Path.createSpaceCompletion(), component: SpaceCreatedCompletion },
  { path: Path.schedule(), component: DepositSchedule },
  { path: Path.confirmCancel(), component: CancelSchedule },
  { path: Path.messages(), component: Messages },
  { path: Path.message(), component: Message },
  { path: Path.estimate(), component: Estimate },
  { path: Path.profile(), component: HostReview },
  { path: Path.editProfile(), component: EditProfile },
  { path: Path.hostReview(), component: PostHostReview },
  { path: Path.paid(), component: Payments },
  { path: Path.salesTransfers(), component: SalesTransferList },
  { path: Path.requestTransfer(), component: TransferRequest },
  { path: Path.editBankAccount(), component: EditBankAccount },
  { path: Path.inquiry(), component: Inquiry },
  { path: Path.signup(), component: SignUp },
  { path: Path.login(), component: Login },
  { path: Path.logout(), component: Logout },
  { path: Path.unsubscribe(), component: Unsubscribe },
];

export default props => (
  <ConnectedRouter history={props.history}>
    <div>
      <Auth />
      <NavigationHeader />
      <HeaderPadding />
      {routes.map((route, i) => (
        <Route
          key={`route_${i}`}
          exact
          path={route.path}
          component={route.component}
        />
      ))}
    </div>
  </ConnectedRouter>
);
