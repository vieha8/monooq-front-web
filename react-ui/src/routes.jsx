import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import loadable from '@loadable/component';
import BaseLayout from 'components/pages/Layout';
import LoadingPage from 'components/LV3/LoadingPage';
import Path from './config/path';

const Top = loadable(
  () => import('components/pages/TopPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Login = loadable(
  () => import('components/pages/LoginPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SignUp = loadable(
  () => import('components/pages/SignUpPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SignUpProfile = loadable(
  () => import('components/pages/SignUpProfilePage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const ResetPassword = loadable(
  () => import('components/pages/ResetPasswordPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Search = loadable(
  () => import('components/pages/SearchResultPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SearchCondition = loadable(
  () => import('components/pages/SearchConditionPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Space = loadable(
  () => import('components/pages/SpacePage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Spaces = loadable(
  () => import('components/pages/SpaceManagementPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Recommend = loadable(
  () => import('components/pages/SearchResultRecommendPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Schedule = loadable(
  () => import('components/pages/SchedulePage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const HistoryViewSpace = loadable(
  () => import('components/pages/SearchResultHistoryPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Profile = loadable(
  () => import('components/pages/ProfilePage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const ProfileEdit = loadable(
  () => import('components/pages/ProfileEditPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Inquiry = loadable(
  () => import('components/pages/InquiryPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const MessageList = loadable(
  () => import('components/pages/MessageListPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Message = loadable(
  () => import('components/pages/MessagePage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Estimate = loadable(
  () => import('components/pages/EstimatePage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Payment = loadable(
  () => import('components/pages/PaymentPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SpaceCreate1 = loadable(
  () => import('components/pages/SpaceEdit1Page').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SpaceEdit1 = loadable(
  () => import('components/pages/SpaceEdit1Page').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SpaceCreate2 = loadable(
  () => import('components/pages/SpaceEdit2Page').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SpaceEdit2 = loadable(
  () => import('components/pages/SpaceEdit2Page').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SpaceCreate3 = loadable(
  () => import('components/pages/SpaceEdit3Page').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SpaceEdit3 = loadable(
  () => import('components/pages/SpaceEdit3Page').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const CreateSpaceConfirm = loadable(
  () => import('components/pages/SpaceEditConfirmPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SpaceEditConfirm = loadable(
  () => import('components/pages/SpaceEditConfirmPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const CreateSpaceCompletion = loadable(
  () => import('components/pages/SpaceEditCompletionPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const SpaceEditCompletion = loadable(
  () => import('components/pages/SpaceEditCompletionPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Unsubscribe = loadable(
  () => import('components/pages/UnsubscribePage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Sales = loadable(
  () => import('components/pages/SalesPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const About = loadable(
  () => import('components/pages/AboutPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const HowToUse = loadable(
  () => import('components/pages/HowToUsePage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Insurance = loadable(
  () => import('components/pages/InsurancePage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Rule = loadable(
  () => import('components/pages/RulePage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const PageNotFound = loadable(
  () => import('components/pages/PageNotFoundPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const CancelPolicy = loadable(
  () => import('components/pages/CancelPolicyPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Asct = loadable(
  () => import('components/pages/AsctPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Privacy = loadable(
  () => import('components/pages/PrivacyPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Terms = loadable(
  () => import('components/pages/TermsPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Covid19 = loadable(
  () => import('components/pages/Covid19Page').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Lp1Host = loadable(
  () => import('components/pages/Lp1HostPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Lp1Guest = loadable(
  () => import('components/pages/Lp123GuestPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Lp2Guest = loadable(
  () => import('components/pages/Lp123GuestPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Lp3Guest = loadable(
  () => import('components/pages/Lp123GuestPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);
const Bosyu = loadable(
  () => import('components/pages/BosyuPage').catch(() => window.location.reload()),
  { fallback: <LoadingPage /> },
);

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
