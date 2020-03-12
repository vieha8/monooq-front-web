import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import { ErrorMessages } from 'variables';
import Path from 'config/path';
import firebaseConfig from 'config/firebase';
import { isAvailableLocalStorage } from 'helpers/storage';
import { convertImgixUrl } from 'helpers/imgix';
import { uiActions } from './ui';
import { loggerActions } from './logger';
import { handleError } from './error';
import {
  getApiRequest,
  postApiRequest,
  deleteApiRequest,
  apiEndpoint,
  putApiRequest,
} from '../helpers/api';
import { parseUrl } from '../../helpers/query-string';

// Actions
const LOGIN_EMAIL = 'LOGIN_EMAIL';
const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGOUT = 'LOGOUT';
const INIT_SIGNUP = 'INIT_SIGNUP';
const SIGNUP_EMAIL = 'SIGNUP_EMAIL';
const SIGNUP_FACEBOOK = 'SIGNUP_FACEBOOK';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILED = 'SIGNUP_FAILED';
const CHECK_REDIRECT = 'CHECK_REDIRECT';
const CHECK_REDIRECT_END = 'CHECK_REDIRECT_END';
const INIT_PASSWORD_RESET = 'INIT_PASSWORD_RESET';
const PASSWORD_RESET = 'PASSWORD_RESET';
const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
const INIT_UNSUBSCRIBE = 'INIT_UNSUBSCRIBE';
const UNSUBSCRIBE = 'UNSUBSCRIBE';
const UNSUBSCRIBE_SUCCESS = 'UNSUBSCRIBE_SUCCESS';
const UNSUBSCRIBE_FAILED = 'UNSUBSCRIBE_FAILED';

const CHECK_LOGIN = 'CHECK_LOGIN';
const CHECK_LOGIN_SUCCESS = 'CHECK_LOGIN_SUCCESS';
const CHECK_LOGIN_FAILED = 'CHECK_LOGIN_FAILED';

const SET_USER = 'SET_USER';

export const authActions = createActions(
  LOGIN_EMAIL,
  LOGIN_FACEBOOK,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILED,
  INIT_SIGNUP,
  SIGNUP_EMAIL,
  SIGNUP_FACEBOOK,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  INIT_PASSWORD_RESET,
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  SET_USER,
  INIT_UNSUBSCRIBE,
  UNSUBSCRIBE,
  UNSUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_FAILED,
  CHECK_REDIRECT,
  CHECK_REDIRECT_END,
);

// Reducer
const initialState = {
  isLogin: false,
  isChecking: false,
  isRegistering: false,
  isResetTrying: false,
  isResetSuccess: false,
  isUnsubscribeTrying: false,
  isUnsubscribeSuccess: false,
  isUnsubscribeFailed: false,
  user: {},
  error: '',
  token: null,
  intercom: { hash: '' },
};
export const authReducer = handleActions(
  {
    [LOGIN_EMAIL]: state => ({
      ...state,
      isChecking: true,
    }),
    [LOGIN_FACEBOOK]: state => ({
      ...state,
      isChecking: true,
    }),
    [LOGIN_SUCCESS]: state => ({
      ...state,
      isLogin: true,
      isChecking: false,
    }),
    [LOGIN_FAILED]: (state, action) => ({
      ...state,
      error: action.payload,
      isChecking: false,
    }),
    [LOGOUT]: state => ({
      ...state,
      user: {},
      token: null,
      isLogin: false,
    }),
    [CHECK_LOGIN]: state => ({
      ...state,
      isChecking: true,
    }),
    [CHECK_LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isChecking: false,
    }),
    [CHECK_LOGIN_FAILED]: (state, { payload }) => ({
      ...state,
      ...payload,
      isChecking: false,
    }),
    [INIT_SIGNUP]: state => ({
      ...state,
      isSignupFailed: false,
      isRegistering: false,
      errorMessage: '',
    }),
    [SIGNUP_EMAIL]: state => ({
      ...state,
      isSignupFailed: false,
      isRegistering: true,
    }),
    [SIGNUP_FACEBOOK]: state => ({
      ...state,
      isSignupFailed: false,
      isRegistering: true,
    }),
    [CHECK_REDIRECT]: state => ({
      ...state,
      isChecking: true,
    }),
    [CHECK_REDIRECT_END]: state => ({
      ...state,
      isChecking: false,
    }),
    [SIGNUP_SUCCESS]: state => ({
      ...state,
      isSignupFailed: false,
      isRegistering: false,
    }),
    [SIGNUP_FAILED]: (state, action) => ({
      ...state,
      isSignupFailed: true,
      isRegistering: false,
      errorMessage: action.payload,
    }),
    [SET_USER]: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    [INIT_PASSWORD_RESET]: state => ({
      ...state,
      isResetTrying: false,
      isResetSuccess: false,
      error: '',
    }),
    [PASSWORD_RESET]: state => ({
      ...state,
      isResetTrying: true,
    }),
    [PASSWORD_RESET_SUCCESS]: state => ({
      ...state,
      isResetTrying: false,
      isResetSuccess: true,
      error: '',
    }),
    [PASSWORD_RESET_FAILED]: (state, action) => ({
      ...state,
      isResetTrying: false,
      isResetSuccess: false,
      error: action.payload,
    }),
    [INIT_UNSUBSCRIBE]: state => ({
      ...state,
      isUnsubscribeTrying: false,
      isUnsubscribeSuccess: false,
      isUnsubscribeFailed: false,
    }),
    [UNSUBSCRIBE]: state => ({
      ...state,
      isUnsubscribeTrying: true,
      isUnsubscribeSuccess: false,
      isUnsubscribeFailed: false,
    }),
    [UNSUBSCRIBE_SUCCESS]: state => ({
      ...state,
      isUnsubscribeTrying: false,
      isUnsubscribeSuccess: true,
      isUnsubscribeFailed: false,
    }),
    [UNSUBSCRIBE_FAILED]: state => ({
      ...state,
      isUnsubscribeTrying: false,
      isUnsubscribeSuccess: false,
      isUnsubscribeFailed: true,
    }),
  },
  initialState,
);

const getFirebaseAuth = async () => {
  const firebase = await import('firebase/app').catch(() => window.location.reload());
  await import('firebase/auth').catch(() => window.location.reload());

  try {
    firebase.initializeApp(firebaseConfig());
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  return firebase.auth;
};

const getLoginUserFirebaseAuth = () =>
  new Promise(async (resolve, reject) => {
    const auth = await getFirebaseAuth();
    const unsub = auth().onAuthStateChanged(user => {
      unsub();
      resolve(user);
    }, reject);
  });

const setSentryConfig = user => {
  Sentry.configureScope(scope => {
    scope.setUser({
      id: user.id,
      username: user.name,
      email: user.email,
    });
  });
};

const getFirebaseAuthToken = () =>
  new Promise(async (resolve, reject) => {
    const auth = await getFirebaseAuth();
    auth()
      .currentUser.getIdToken(true)
      .then(token => resolve(token))
      .catch(err => reject(err));
  });

const tokenCacheKey = 'firebase_token';

function* makeToken() {
  const auth = yield call(getFirebaseAuth);
  if (!auth().currentUser) {
    return '';
  }

  const token = yield call(getFirebaseAuthToken);
  if (!token || token === '') {
    return '';
  }

  yield call(putApiRequest, apiEndpoint.authFirebase(auth().currentUser.uid), {}, token);
  if (isAvailableLocalStorage()) {
    const limit = new Date();
    limit.setMinutes(limit.getMinutes() + 50);
    localStorage.setItem(tokenCacheKey, JSON.stringify({ token, limit }));
  }

  return token;
}

// Sagas
export function* getToken() {
  const auth = yield call(getFirebaseAuth);
  if (!auth().currentUser) {
    return '';
  }

  if (isAvailableLocalStorage()) {
    const cache = localStorage.getItem(tokenCacheKey);
    if (cache) {
      const { token, limit } = JSON.parse(cache);
      if (token && token !== '') {
        if (new Date().getTime() < new Date(limit).getTime()) {
          // 有効期限判定
          return token;
        }
      }
    }
  }

  return yield makeToken();
}

const checkLoginWithEmailLink = (auth, email, url) => {
  return auth
    .signInWithEmailLink(email, url)
    .then(r => r)
    .catch(e => e);
};

function* checkLogin() {
  const { query } = parseUrl(window.location.href);
  const auth = yield call(getFirebaseAuth);
  if (query.mode && query.mode === 'signIn') {
    yield call(checkLoginWithEmailLink, auth, query.email, window.location.href);
  }
  const status = { isLogin: false };
  try {
    const { currentUser } = auth();

    let firebaseUid = '';

    if (currentUser) {
      firebaseUid = currentUser.uid;
    } else {
      const user = yield call(getLoginUserFirebaseAuth);
      if (user) {
        firebaseUid = user.uid;
      }
    }

    if (firebaseUid !== '') {
      // ログイン済み
      status.isLogin = true;
      let token = yield getToken();
      const { data, err } = yield call(
        getApiRequest,
        apiEndpoint.authFirebase(firebaseUid),
        {},
        token,
      );

      if (token !== data.token) {
        token = yield makeToken();
      }

      if (err || data.id === 0) {
        yield put(authActions.checkLoginFailed({ error: err }));
        yield put(authActions.logout());
        window.location.reload();
        return;
      }

      data.imageUrl = convertImgixUrl(data.imageUrl, 'w=128&auto=format');
      status.user = data;

      yield call(postApiRequest, apiEndpoint.login(), { UserId: data.id }, token);
      ReactGA.set({ userId: data.id });
      setSentryConfig(data);

      const { data: intercom } = yield call(getApiRequest, apiEndpoint.intercom(data.id), {}, '');
      status.intercom = { hash: intercom.hash };

      if (isAvailableLocalStorage()) {
        const redirectPath = localStorage.getItem('redirectPath');
        if (redirectPath) {
          yield put(uiActions.setUiState({ redirectPath }));
          localStorage.removeItem('redirectPath');
        }
      }
    }
    yield put(authActions.checkLoginSuccess(status));
  } catch (err) {
    yield handleError(authActions.checkLoginFailed, '', 'checkLogin', err, false);
  }
}

function* loginEmail({ payload: { email, password } }) {
  try {
    const auth = yield call(getFirebaseAuth);
    yield auth().signInWithEmailAndPassword(email, password);
    yield checkLogin();
    yield put(authActions.loginSuccess());
  } catch (err) {
    yield Sentry.configureScope(scope => {
      scope.setExtra('email', email);
    });

    yield handleError(authActions.loginFailed, `${err.message}`, 'loginEmail', err, true);
  }
}

function* loginFacebook() {
  try {
    const redirectPath = yield select(state => state.ui.redirectPath);
    if (redirectPath && isAvailableLocalStorage()) {
      localStorage.setItem('redirectPath', redirectPath);
    }
    const auth = yield call(getFirebaseAuth);
    const provider = new auth.FacebookAuthProvider();
    yield auth().signInWithRedirect(provider);
  } catch (err) {
    yield handleError(authActions.loginFailed, err.message, 'loginFacebook', err, true);
  }
}

function* logout() {
  yield put(push(Path.top()));
  if (isAvailableLocalStorage()) {
    localStorage.removeItem(tokenCacheKey);
  }
  const auth = yield call(getFirebaseAuth);
  yield auth().signOut();
}

function* signUpEmail({ payload: { email, password } }) {
  try {
    const auth = yield call(getFirebaseAuth);
    const result = yield auth().createUserWithEmailAndPassword(email, password);
    const firebaseUid = result.user.uid;

    const defaultImage =
      'https://firebasestorage.googleapis.com/v0/b/monooq-prod.appspot.com/o/img%2Fusers%2Fdefault%2Ficon-profile-default.svg?alt=media&token=442f7e2a-b6bc-4f4f-8019-2794307095e2';

    let referrer = '';
    let inviteCode = '';
    if (isAvailableLocalStorage()) {
      referrer = localStorage.getItem('referrer');
      inviteCode = localStorage.getItem('invite_code');
    }

    const token = yield* getToken();
    const { data, err } = yield call(
      postApiRequest,
      apiEndpoint.users(),
      {
        Email: email,
        FirebaseUid: firebaseUid,
        ImageUrl: defaultImage,
        RefererUrl: referrer,
        InviteCode: inviteCode,
      },
      token,
    );

    if (err) {
      yield handleError(authActions.signupFailed, '', 'signUpEmail', err, false);
      return;
    }

    yield put(
      loggerActions.recordEvent({
        event: 'user_signups',
        detail: {
          data,
        },
      }),
    );

    yield put(authActions.signupSuccess(data));
    yield put(authActions.checkLogin());
    yield put(push(Path.signUpProfile()));
  } catch (err) {
    let errMessage = '';
    let isOnlyAction = false;
    if (err.code === 'auth/email-already-in-use') {
      errMessage = ErrorMessages.FailedSignUpMailExist;
      isOnlyAction = true;
    }
    yield Sentry.configureScope(scope => {
      scope.setExtra('email', email);
    });
    yield handleError(
      authActions.signupFailed,
      errMessage,
      'signUpEmail',
      err.message,
      isOnlyAction,
    );
  }
}

function* signUpFacebook() {
  try {
    const auth = yield call(getFirebaseAuth);
    const provider = new auth.FacebookAuthProvider();
    yield auth().signInWithRedirect(provider);
  } catch (err) {
    let errMessage = '';
    let isOnlyAction = false;
    if (err.code === 'auth/account-exists-with-different-credential') {
      errMessage = ErrorMessages.FailedSignUpMailExist;
      isOnlyAction = true;
    }
    yield handleError(
      authActions.signupFailed,
      errMessage,
      'signUpFacebook',
      err.message,
      isOnlyAction,
    );
  }
}

const checkFirebaseRedirect = () =>
  new Promise(async (resolve, reject) => {
    const auth = await getFirebaseAuth();
    await auth()
      .getRedirectResult()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });

function* checkRedirect() {
  const result = yield checkFirebaseRedirect();

  if (!result.user) {
    yield put(authActions.checkRedirectEnd());
    return;
  }

  const { isNewUser } = result.additionalUserInfo;
  if (!isNewUser) {
    yield put(authActions.signupFailed(ErrorMessages.FailedSignUpMailExist));
    yield put(authActions.checkRedirectEnd());
    return;
  }
  const { displayName, email, uid, photoURL } = result.user;

  let referrer = '';
  let inviteCode = '';
  if (isAvailableLocalStorage()) {
    referrer = localStorage.getItem('referrer');
    inviteCode = localStorage.getItem('invite_code');
  }

  const token = yield* getToken();
  const { data, err } = yield call(
    postApiRequest,
    apiEndpoint.users(),
    {
      Email: email,
      FirebaseUid: uid,
      Name: displayName,
      ImageUrl: `${photoURL}?height=200`,
      RefererUrl: referrer,
      InviteCode: inviteCode,
    },
    token,
  );

  if (err) {
    yield handleError(authActions.signupFailed, '', 'signUpFacebook', err, false);
    yield put(authActions.checkRedirectEnd());
    return;
  }

  yield put(
    loggerActions.recordEvent({
      event: 'user_signups',
      detail: {
        data,
      },
    }),
  );

  yield put(authActions.signupSuccess(data));
  yield put(authActions.checkRedirectEnd());
  yield put(push(Path.signUpProfile()));
}

function* passwordReset({ payload: { email } }) {
  const auth = yield call(getFirebaseAuth);
  try {
    yield auth().sendPasswordResetEmail(email);
    yield put(authActions.passwordResetSuccess());
  } catch (err) {
    let errMessage = '';
    let isOnlyAction = false;
    if (err.code === 'auth/user-not-found') {
      errMessage = ErrorMessages.FailedResetPassword;
      isOnlyAction = true;
    }
    yield handleError(
      authActions.passwordResetFailed,
      errMessage,
      'passwordReset',
      err.message,
      isOnlyAction,
    );
  }
}

function* unsubscribe({ payload: { reason, description } }) {
  const user = yield select(state => state.auth.user);

  const token = yield* getToken();
  const { err } = yield call(deleteApiRequest, apiEndpoint.users(user.id), token);

  if (err) {
    yield handleError(authActions.unsubscribeFailed, '', 'unsubscribe', err, true);
    return;
  }

  if (process.env.REACT_APP_ENV === 'production') {
    const messageBody = `退会理由:${JSON.stringify(reason)}\n詳細:${description}\n`;
    const body = {
      Subject: `【退会完了】ユーザーID:${user.id}`,
      Uid: 'DDtN7dr9r5VQKyuXRx8AcRgtPIW2', // 本番モノオク公式アカウント(info@monooq.com)
      Body: messageBody,
      Category: 'unsubscribe',
    };
    yield call(postApiRequest, apiEndpoint.sendMail(), body, token);
  }

  yield put(authActions.unsubscribeSuccess());
}

export const authSagas = [
  takeEvery(CHECK_LOGIN, checkLogin),
  takeEvery(LOGIN_EMAIL, loginEmail),
  takeEvery(LOGIN_FACEBOOK, loginFacebook),
  takeEvery(LOGOUT, logout),
  takeEvery(SIGNUP_EMAIL, signUpEmail),
  takeEvery(SIGNUP_FACEBOOK, signUpFacebook),
  takeEvery(CHECK_REDIRECT, checkRedirect),
  takeEvery(PASSWORD_RESET, passwordReset),
  takeEvery(UNSUBSCRIBE, unsubscribe),
];
