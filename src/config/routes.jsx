import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import Root from 'containers/Root';
import Top from 'containers/Top';
import Payment from 'containers/Payment';
import NewSpaceSpaceInfo from 'containers/NewSpace/SpaceInfo';
import AboutBaggage from 'containers/NewSpace/AboutBaggage';
import ReceiveBaggage from 'containers/NewSpace/ReceiveBaggage';
import SpaceSize from 'containers/NewSpace/SpaceSize';
import SpacePrice from 'containers/NewSpace/Price';
import SpaceCreatedCompletion from 'containers/NewSpace/SpaceCreatedCompletion';
import CancelSchedule from 'containers/CancelSchedule';
import Estimate from 'containers/Estimate';
import PostHostReview from 'containers/PostHostReview';
import Payments from 'containers/Payments';
import SalesTransferList from 'containers/SalesTransfer/SalesTransferList';
import TransferRequest from 'containers/SalesTransfer/TransferRequest';
import EditBankAccount from 'containers/SalesTransfer/EditBankAccount';
import Unsubscribe from 'containers/Unsubscribe';
import Report from 'containers/Report';

import About from 'containers/Static/About';
import Insurance from 'containers/Static/Insurance';
import Rule from 'containers/Static/Rule';
import Maintenance from 'containers/Static/Maintenance';
import NotFound from 'containers/Static/NotFound';
import Error from 'containers/Static/Error';
import CancellationPolicies from 'containers/Static/CancellationPolicies';
import Asct from 'containers/Static/Asct';
import Company from 'containers/Static/Company';
import Privacy from 'containers/Static/Privacy';
import Terms from 'containers/Static/Terms';

import HelpTop from 'containers/Static/Help/Top';
import HelpService from 'containers/Static/Help/Service';

import Containers from 'components/atomic/containers';

// import ErrorBoundary from 'components/ErrorBoundary';

import Path from './path';

require('./fontawesome-all.min.js');

export const routes = [
  // new
  { path: Path.login(), component: Containers.Login },
  { path: Path.signup(), component: Containers.Signup },
  { path: Path.resetPassword(), component: Containers.ResetPassword },
  { path: Path.search(), component: Containers.SearchResult },
  { path: Path.space(), component: Containers.Space },
  { path: Path.spaces(), component: Containers.SpaceManagement },
  { path: Path.schedule(), component: Containers.Schedule },
  { path: Path.profile(), component: Containers.Profile },
  { path: Path.editProfile(), component: Containers.EditProfile },
  { path: Path.inquiry(), component: Containers.Inquiry },
  { path: Path.messages(), component: Containers.Inbox },
  { path: Path.message(), component: Containers.Message },
  // legacy
  { path: Path.top(), component: Top },
  { path: Path.payment(), component: Payment },
  { path: Path.createSpaceInfo(), component: NewSpaceSpaceInfo },
  { path: Path.createSpaceBaggage(), component: AboutBaggage },
  { path: Path.createSpaceReceive(), component: ReceiveBaggage },
  { path: Path.createSpaceAreaSize(), component: SpaceSize },
  { path: Path.createSpacePrice(), component: SpacePrice },
  { path: Path.createSpaceCompletion(), component: SpaceCreatedCompletion },
  { path: Path.editSpaceInfo(), component: NewSpaceSpaceInfo },
  { path: Path.editSpaceBaggage(), component: AboutBaggage },
  { path: Path.editSpaceReceive(), component: ReceiveBaggage },
  { path: Path.editSpaceAreaSize(), component: SpaceSize },
  { path: Path.editSpacePrice(), component: SpacePrice },
  { path: Path.editSpaceCompletion(), component: SpaceCreatedCompletion },
  { path: Path.confirmCancel(), component: CancelSchedule },
  { path: Path.estimate(), component: Estimate },
  { path: Path.hostReview(), component: PostHostReview },
  { path: Path.paid(), component: Payments },
  { path: Path.salesTransfers(), component: SalesTransferList },
  { path: Path.requestTransfer(), component: TransferRequest },
  { path: Path.editBankAccount(), component: EditBankAccount },
  { path: Path.unsubscribe(), component: Unsubscribe },
  { path: Path.reportUser(), component: Report },
  { path: Path.reportSpace(), component: Report },
  { path: Path.about(), component: About },
  { path: Path.insurance(), component: Insurance },
  { path: Path.rule(), component: Rule },
  { path: Path.maintenance(), component: Maintenance },
  { path: Path.notFound(), component: NotFound },
  { path: Path.error(), component: Error },
  { path: Path.cancellationPolicies(), component: CancellationPolicies },
  { path: Path.asct(), component: Asct },
  { path: Path.company(), component: Company },
  { path: Path.privacy(), component: Privacy },
  { path: Path.terms(), component: Terms },
  { path: Path.helpTop(), component: HelpTop },
  { path: Path.helpService(), component: HelpService },
  { path: Path.helpUserTransaction(), component: HelpService },
  { path: Path.helpHost(), component: HelpService },
  { path: Path.helpSpace(), component: HelpService },
  { path: Path.helpHostTransaction(), component: HelpService },
  { path: Path.helpSalesTransfer(), component: HelpService },
  { path: Path.helpSignin(), component: HelpService },
  { path: Path.helpOther(), component: HelpService },
];

export default props => (
  <ConnectedRouter history={props.history}>
    <Root>
      <Switch>
        {routes.map((route, i) => (
          <Route key={`route_${i}`} exact path={route.path} component={route.component} />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Root>
  </ConnectedRouter>
);
