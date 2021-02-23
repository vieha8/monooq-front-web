import { takeLatest } from 'redux-saga/effects';
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
  takeLatest(CHECK_LOGIN, generators.checkLogin),
  takeLatest(LOGIN_EMAIL, generators.loginEmail),
  takeLatest(LOGIN_FACEBOOK, generators.loginFacebook),
  takeLatest(LOGOUT, generators.logout),
  takeLatest(SIGNUP_EMAIL, generators.signUpEmail),
  takeLatest(SIGNUP_FACEBOOK, generators.signUpFacebook),
  takeLatest(CHECK_REDIRECT, generators.checkRedirect),
  takeLatest(PASSWORD_RESET, generators.passwordReset),
  takeLatest(UNSUBSCRIBE, generators.unsubscribe),
  takeLatest(FETCH_HAS_REQUESTED, generators.fetchHasRequested),
];

export default authSagas;
