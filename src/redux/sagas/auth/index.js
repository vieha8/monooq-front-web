import { takeEvery } from 'redux-saga/effects';
import generators from './generators';

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
  takeEvery(CHECK_LOGIN, generators.checkLogin),
  takeEvery(LOGIN_EMAIL, generators.loginEmail),
  takeEvery(LOGIN_FACEBOOK, generators.loginFacebook),
  takeEvery(LOGOUT, generators.logout),
  takeEvery(SIGNUP_EMAIL, generators.signUpEmail),
  takeEvery(SIGNUP_FACEBOOK, generators.signUpFacebook),
  takeEvery(CHECK_REDIRECT, generators.checkRedirect),
  takeEvery(PASSWORD_RESET, generators.passwordReset),
  takeEvery(UNSUBSCRIBE, generators.unsubscribe),
  takeEvery(FETCH_HAS_REQUESTED, generators.fetchHasRequested),
];

export default authSagas;
