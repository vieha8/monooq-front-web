import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import loadable from '@loadable/component';
import Path from './path';

const Top = loadable(() => import('components/containers/TopContainer'));
const Login = loadable(() => import('components/containers/LoginContainer'));
const SignUp = loadable(() => import('components/containers/SignUpContainer'));
const SignUpProfile = loadable(() => import('components/containers/SignUpProfileContainer'));
const SignUpPurpose = loadable(() => import('components/containers/SignUpPurposeContainer'));
const ResetPassword = loadable(() => import('components/containers/ResetPasswordContainer'));
const Home = loadable(() => import('components/containers/HomeContainer'));
const HomeRegion = loadable(() => import('components/containers/HomeRegionContainer'));
const HomePrefecture = loadable(() => import('components/containers/HomePrefectureContainer'));
const Search = loadable(() => import('components/containers/SearchResultContainer'));
const SearchCondition = loadable(() => import('components/containers/SearchConditionContainer'));
const Space = loadable(() => import('components/containers/SpaceContainer'));
const Spaces = loadable(() => import('components/containers/SpaceManagementContainer'));
const Schedule = loadable(() => import('components/containers/ScheduleContainer'));
const Profile = loadable(() => import('components/containers/ProfileContainer'));
const EditProfile = loadable(() => import('components/containers/EditProfileContainer'));
const Inquiry = loadable(() => import('components/containers/InquiryContainer'));
const Messages = loadable(() => import('components/containers/InboxContainer'));
const Message = loadable(() => import('components/containers/MessageContainer'));
const Estimate = loadable(() => import('components/containers/EstimateContainer'));
const Payment = loadable(() => import('components/containers/PaymentContainer'));
const CreateSpaceInfo = loadable(() =>
  import('components/containers/EditSpaceInformationContainer'),
);
const EditSpaceInfo = loadable(() => import('components/containers/EditSpaceInformationContainer'));
const CreateSpaceBaggage = loadable(() =>
  import('components/containers/EditSpaceBaggageContainer'),
);
const EditSpaceBaggage = loadable(() => import('components/containers/EditSpaceBaggageContainer'));
const CreateSpaceReceive = loadable(() =>
  import('components/containers/EditSpaceReceiveContainer'),
);
const EditSpaceReceive = loadable(() => import('components/containers/EditSpaceReceiveContainer'));
const CreateSpacePriceType = loadable(() =>
  import('components/containers/EditSpacePriceTypeContainer'),
);
const EditSpacePriceType = loadable(() =>
  import('components/containers/EditSpacePriceTypeContainer'),
);
const CreateSpaceConfirm = loadable(() =>
  import('components/containers/EditSpaceConfirmContainer'),
);
const EditSpaceConfirm = loadable(() => import('components/containers/EditSpaceConfirmContainer'));
const CreateSpaceCompletion = loadable(() =>
  import('components/containers/EditSpaceCompletionContainer'),
);
const EditSpaceCompletion = loadable(() =>
  import('components/containers/EditSpaceCompletionContainer'),
);
const Unsubscribe = loadable(() => import('components/containers/UnsubscribeContainer'));
const Sales = loadable(() => import('components/containers/SalesContainer'));
const About = loadable(() => import('components/containers/AboutContainer'));
const Insurance = loadable(() => import('components/containers/InsuranceContainer'));
const Rule = loadable(() => import('components/containers/RuleContainer'));
const HowToUse = loadable(() => import('components/containers/HowToUseContainer'));
const Other = loadable(() => import('components/containers/OtherContainer'));
const NotFound = loadable(() => import('components/containers/NotFoundContainer'));
const CancelPolicy = loadable(() => import('components/containers/CancellationPoliciesContainer'));
const Asct = loadable(() => import('components/containers/AsctContainer'));
const Privacy = loadable(() => import('components/containers/PrivacyContainer'));
const Terms = loadable(() => import('components/containers/TermsContainer'));

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
