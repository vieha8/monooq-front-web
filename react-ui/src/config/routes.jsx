import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import loadable from '@loadable/component';
import Path from './path';

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
const Home = loadable(() =>
  import('components/containers/HomeContainer').catch(() => window.location.reload()),
);
const HomeRegion = loadable(() =>
  import('components/containers/HomeRegionContainer').catch(() => window.location.reload()),
);
const HomePrefecture = loadable(() =>
  import('components/containers/HomePrefectureContainer').catch(() => window.location.reload()),
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
const EditProfile = loadable(() =>
  import('components/containers/EditProfileContainer').catch(() => window.location.reload()),
);
const Inquiry = loadable(() =>
  import('components/containers/InquiryContainer').catch(() => window.location.reload()),
);
const Messages = loadable(() =>
  import('components/containers/InboxContainer').catch(() => window.location.reload()),
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
  import('components/containers/EditSpaceInformationContainer').catch(() =>
    window.location.reload(),
  ),
);
const EditSpaceInfo = loadable(() =>
  import('components/containers/EditSpaceInformationContainer').catch(() =>
    window.location.reload(),
  ),
);
const CreateSpaceBaggage = loadable(() =>
  import('components/containers/EditSpaceBaggageContainer').catch(() => window.location.reload()),
);
const EditSpaceBaggage = loadable(() =>
  import('components/containers/EditSpaceBaggageContainer').catch(() => window.location.reload()),
);
const CreateSpaceReceive = loadable(() =>
  import('components/containers/EditSpaceReceiveContainer').catch(() => window.location.reload()),
);
const EditSpaceReceive = loadable(() =>
  import('components/containers/EditSpaceReceiveContainer').catch(() => window.location.reload()),
);
const CreateSpacePriceType = loadable(() =>
  import('components/containers/EditSpacePriceTypeContainer').catch(() => window.location.reload()),
);
const EditSpacePriceType = loadable(() =>
  import('components/containers/EditSpacePriceTypeContainer').catch(() => window.location.reload()),
);
const CreateSpaceConfirm = loadable(() =>
  import('components/containers/EditSpaceConfirmContainer').catch(() => window.location.reload()),
);
const EditSpaceConfirm = loadable(() =>
  import('components/containers/EditSpaceConfirmContainer').catch(() => window.location.reload()),
);
const CreateSpaceCompletion = loadable(() =>
  import('components/containers/EditSpaceCompletionContainer').catch(() =>
    window.location.reload(),
  ),
);
const EditSpaceCompletion = loadable(() =>
  import('components/containers/EditSpaceCompletionContainer').catch(() =>
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
const Insurance = loadable(() =>
  import('components/containers/InsuranceContainer').catch(() => window.location.reload()),
);
const Rule = loadable(() =>
  import('components/containers/RuleContainer').catch(() => window.location.reload()),
);
const HowToUse = loadable(() =>
  import('components/containers/HowToUseContainer').catch(() => window.location.reload()),
);
const Other = loadable(() =>
  import('components/containers/OtherContainer').catch(() => window.location.reload()),
);
const NotFound = loadable(() =>
  import('components/containers/NotFoundContainer').catch(() => window.location.reload()),
);
const CancelPolicy = loadable(() =>
  import('components/containers/CancellationPoliciesContainer').catch(() =>
    window.location.reload(),
  ),
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
      <Route exact path={Path.home()} component={Home} />
      <Route exact path={Path.homeRegion()} component={HomeRegion} />
      <Route exact path={Path.homePrefecture()} component={HomePrefecture} />
      <Route exact path={Path.search()} component={Search} />
      <Route exact path={Path.searchCondition()} component={SearchCondition} />
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
      <Route exact path={Path.createSpacePrice()} component={CreateSpacePriceType} />
      <Route exact path={Path.editSpacePrice()} component={EditSpacePriceType} />
      <Route exact path={Path.createSpaceConfirm()} component={CreateSpaceConfirm} />
      <Route exact path={Path.editSpaceConfirm()} component={EditSpaceConfirm} />
      <Route exact path={Path.createSpaceCompletion()} component={CreateSpaceCompletion} />
      <Route exact path={Path.editSpaceCompletion()} component={EditSpaceCompletion} />
      <Route exact path={Path.unsubscribe()} component={Unsubscribe} />
      <Route exact path={Path.sales()} component={Sales} />
      <Route exact path={Path.about()} component={About} />
      <Route exact path={Path.insurance()} component={Insurance} />
      <Route exact path={Path.rule()} component={Rule} />
      <Route exact path={Path.howToUse()} component={HowToUse} />
      <Route exact path={Path.other()} component={Other} />
      <Route exact path={Path.cancellationPolicies()} component={CancelPolicy} />
      <Route exact path={Path.asct()} component={Asct} />
      <Route exact path={Path.privacy()} component={Privacy} />
      <Route exact path={Path.terms()} component={Terms} />
      <Route component={NotFound} />
    </Switch>
  </ConnectedRouter>
);
