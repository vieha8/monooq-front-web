import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/auth';
import { push } from 'connected-react-router';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import { ErrorMessages } from 'variables';
import Path from 'config/path';
import { isAvailableLocalStorage } from 'helpers/storage';
import { convertImgixUrl } from 'helpers/imgix';
import { uiActions } from './ui';
import { loggerActions } from './logger';
import { handleError } from './error';
import { getApiRequest, postApiRequest, deleteApiRequest, apiEndpoint } from '../helpers/api';

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
  SET_TOKEN,
  INIT_UNSUBSCRIBE,
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
    [SET_TOKEN]: (state, action) => ({
      ...state,
      token: action.payload,
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
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(token => {
        resolve(token);
      })
      .catch(err => reject(err));
  });

// Sagas
export function* getToken() {
  const token = yield select(state => state.auth.token);
  if (token) {
    return token;
  }
  if (firebase.auth().currentUser) {
    return yield call(getFirebaseAuthToken);
  }
  return '';
}

function* checkLogin() {
  const status = { isLogin: false };
  try {
    const { currentUser } = firebase.auth();
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
      const token = yield getToken();
      const { data, err } = yield call(
        getApiRequest,
        apiEndpoint.authFirebase(firebaseUid),
        {},
        token,
      );
      if (err || data.id === 0) {
        yield put(authActions.checkLoginFailed({ error: err }));
        yield put(authActions.logout());
        window.location.reload();
        return;
      }
      data.imageUrl = convertImgixUrl(data.imageUrl, 'w=128&auto=format');
      status.user = data;
      yield put(authActions.setToken(token));
      yield call(postApiRequest, apiEndpoint.login(), { UserId: data.id }, token);
      ReactGA.set({ userId: data.id });
      setSentryConfig(data);
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
    yield put(authActions.checkLoginFailed(err));
  }
}

function* loginEmail({ payload: { email, password } }) {
  try {
    yield firebase.auth().signInWithEmailAndPassword(email, password);
    yield checkLogin();
    yield put(authActions.loginSuccess());
  } catch (err) {
    yield put(authActions.loginFailed(err));
  }
}

function* loginFacebook() {
  try {
    const redirectPath = yield select(state => state.ui.redirectPath);
    if (redirectPath && isAvailableLocalStorage()) {
      localStorage.setItem('redirectPath', redirectPath);
    }
    const provider = new firebase.auth.FacebookAuthProvider();
    yield firebase.auth().signInWithRedirect(provider);
  } catch (err) {
    yield put(authActions.loginFailed(err));
  }
}

function* logout() {
  yield put(push(Path.top()));
  if (isAvailableLocalStorage()) {
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
    const result = yield firebase.auth().signInWithRedirect(provider);
    const { isNewUser } = result.additionalUserInfo;
    if (!isNewUser) {
      yield put(authActions.signupFailed(ErrorMessages.FailedSignUpMailExist));
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
        ImageUrl: photoURL,
        RefererUrl: referrer,
        InviteCode: inviteCode,
      },
      token,
    );

    if (err) {
      yield handleError(authActions.signupFailed, '', 'signUpFacebook', err, false);
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

  const messageBody = `退会理由:${JSON.stringify(reason)}\n詳細:${description}\n`;
  const body = {
    Subject: `【退会完了】ユーザーID:${user.id}`,
    Uid: 'DDtN7dr9r5VQKyuXRx8AcRgtPIW2', // 本番モノオク公式アカウント(info@monooq.com)
    Body: messageBody,
    Category: 'unsubscribe',
  };

  yield call(postApiRequest, apiEndpoint.sendMail(), body, token);
  yield put(authActions.unsubscribeSuccess());
}

export const authSagas = [
  takeEvery(CHECK_LOGIN, checkLogin),
  takeEvery(LOGIN_EMAIL, loginEmail),
  takeEvery(LOGIN_FACEBOOK, loginFacebook),
  takeEvery(LOGOUT, logout),
  takeEvery(SIGNUP_EMAIL, signUpEmail),
  takeEvery(SIGNUP_FACEBOOK, signUpFacebook),
  takeEvery(PASSWORD_RESET, passwordReset),
  takeEvery(UNSUBSCRIBE, unsubscribe),
];
