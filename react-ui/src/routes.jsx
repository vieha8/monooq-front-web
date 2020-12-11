import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import loadable from '@loadable/component';
import BaseLayout from 'components/pages/Layout';
import LoadingPage from 'components/LV3/LoadingPage';
import Path from './config/path';

const loadablePage = importSource =>
  loadable(() => importSource.catch(() => window.location.reload()), {
    fallback: <LoadingPage />,
  });

const Top = loadablePage(import('components/pages/TopPage'));
const Login = loadablePage(import('components/pages/LoginPage'));
const SignUp = loadablePage(import('components/pages/SignUpPage'));
const SignUpProfile = loadablePage(import('components/pages/SignUpProfilePage'));
const ResetPassword = loadablePage(import('components/pages/ResetPasswordPage'));
const Search = loadablePage(import('components/pages/SearchResultPage'));
const SearchCondition = loadablePage(import('components/pages/SearchConditionPage'));
const Space = loadablePage(import('components/pages/SpacePage'));
const Spaces = loadablePage(import('components/pages/SpaceManagementPage'));
const Recommend = loadablePage(import('components/pages/SearchResultRecommendPage'));
const Schedule = loadablePage(import('components/pages/SchedulePage'));
const HistoryViewSpace = loadablePage(import('components/pages/SearchResultHistoryPage'));
const Profile = loadablePage(import('components/pages/ProfilePage'));
const ProfileEdit = loadablePage(import('components/pages/ProfileEditPage'));
const Inquiry = loadablePage(import('components/pages/InquiryPage'));
const MessageList = loadablePage(import('components/pages/MessageListPage'));
const Message = loadablePage(import('components/pages/MessagePage'));
const Estimate = loadablePage(import('components/pages/EstimatePage'));
const Payment = loadablePage(import('components/pages/PaymentPage'));
const SpaceCreate1 = loadablePage(import('components/pages/SpaceEdit1Page'));
const SpaceEdit1 = loadablePage(import('components/pages/SpaceEdit1Page'));
const SpaceCreate2 = loadablePage(import('components/pages/SpaceEdit2Page'));
const SpaceEdit2 = loadablePage(import('components/pages/SpaceEdit2Page'));
const SpaceCreate3 = loadablePage(import('components/pages/SpaceEdit3Page'));
const SpaceEdit3 = loadablePage(import('components/pages/SpaceEdit3Page'));
const CreateSpaceConfirm = loadablePage(import('components/pages/SpaceEditConfirmPage'));
const SpaceEditConfirm = loadablePage(import('components/pages/SpaceEditConfirmPage'));
const CreateSpaceCompletion = loadablePage(import('components/pages/SpaceEditCompletionPage'));
const SpaceEditCompletion = loadablePage(import('components/pages/SpaceEditCompletionPage'));
const Unsubscribe = loadablePage(import('components/pages/UnsubscribePage'));
const Sales = loadablePage(import('components/pages/SalesPage'));
const About = loadablePage(import('components/pages/AboutPage'));
const HowToUse = loadablePage(import('components/pages/HowToUsePage'));
const Insurance = loadablePage(import('components/pages/InsurancePage'));
const Rule = loadablePage(import('components/pages/RulePage'));
const PageNotFound = loadablePage(import('components/pages/PageNotFoundPage'));
const CancelPolicy = loadablePage(import('components/pages/CancelPolicyPage'));
const Asct = loadablePage(import('components/pages/AsctPage'));
const Privacy = loadablePage(import('components/pages/PrivacyPage'));
const Terms = loadablePage(import('components/pages/TermsPage'));
const Covid19 = loadablePage(import('components/pages/Covid19Page'));
const Lp1Host = loadablePage(import('components/pages/Lp1HostPage'));
const Lp1Guest = loadablePage(import('components/pages/Lp123GuestPage'));
const Lp2Guest = loadablePage(import('components/pages/Lp123GuestPage'));
const Lp3Guest = loadablePage(import('components/pages/Lp123GuestPage'));
const Bosyu = loadablePage(import('components/pages/BosyuPage'));

export default ({ history }) => (
  <ConnectedRouter history={history}>
    <BaseLayout>
      <Switch>
        <Route exact path={Path.top()} component={Top} />
        <Route exact path={Path.login()} component={Login} />
        <Route exact path={Path.signUp()} component={SignUp} />
        <Route exact path={Path.signUpProfile()} component={SignUpProfile} />
        <Route exact path={Path.resetPassword()} component={ResetPassword} />
        <Route exact path={Path.search()} component={Search} />
        <Route exact path={Path.searchCondition()} component={SearchCondition} />
        <Route exact path={Path.spacesByPrefecture()} component={Search} />
        <Route exact path={Path.spacesByCity()} component={Search} />
        <Route exact path={Path.spacesByTown()} component={Search} />
        <Route exact path={Path.space()} component={Space} />
        <Route exact path={Path.spaces()} component={Spaces} />
        <Route exact path={Path.recommend()} component={Recommend} />
        <Route exact path={Path.schedule()} component={Schedule} />
        <Route exact path={Path.historyViewSpace()} component={HistoryViewSpace} />
        <Route exact path={Path.profile()} component={Profile} />
        <Route exact path={Path.profileEdit()} component={ProfileEdit} />
        <Route exact path={Path.inquiry()} component={Inquiry} />
        <Route exact path={Path.messageList()} component={MessageList} />
        <Route exact path={Path.message()} component={Message} />
        <Route exact path={Path.estimate()} component={Estimate} />
        <Route exact path={Path.payment()} component={Payment} />
        <Route exact path={Path.spaceCreate1()} component={SpaceCreate1} />
        <Route exact path={Path.spaceEdit1()} component={SpaceEdit1} />
        <Route exact path={Path.spaceCreate2()} component={SpaceCreate2} />
        <Route exact path={Path.spaceEdit2()} component={SpaceEdit2} />
        <Route exact path={Path.spaceCreate3()} component={SpaceCreate3} />
        <Route exact path={Path.spaceEdit3()} component={SpaceEdit3} />
        <Route exact path={Path.createSpaceConfirm()} component={CreateSpaceConfirm} />
        <Route exact path={Path.spaceEditConfirm()} component={SpaceEditConfirm} />
        <Route exact path={Path.createSpaceCompletion()} component={CreateSpaceCompletion} />
        <Route exact path={Path.spaceEditCompletion()} component={SpaceEditCompletion} />
        <Route exact path={Path.bosyu()} component={Bosyu} />
        <Route exact path={Path.unsubscribe()} component={Unsubscribe} />
        <Route exact path={Path.sales()} component={Sales} />
        <Route exact path={Path.about()} component={About} />
        <Route exact path={Path.howtouse()} component={HowToUse} />
        <Route exact path={Path.insurance()} component={Insurance} />
        <Route exact path={Path.rule()} component={Rule} />
        <Route exact path={Path.cancelPolicy()} component={CancelPolicy} />
        <Route exact path={Path.asct()} component={Asct} />
        <Route exact path={Path.privacy()} component={Privacy} />
        <Route exact path={Path.covid19()} component={Covid19} />
        <Route exact path={Path.terms()} component={Terms} />
        <Route exact path={Path.lp1Host()} component={Lp1Host} />
        <Route exact path={Path.lp1Guest()} component={Lp1Guest} />
        <Route exact path={Path.lp1Guest2()} component={Lp1Guest} />
        <Route exact path={Path.lp1Guest3()} component={Lp1Guest} />
        <Route exact path={Path.lp2Guest()} component={Lp2Guest} />
        <Route exact path={Path.lp2Guest2()} component={Lp2Guest} />
        <Route exact path={Path.lp2Guest3()} component={Lp2Guest} />
        <Route exact path={Path.lp3Guest()} component={Lp3Guest} />
        <Route exact path={Path.lp3Guest3()} component={Lp3Guest} />
        <Route component={PageNotFound} />
      </Switch>
    </BaseLayout>
  </ConnectedRouter>
);
