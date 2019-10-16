import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import loadable from '@loadable/component';
import Path from './config/path';

const Top = loadable(() =>
  import('components/containers/TopContainer').catch(() => window.location.reload()),
);
const Login = loadable(() =>
  import('components/containers/LoginContainer').catch(() => window.location.reload()),
);
const SignUp = loadable(() =>
  import('components/containers/SignUpContainer').catch(() => window.location.reload()),
);
const SignUpProfile = loadable(() =>
  import('components/containers/SignUpProfileContainer').catch(() => window.location.reload()),
);
const SignUpPurpose = loadable(() =>
  import('components/containers/SignUpPurposeContainer').catch(() => window.location.reload()),
);
const ResetPassword = loadable(() =>
  import('components/containers/ResetPasswordContainer').catch(() => window.location.reload()),
);
const Search = loadable(() =>
  import('components/containers/SearchResultContainer').catch(() => window.location.reload()),
);
const SearchCondition = loadable(() =>
  import('components/containers/SearchConditionContainer').catch(() => window.location.reload()),
);
const Space = loadable(() =>
  import('components/containers/SpaceContainer').catch(() => window.location.reload()),
);
const Spaces = loadable(() =>
  import('components/containers/SpaceManagementContainer').catch(() => window.location.reload()),
);
const Schedule = loadable(() =>
  import('components/containers/ScheduleContainer').catch(() => window.location.reload()),
);
const Profile = loadable(() =>
  import('components/containers/ProfileContainer').catch(() => window.location.reload()),
);
const ProfileEdit = loadable(() =>
  import('components/containers/ProfileEditContainer').catch(() => window.location.reload()),
);
const Inquiry = loadable(() =>
  import('components/containers/InquiryContainer').catch(() => window.location.reload()),
);
const MessageList = loadable(() =>
  import('components/containers/MessageListContainer').catch(() => window.location.reload()),
);
const Message = loadable(() =>
  import('components/containers/MessageContainer').catch(() => window.location.reload()),
);
const Estimate = loadable(() =>
  import('components/containers/EstimateContainer').catch(() => window.location.reload()),
);
const Payment = loadable(() =>
  import('components/containers/PaymentContainer').catch(() => window.location.reload()),
);
const CreateSpaceInfo = loadable(() =>
  import('components/containers/SpaceEditInformationContainer').catch(() =>
    window.location.reload(),
  ),
);
const SpaceEditInfo = loadable(() =>
  import('components/containers/SpaceEditInformationContainer').catch(() =>
    window.location.reload(),
  ),
);
const CreateSpaceBaggage = loadable(() =>
  import('components/containers/SpaceEditBaggageContainer').catch(() => window.location.reload()),
);
const SpaceEditBaggage = loadable(() =>
  import('components/containers/SpaceEditBaggageContainer').catch(() => window.location.reload()),
);
const CreateSpaceReceive = loadable(() =>
  import('components/containers/SpaceEditReceiveContainer').catch(() => window.location.reload()),
);
const SpaceEditReceive = loadable(() =>
  import('components/containers/SpaceEditReceiveContainer').catch(() => window.location.reload()),
);
const CreateSpacePriceType = loadable(() =>
  import('components/containers/SpaceEditPriceTypeContainer').catch(() => window.location.reload()),
);
const SpaceEditPriceType = loadable(() =>
  import('components/containers/SpaceEditPriceTypeContainer').catch(() => window.location.reload()),
);
const CreateSpaceConfirm = loadable(() =>
  import('components/containers/SpaceEditConfirmContainer').catch(() => window.location.reload()),
);
const SpaceEditConfirm = loadable(() =>
  import('components/containers/SpaceEditConfirmContainer').catch(() => window.location.reload()),
);
const CreateSpaceCompletion = loadable(() =>
  import('components/containers/SpaceEditCompletionContainer').catch(() =>
    window.location.reload(),
  ),
);
const SpaceEditCompletion = loadable(() =>
  import('components/containers/SpaceEditCompletionContainer').catch(() =>
    window.location.reload(),
  ),
);
const Unsubscribe = loadable(() =>
  import('components/containers/UnsubscribeContainer').catch(() => window.location.reload()),
);
const Sales = loadable(() =>
  import('components/containers/SalesContainer').catch(() => window.location.reload()),
);
const About = loadable(() =>
  import('components/containers/AboutContainer').catch(() => window.location.reload()),
);
const HowToUse = loadable(() =>
  import('components/containers/HowToUseContainer').catch(() => window.location.reload()),
);
const Insurance = loadable(() =>
  import('components/containers/InsuranceContainer').catch(() => window.location.reload()),
);
const Rule = loadable(() =>
  import('components/containers/RuleContainer').catch(() => window.location.reload()),
);
const PageNotFound = loadable(() =>
  import('components/containers/PageNotFoundContainer').catch(() => window.location.reload()),
);
const CancelPolicy = loadable(() =>
  import('components/containers/CancelPolicyContainer').catch(() => window.location.reload()),
);
const Asct = loadable(() =>
  import('components/containers/AsctContainer').catch(() => window.location.reload()),
);
const Privacy = loadable(() =>
  import('components/containers/PrivacyContainer').catch(() => window.location.reload()),
);
const Terms = loadable(() =>
  import('components/containers/TermsContainer').catch(() => window.location.reload()),
);

export default ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={Path.top()} component={Top} />
      <Route exact path={Path.login()} component={Login} />
      <Route exact path={Path.signUp()} component={SignUp} />
      <Route exact path={Path.signUpProfile()} component={SignUpProfile} />
      <Route exact path={Path.signUpPurpose()} component={SignUpPurpose} />
      <Route exact path={Path.resetPassword()} component={ResetPassword} />
      <Route exact path={Path.search()} component={Search} />
      <Route exact path={Path.searchCondition()} component={SearchCondition} />
      <Route exact path={Path.spacesByPrefecture()} component={Search} />
      <Route exact path={Path.spacesByCity()} component={Search} />
      <Route exact path={Path.spacesByTown()} component={Search} />
      <Route exact path={Path.space()} component={Space} />
      <Route exact path={Path.spaces()} component={Spaces} />
      <Route exact path={Path.schedule()} component={Schedule} />
      <Route exact path={Path.profile()} component={Profile} />
      <Route exact path={Path.profileEdit()} component={ProfileEdit} />
      <Route exact path={Path.inquiry()} component={Inquiry} />
      <Route exact path={Path.messageList()} component={MessageList} />
      <Route exact path={Path.message()} component={Message} />
      <Route exact path={Path.estimate()} component={Estimate} />
      <Route exact path={Path.payment()} component={Payment} />
      <Route exact path={Path.createSpaceInfo()} component={CreateSpaceInfo} />
      <Route exact path={Path.spaceEditInfo()} component={SpaceEditInfo} />
      <Route exact path={Path.createSpaceBaggage()} component={CreateSpaceBaggage} />
      <Route exact path={Path.spaceEditBaggage()} component={SpaceEditBaggage} />
      <Route exact path={Path.createSpaceReceive()} component={CreateSpaceReceive} />
      <Route exact path={Path.spaceEditReceive()} component={SpaceEditReceive} />
      <Route exact path={Path.createSpacePrice()} component={CreateSpacePriceType} />
      <Route exact path={Path.spaceEditPrice()} component={SpaceEditPriceType} />
      <Route exact path={Path.createSpaceConfirm()} component={CreateSpaceConfirm} />
      <Route exact path={Path.spaceEditConfirm()} component={SpaceEditConfirm} />
      <Route exact path={Path.createSpaceCompletion()} component={CreateSpaceCompletion} />
      <Route exact path={Path.spaceEditCompletion()} component={SpaceEditCompletion} />
      <Route exact path={Path.unsubscribe()} component={Unsubscribe} />
      <Route exact path={Path.sales()} component={Sales} />
      <Route exact path={Path.about()} component={About} />
      <Route exact path={Path.howtouse()} component={HowToUse} />
      <Route exact path={Path.insurance()} component={Insurance} />
      <Route exact path={Path.rule()} component={Rule} />
      <Route exact path={Path.cancelPolicy()} component={CancelPolicy} />
      <Route exact path={Path.asct()} component={Asct} />
      <Route exact path={Path.privacy()} component={Privacy} />
      <Route exact path={Path.terms()} component={Terms} />
      <Route component={PageNotFound} />
    </Switch>
  </ConnectedRouter>
);
