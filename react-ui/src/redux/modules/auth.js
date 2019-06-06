import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, take, select } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/auth';
import { push } from 'connected-react-router';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import { ErrorMessages } from 'variables';
import { uiActions } from './ui';
import { handleError } from './error';
import { getApiRequest, postApiRequest, deleteApiRequest, apiEndpoint } from '../helpers/api';
import Path from '../../config/path';
import { isAvailableLocalStorage } from '../../helpers/storage';

// Actions
const LOGIN_EMAIL = 'LOGIN_EMAIL';
const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGOUT = 'LOGOUT';
const SIGNUP_EMAIL = 'SIGNUP_EMAIL';
const SIGNUP_FACEBOOK = 'SIGNUP_FACEBOOK';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILED = 'SIGNUP_FAILED';
const INIT_PASSWORD_RESET = 'INIT_PASSWORD_RESET';
const PASSWORD_RESET = 'PASSWORD_RESET';
const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
const TOKEN_GENERATE = 'TOKEN_GENERATE';
const TOKEN_GENERATE_SUCCESS = 'TOKEN_GENERATE_SUCCESS';
const UNSUBSCRIBE = 'UNSUBSCRIBE';
const UNSUBSCRIBE_SUCCESS = 'UNSUBSCRIBE_SUCCESS';
const UNSUBSCRIBE_FAILED = 'UNSUBSCRIBE_FAILED';

const CHECK_LOGIN = 'CHECK_LOGIN';
const CHECK_LOGIN_SUCCESS = 'CHECK_LOGIN_SUCCESS';
const CHECK_LOGIN_FAILED = 'CHECK_LOGIN_FAILED';

const SET_USER = 'SET_USER';
const SET_TOKEN = 'SET_TOKEN';

export const authActions = createActions(
  LOGIN_EMAIL,
  LOGIN_FACEBOOK,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILED,
  SIGNUP_EMAIL,
  SIGNUP_FACEBOOK,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  INIT_PASSWORD_RESET,
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  TOKEN_GENERATE,
  TOKEN_GENERATE_SUCCESS,
  SET_USER,
  SET_TOKEN,
  UNSUBSCRIBE,
  UNSUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_FAILED,
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
  isTokenGenerating: false,
  user: {},
  error: '',
  token: null,
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
    [PASSWORD_RESET_FAILED]: state => ({
      ...state,
      isResetTrying: false,
      isResetSuccess: false,
      error: 'reset password failed',
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
    [TOKEN_GENERATE]: state => ({
      ...state,
      isTokenGenerating: true,
    }),
    [TOKEN_GENERATE_SUCCESS]: (state, action) => ({
      ...state,
      token: action.payload,
      isTokenGenerating: false,
    }),
    [SET_TOKEN]: (state, action) => ({
      ...state,
      token: action.payload,
      isTokenGenerating: false,
    }),
  },
  initialState,
);

const getLoginUserFirebaseAuth = () =>
  new Promise((resolve, reject) => {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      unsub();
      resolve(user);
    }, reject);
  });

// Sagas
export function* getToken() {
  const token = yield select(state => state.auth.token);
  if (token) {
    return token;
  }
  const isGenerating = yield select(state => state.auth.isTokenGenerating);
  if (isGenerating) {
    const { payload } = yield take(authActions.tokenGenerateSuccess);
    return payload;
  }
  yield put(authActions.tokenGenerate());
  const { payload } = yield take(authActions.tokenGenerateSuccess);
  return payload;
}

function* tokenGenerate() {
  const { data, err } = yield call(postApiRequest, apiEndpoint.tokenGenerate(), {});

  if (err) {
    yield handleError('', '', 'tokenGenerate', err, false);
    return;
  }

  yield put(authActions.tokenGenerateSuccess(data.Token));
}

function* checkLoginFirebaseAuth() {
  let status = { isLogin: false };

  if (isAvailableLocalStorage()) {
    const statusCache = localStorage.getItem('status');
    if (statusCache) {
      const isLogin = yield call(getLoginUserFirebaseAuth);
      if (!isLogin) {
        yield put(authActions.checkLoginFailed({ error: 'Session expired.' }));
        yield put(authActions.logout());
        window.location.reload();
        return;
      }

      status = JSON.parse(statusCache);
      let token = status.user.Token;
      if (token === '') {
        token = yield* getToken();
        status.user.Token = token;
        localStorage.setItem('status', JSON.stringify(status));
      }
      yield put(authActions.setToken(token));
      yield call(postApiRequest, apiEndpoint.login(), { UserId: status.user.ID }, token);
      ReactGA.set({ userId: status.user.ID });
      yield put(authActions.checkLoginSuccess(status));
      const { user } = status;
      Sentry.configureScope(scope => {
        scope.setUser({
          id: user.ID,
          username: user.Name,
          email: user.Email,
        });
      });
      return;
    }
  }

  try {
    const user = yield call(getLoginUserFirebaseAuth);
    if (user) {
      status.isLogin = true;
      const token = yield* getToken();
      const { data, err } = yield call(
        getApiRequest,
        apiEndpoint.authFirebase(user.uid),
        {},
        token,
      );
      if (err) {
        yield put(authActions.checkLoginFailed({ error: err }));
        yield put(authActions.logout());
        window.location.reload();
        return;
      }
      status.user = data;

      if (isAvailableLocalStorage()) {
        localStorage.setItem('status', JSON.stringify(status));
      }

      yield call(postApiRequest, apiEndpoint.login(), { UserId: data.ID }, token);
      ReactGA.set({ userId: data.ID });

      Sentry.configureScope(scope => {
        scope.setUser({
          id: data.ID,
          username: data.Name,
          email: data.Email,
        });
      });
    }

    yield put(authActions.checkLoginSuccess(status));
  } catch (err) {
    yield put(authActions.checkLoginFailed(err));
  }
}

function* loginEmail({ payload: { email, password } }) {
  try {
    yield firebase.auth().signInWithEmailAndPassword(email, password);
    yield checkLoginFirebaseAuth();
    yield put(authActions.loginSuccess());
  } catch (err) {
    yield put(authActions.loginFailed(err));
  }
}

function* loginFacebook() {
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    yield firebase.auth().signInWithPopup(provider);
    yield checkLoginFirebaseAuth();
    yield put(authActions.loginSuccess());
  } catch (err) {
    yield put(authActions.loginFailed(err));
  }
}

function* logout() {
  yield put(push(Path.top()));
  if (isAvailableLocalStorage()) {
    localStorage.removeItem('status');
    localStorage.removeItem('token');
  }
  yield firebase.auth().signOut();
}

function* signUpEmail({ payload: { email, password } }) {
  try {
    const result = yield firebase.auth().createUserWithEmailAndPassword(email, password);
    const firebaseUid = result.user.uid;

    const defaultImage =
      'https://firebasestorage.googleapis.com/v0/b/monooq-prod.appspot.com/o/img%2Fusers%2Fdefault.png?alt=media&token=e36437c2-778c-44cf-a701-2d4c8c3e0363';

    let referrer = '';
    if (isAvailableLocalStorage()) {
      referrer = localStorage.getItem('referrer');
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
      },
      token,
    );

    if (err) {
      yield handleError(authActions.signupFailed, '', 'signUpEmail', err, false);
      return;
    }

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
    const provider = new firebase.auth.FacebookAuthProvider();
    const result = yield firebase.auth().signInWithPopup(provider);
    const { isNewUser } = result.additionalUserInfo;
    if (!isNewUser) {
      yield put(authActions.signupFailed(ErrorMessages.FailedSignUpMailExist));
      return;
    }
    const { displayName, email, uid, photoURL } = result.user;

    let referrer = '';
    if (isAvailableLocalStorage()) {
      referrer = localStorage.getItem('referrer');
    }

    const token = yield* getToken();
    const { data, err } = yield call(
      postApiRequest,
      apiEndpoint.users(),
      {
        Email: email,
        FirebaseUid: uid,
        Name: displayName,
        ImageUrl: photoURL,
        RefererUrl: referrer,
      },
      token,
    );

    if (err) {
      yield handleError(authActions.signupFailed, '', 'signUpFacebook', err, false);
      return;
    }

    yield put(authActions.signupSuccess(data));
    yield put(authActions.checkLogin());
    yield put(uiActions.setUiState({ signup: { name: displayName } }));
    yield put(push(Path.signUpProfile()));
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

function* passwordReset({ payload: { email } }) {
  const auth = firebase.auth();
  try {
    yield auth.sendPasswordResetEmail(email);
    yield put(authActions.passwordResetSuccess());
  } catch (err) {
    yield put(authActions.passwordResetFailed(err));
    if (err.code !== 'auth/user-not-found') {
      yield handleError('', '', 'passwordReset', err, false);
    }
  }
}

function* unsubscribe({ payload: { userId, reason, description } }) {
  const token = yield* getToken();
  const { err } = yield call(deleteApiRequest, apiEndpoint.users(userId), token);

  if (err) {
    yield handleError(authActions.unsubscribeFailed, '', 'unsubscribe', err, false);
    return;
  }

  const messageBody = `退会理由:${JSON.stringify(reason)}\n詳細:${description}\n`;
  const body = {
    Subject: `【退会完了】ユーザーID:${userId}`,
    Address: 'info@monooq.com',
    Body: messageBody,
    Category: 'unsubscribe',
  };

  yield call(postApiRequest, apiEndpoint.sendMail(), body, token);
  yield put(authActions.unsubscribeSuccess());
}

export const authSagas = [
  takeEvery(CHECK_LOGIN, checkLoginFirebaseAuth),
  takeEvery(LOGIN_EMAIL, loginEmail),
  takeEvery(LOGIN_FACEBOOK, loginFacebook),
  takeEvery(LOGOUT, logout),
  takeEvery(SIGNUP_EMAIL, signUpEmail),
  takeEvery(SIGNUP_FACEBOOK, signUpFacebook),
  takeEvery(PASSWORD_RESET, passwordReset),
  takeEvery(TOKEN_GENERATE, tokenGenerate),
  takeEvery(UNSUBSCRIBE, unsubscribe),
];
