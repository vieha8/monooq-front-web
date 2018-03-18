import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import Root from 'containers/Root';
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
import Schedule from 'containers/Schedule';
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
import Unsubscribe from 'containers/Unsubscribe';
import Report from 'containers/Report';

import About from 'containers/Static/About';
import Insurance from 'containers/Static/Insurance';
import Rule from 'containers/Static/Rule';
import Maintenance from 'containers/Static/Maintenance';
import NotFound from 'containers/Static/NotFound';
import CancellationPolicies from 'containers/Static/CancellationPolicies';
import Asct from 'containers/Static/Asct';
import Company from 'containers/Static/Company';
import Privacy from 'containers/Static/Privacy';
import Terms from 'containers/Static/Terms';

import HelpTop from 'containers/Static/Help/Top';
import HelpAboutService from 'containers/Static/Help/AboutService';

import NavigationHeader from 'containers/NavigationHeader';

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
  { path: Path.createSpaceAreaPrice(), component: AboutPrice },
  { path: Path.createSpaceAllPrice(), component: AllUsePrice },
  { path: Path.createSpaceCompletion(), component: SpaceCreatedCompletion },
  { path: Path.schedule(), component: Schedule },
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
  { path: Path.unsubscribe(), component: Unsubscribe },
  { path: Path.report(), component: Report },
  { path: Path.about(), component: About },
  { path: Path.insurance(), component: Insurance },
  { path: Path.rule(), component: Rule },
  { path: Path.maintenance(), component: Maintenance },
  { path: Path.notFound(), component: NotFound },
  { path: Path.cancellationPolicies(), component: CancellationPolicies },
  { path: Path.asct(), component: Asct },
  { path: Path.company(), component: Company },
  { path: Path.privacy(), component: Privacy },
  { path: Path.terms(), component: Terms },
  { path: Path.helpTop(), component: HelpTop },
  { path: Path.helpAboutService(), component: HelpAboutService },
];

export default props => (
  <ConnectedRouter history={props.history}>
    <Root>
      <NavigationHeader />
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={`route_${i}`}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Root>
  </ConnectedRouter>
);
