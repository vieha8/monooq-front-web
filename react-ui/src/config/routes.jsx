import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import Path from './path';

const Top = Loadable({
  loader: () => import('components/atomic/containers/TopContainer'),
  loading: LoadingPage,
});

const Login = Loadable({
  loader: () => import('components/atomic/containers/LoginContainer'),
  loading: LoadingPage,
});

const SignUp = Loadable({
  loader: () => import('components/atomic/containers/SignUpContainer'),
  loading: LoadingPage,
});

const ResetPassword = Loadable({
  loader: () => import('components/atomic/containers/ResetPasswordContainer'),
  loading: LoadingPage,
});

const Search = Loadable({
  loader: () => import('components/atomic/containers/SearchResultContainer'),
  loading: LoadingPage,
});

const Space = Loadable({
  loader: () => import('components/atomic/containers/SpaceContainer'),
  loading: LoadingPage,
});

const Spaces = Loadable({
  loader: () => import('components/atomic/containers/SpaceManagementContainer'),
  loading: LoadingPage,
});

const Schedule = Loadable({
  loader: () => import('components/atomic/containers/ScheduleContainer'),
  loading: LoadingPage,
});

const Profile = Loadable({
  loader: () => import('components/atomic/containers/ProfileContainer'),
  loading: LoadingPage,
});

const EditProfile = Loadable({
  loader: () => import('components/atomic/containers/EditProfileContainer'),
  loading: LoadingPage,
});

const Inquiry = Loadable({
  loader: () => import('components/atomic/containers/InquiryContainer'),
  loading: LoadingPage,
});

const Messages = Loadable({
  loader: () => import('components/atomic/containers/InboxContainer'),
  loading: LoadingPage,
});

const Message = Loadable({
  loader: () => import('components/atomic/containers/MessageContainer'),
  loading: LoadingPage,
});

const Estimate = Loadable({
  loader: () => import('components/atomic/containers/EstimateContainer'),
  loading: LoadingPage,
});

const Payment = Loadable({
  loader: () => import('components/atomic/containers/PaymentContainer'),
  loading: LoadingPage,
});

const CreateSpaceInfo = Loadable({
  loader: () => import('components/atomic/containers/EditSpaceInformationContainer'),
  loading: LoadingPage,
});

const EditSpaceInfo = Loadable({
  loader: () => import('components/atomic/containers/EditSpaceInformationContainer'),
  loading: LoadingPage,
});

const CreateSpaceBaggage = Loadable({
  loader: () => import('components/atomic/containers/EditSpaceBaggageContainer'),
  loading: LoadingPage,
});

const EditSpaceBaggage = Loadable({
  loader: () => import('components/atomic/containers/EditSpaceBaggageContainer'),
  loading: LoadingPage,
});

const CreateSpaceReceive = Loadable({
  loader: () => import('components/atomic/containers/EditSpaceReceiveContainer'),
  loading: LoadingPage,
});

const EditSpaceReceive = Loadable({
  loader: () => import('components/atomic/containers/EditSpaceReceiveContainer'),
  loading: LoadingPage,
});

const CreateSpaceAreaSize = Loadable({
  loader: () => import('components/atomic/containers/EditSpaceSizeContainer'),
  loading: LoadingPage,
});

const EditSpaceAreaSize = Loadable({
  loader: () => import('components/atomic/containers/EditSpaceSizeContainer'),
  loading: LoadingPage,
});

const CreateSpacePriceAll = Loadable({
  loader: () => import('components/atomic/containers/EditSpacePriceAllContainer'),
  loading: LoadingPage,
});

const EditSpacePriceAll = Loadable({
  loader: () => import('components/atomic/containers/EditSpacePriceAllContainer'),
  loading: LoadingPage,
});

const CreateSpacePriceType = Loadable({
  loader: () => import('components/atomic/containers/EditSpacePriceTypeContainer'),
  loading: LoadingPage,
});

const EditSpacePriceType = Loadable({
  loader: () => import('components/atomic/containers/EditSpacePriceTypeContainer'),
  loading: LoadingPage,
});

const CreateSpaceCompletion = Loadable({
  loader: () => import('components/atomic/containers/EditSpaceCompletionContainer'),
  loading: LoadingPage,
});

const EditSpaceCompletion = Loadable({
  loader: () => import('components/atomic/containers/EditSpaceCompletionContainer'),
  loading: LoadingPage,
});

const Unsubscribe = Loadable({
  loader: () => import('components/atomic/containers/UnsubscribeContainer'),
  loading: LoadingPage,
});

const Sales = Loadable({
  loader: () => import('components/atomic/containers/SalesContainer'),
  loading: LoadingPage,
});

const ConciergeRequest = Loadable({
  loader: () => import('components/atomic/containers/ConciergeRequestContainer'),
  loading: LoadingPage,
});

const About = Loadable({
  loader: () => import('components/atomic/containers/Static/About'),
  loading: LoadingPage,
});

const Insurance = Loadable({
  loader: () => import('components/atomic/containers/Static/Insurance'),
  loading: LoadingPage,
});

const Rule = Loadable({
  loader: () => import('components/atomic/containers/Static/Rule'),
  loading: LoadingPage,
});

const NotFound = Loadable({
  loader: () => import('components/atomic/containers/Static/NotFound'),
  loading: LoadingPage,
});

const Error = Loadable({
  loader: () => import('components/atomic/containers/Static/Error'),
  loading: LoadingPage,
});

const CancelPolicy = Loadable({
  loader: () => import('components/atomic/containers/Static/CancellationPolicies'),
  loading: LoadingPage,
});

const Asct = Loadable({
  loader: () => import('components/atomic/containers/Static/Asct'),
  loading: LoadingPage,
});

const Privacy = Loadable({
  loader: () => import('components/atomic/containers/Static/Privacy'),
  loading: LoadingPage,
});

const Terms = Loadable({
  loader: () => import('components/atomic/containers/Static/Terms'),
  loading: LoadingPage,
});

const HelpTop = Loadable({
  loader: () => import('components/atomic/containers/Static/Help/Top'),
  loading: LoadingPage,
});

const HelpService = Loadable({
  loader: () => import('components/atomic/containers/Static/Help/Service'),
  loading: LoadingPage,
});

const HelpUserTransaction = Loadable({
  loader: () => import('components/atomic/containers/Static/Help/Service'),
  loading: LoadingPage,
});

const HelpHost = Loadable({
  loader: () => import('components/atomic/containers/Static/Help/Service'),
  loading: LoadingPage,
});

const HelpSpace = Loadable({
  loader: () => import('components/atomic/containers/Static/Help/Service'),
  loading: LoadingPage,
});

const HelpHostTransaction = Loadable({
  loader: () => import('components/atomic/containers/Static/Help/Service'),
  loading: LoadingPage,
});

const HelpSalesTransfer = Loadable({
  loader: () => import('components/atomic/containers/Static/Help/Service'),
  loading: LoadingPage,
});

const HelpSignIn = Loadable({
  loader: () => import('components/atomic/containers/Static/Help/Service'),
  loading: LoadingPage,
});

const HelpOther = Loadable({
  loader: () => import('components/atomic/containers/Static/Help/Service'),
  loading: LoadingPage,
});

export default ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={Path.top()} component={Top} />
      <Route exact path={Path.login()} component={Login} />
      <Route exact path={Path.signUp()} component={SignUp} />
      <Route exact path={Path.resetPassword()} component={ResetPassword} />
      <Route exact path={Path.search()} component={Search} />
      <Route exact path={Path.space()} component={Space} />
      <Route exact path={Path.spaces()} component={Spaces} />
      <Route exact path={Path.schedule()} component={Schedule} />
      <Route exact path={Path.profile()} component={Profile} />
      <Route exact path={Path.editProfile()} component={EditProfile} />
      <Route exact path={Path.inquiry()} component={Inquiry} />
      <Route exact path={Path.messages()} component={Messages} />
      <Route exact path={Path.message()} component={Message} />
      <Route exact path={Path.estimate()} component={Estimate} />
      <Route exact path={Path.payment()} component={Payment} />
      <Route exact path={Path.createSpaceInfo()} component={CreateSpaceInfo} />
      <Route exact path={Path.editSpaceInfo()} component={EditSpaceInfo} />
      <Route exact path={Path.createSpaceBaggage()} component={CreateSpaceBaggage} />
      <Route exact path={Path.editSpaceBaggage()} component={EditSpaceBaggage} />
      <Route exact path={Path.createSpaceReceive()} component={CreateSpaceReceive} />
      <Route exact path={Path.editSpaceReceive()} component={EditSpaceReceive} />
      <Route exact path={Path.createSpaceAreaSize()} component={CreateSpaceAreaSize} />
      <Route exact path={Path.editSpaceAreaSize()} component={EditSpaceAreaSize} />
      <Route exact path={Path.createSpacePrice('all')} component={CreateSpacePriceAll} />
      <Route exact path={Path.editSpacePrice(undefined, 'all')} component={EditSpacePriceAll} />
      <Route exact path={Path.createSpacePrice('about')} component={CreateSpacePriceType} />
      <Route exact path={Path.editSpacePrice(undefined, 'about')} component={EditSpacePriceType} />
      <Route exact path={Path.createSpaceCompletion()} component={CreateSpaceCompletion} />
      <Route exact path={Path.editSpaceCompletion()} component={EditSpaceCompletion} />
      <Route exact path={Path.unsubscribe()} component={Unsubscribe} />
      <Route exact path={Path.sales()} component={Sales} />
      <Route exact path={Path.conciergeRequest()} component={ConciergeRequest} />
      <Route exact path={Path.about()} component={About} />
      <Route exact path={Path.insurance()} component={Insurance} />
      <Route exact path={Path.rule()} component={Rule} />
      <Route exact path={Path.error()} component={Error} />
      <Route exact path={Path.cancellationPolicies()} component={CancelPolicy} />
      <Route exact path={Path.asct()} component={Asct} />
      <Route exact path={Path.privacy()} component={Privacy} />
      <Route exact path={Path.terms()} component={Terms} />
      <Route exact path={Path.helpTop()} component={HelpTop} />
      <Route exact path={Path.helpService()} component={HelpService} />
      <Route exact path={Path.helpUserTransaction()} component={HelpUserTransaction} />
      <Route exact path={Path.helpHost()} component={HelpHost} />
      <Route exact path={Path.helpSpace()} component={HelpSpace} />
      <Route exact path={Path.helpHostTransaction()} component={HelpHostTransaction} />
      <Route exact path={Path.helpSalesTransfer()} component={HelpSalesTransfer} />
      <Route exact path={Path.helpSignIn()} component={HelpSignIn} />
      <Route exact path={Path.helpOther()} component={HelpOther} />
      <Route component={NotFound} />
    </Switch>
  </ConnectedRouter>
);
