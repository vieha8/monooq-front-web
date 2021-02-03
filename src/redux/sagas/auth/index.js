import { takeEvery } from 'redux-saga/effects';
import {
  LOGIN_EMAIL,
  LOGIN_FACEBOOK,
  LOGOUT,
  CHECK_LOGIN,
  SIGNUP_EMAIL,
  SIGNUP_FACEBOOK,
  PASSWORD_RESET,
  UNSUBSCRIBE,
  CHECK_REDIRECT,
  FETCH_HAS_REQUESTED,
} from '../../actions/auth';

const authSagas = [
  takeEvery(
    CHECK_LOGIN,
    import('./generators').then(auth => auth.default.checkLogin),
  ),
  takeEvery(
    LOGIN_EMAIL,
    import('./generators').then(auth => auth.default.loginEmail),
  ),
  takeEvery(
    LOGIN_FACEBOOK,
    import('./generators').then(auth => auth.default.loginFacebook),
  ),
  takeEvery(
    LOGOUT,
    import('./generators').then(auth => auth.default.logout),
  ),
  takeEvery(
    SIGNUP_EMAIL,
    import('./generators').then(auth => auth.default.signUpEmail),
  ),
  takeEvery(
    SIGNUP_FACEBOOK,
    import('./generators').then(auth => auth.default.signUpFacebook),
  ),
  takeEvery(
    CHECK_REDIRECT,
    import('./generators').then(auth => auth.default.checkRedirect),
  ),
  takeEvery(
    PASSWORD_RESET,
    import('./generators').then(auth => auth.default.passwordReset),
  ),
  takeEvery(
    UNSUBSCRIBE,
    import('./generators').then(auth => auth.default.unsubscribe),
  ),
  takeEvery(
    FETCH_HAS_REQUESTED,
    import('./generators').then(auth => auth.default.fetchHasRequested),
  ),
];

export default authSagas;
