import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import styled from 'styled-components';

import About from 'components/atomic/containers/Static/About';
import Insurance from 'components/atomic/containers/Static/Insurance';
import Rule from 'components/atomic/containers/Static/Rule';
import NotFound from 'components/atomic/containers/Static/NotFound';
import Error from 'components/atomic/containers/Static/Error';
import CancellationPolicies from 'components/atomic/containers/Static/CancellationPolicies';
import Asct from 'components/atomic/containers/Static/Asct';
import Privacy from 'components/atomic/containers/Static/Privacy';
import Terms from 'components/atomic/containers/Static/Terms';
import HelpTop from 'components/atomic/containers/Static/Help/Top';
import HelpService from 'components/atomic/containers/Static/Help/Service';

import Containers from 'components/atomic/containers';

import Path from './path';

export const routes = [
  // service pages
  { path: Path.top(), component: Containers.Top },
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
  { path: Path.estimate(), component: Containers.Estimate },
  { path: Path.payment(), component: Containers.Payment },
  { path: Path.createSpaceInfo(), component: Containers.EditSpaceInformation },
  { path: Path.editSpaceInfo(), component: Containers.EditSpaceInformation },
  { path: Path.createSpaceBaggage(), component: Containers.EditSpaceBaggage },
  { path: Path.editSpaceBaggage(), component: Containers.EditSpaceBaggage },
  { path: Path.createSpaceReceive(), component: Containers.EditSpaceReceive },
  { path: Path.editSpaceReceive(), component: Containers.EditSpaceReceive },
  { path: Path.createSpaceAreaSize(), component: Containers.EditSpaceSize },
  { path: Path.editSpaceAreaSize(), component: Containers.EditSpaceSize },
  { path: Path.createSpacePrice('all'), component: Containers.EditSpacePriceAll },
  { path: Path.editSpacePrice(undefined, 'all'), component: Containers.EditSpacePriceAll },
  { path: Path.createSpacePrice('about'), component: Containers.EditSpacePriceType },
  { path: Path.editSpacePrice(undefined, 'about'), component: Containers.EditSpacePriceType },
  { path: Path.createSpaceCompletion(), component: Containers.EditSpaceCompletion },
  { path: Path.editSpaceCompletion(), component: Containers.EditSpaceCompletion },
  { path: Path.unsubscribe(), component: Containers.Unsubscribe },
  { path: Path.sales(), component: Containers.Sales },
  { path: Path.hubRequest(), component: Containers.HubRequest },
  { path: Path.conciergeRequest(), component: Containers.ConciergeRequest },
  // static pages
  { path: Path.about(), component: About },
  { path: Path.insurance(), component: Insurance },
  { path: Path.rule(), component: Rule },
  { path: Path.notFound(), component: NotFound },
  { path: Path.error(), component: Error },
  { path: Path.cancellationPolicies(), component: CancellationPolicies },
  { path: Path.asct(), component: Asct },
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

const Root = styled.div`
  overflow: auto;
`;

export default ({ history }) => (
  <ConnectedRouter history={history}>
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
