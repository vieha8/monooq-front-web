import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, take } from 'redux-saga/effects';
import firebase from 'firebase';
import { push } from 'react-router-redux';
import { apiEndpoint, apiActions } from './api';
import { uiActions } from './ui';
import { store } from '../store/configureStore';
import { getApiRequest } from '../helpers/api';

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
  SIGNUP_EMAIL,
  SIGNUP_FACEBOOK,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  INIT_PASSWORD_RESET,
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  TOKEN_GENERATE,
  SET_USER,
  UNSUBSCRIBE,
  UNSUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_FAILED,
);

// Reducer
const initialState = {
  isLogin: false,
  isChecking: false,
  isRegisting: false,
  isResetTrying: false,
  isResetSuccess: false,
  isUnsubscribeTrying: false,
  isUnsubscribeSuccess: false,
  isUnsubscribeFailed: false,
  user: {},
  error: '',
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
    [LOGOUT]: state => ({
      ...state,
      isLogin: false,
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
      isRegisting: true,
    }),
    [SIGNUP_FACEBOOK]: state => ({
      ...state,
      isSignupFailed: false,
      isRegisting: true,
    }),
    [SIGNUP_SUCCESS]: state => ({
      ...state,
      isSignupFailed: false,
      isRegisting: false,
    }),
    [SIGNUP_FAILED]: state => ({
      ...state,
      isSignupFailed: true,
      isRegisting: false,
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
  },
  initialState,
);

const getLoginUserFirebaseAuth = () => {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      resolve(user);
    });
  });
};

//Sagas
function* checkLoginFirebaseAuth() {
  const user = yield call(getLoginUserFirebaseAuth);

  const status = { isLogin: false };

  if (user) {
    status.isLogin = true;

    const { data, err } = yield call(getApiRequest, apiEndpoint.authFirebase(user.uid));
    if (err) {
      yield put(authActions.checkLoginFailed({ error: err }));
      yield put(authActions.logout());
      window.location.reload(true);
      return;
    }
    status.user = data;

    if (status.user.Profile === '') {
      yield put(uiActions.setUiState({ signupStep: 4 }));
      store.dispatch(push('/signup'));
    }
  }

  yield put(authActions.checkLoginSuccess(status));
}

function* loginEmail({ payload: { email, password } }) {
  try {
    yield firebase.auth().signInWithEmailAndPassword(email, password);
    yield checkLoginFirebaseAuth();
    yield put(authActions.loginSuccess());
  } catch (err) {
    console.error(err);
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
    console.error(err);
    yield put(authActions.loginFailed(err));
  }
}

function* logout() {
  yield firebase.auth().signOut();
}

function* signUpEmail({ payload: { email, password } }) {
  try {
    const result = yield firebase.auth().createUserWithEmailAndPassword(email, password);
    const firebaseUid = result.uid;

    const defaultImage =
      'https://firebasestorage.googleapis.com/v0/b/monooq-prod.appspot.com/o/img%2Fusers%2Fdefault.png?alt=media&token=e36437c2-778c-44cf-a701-2d4c8c3e0363';

    yield put(
      apiActions.apiPostRequest({
        path: apiEndpoint.users(),
        body: { Email: email, FirebaseUid: firebaseUid, ImageUrl: defaultImage },
      }),
    );
    const { payload, error, meta } = yield take(apiActions.apiResponse);
    if (error) {
      yield put(authActions.signupFailed(meta));
      return;
    }
    yield put(authActions.signupSuccess(payload));
    yield put(authActions.checkLogin());
    yield put(uiActions.setUiState({ signupStep: 4 }));
  } catch (err) {
    console.error(err.message);
    yield put(authActions.signupFailed(err.message));
  }
}

function* signUpFacebook() {
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    const result = yield firebase.auth().signInWithPopup(provider);
    const { isNewUser } = result.additionalUserInfo;
    if (!isNewUser) {
      yield put(authActions.signupFailed('Already registered.'));
      return;
    }
    const { displayName, email, uid, photoURL } = result.user;

    yield put(
      apiActions.apiPostRequest({
        path: apiEndpoint.users(),
        body: { Email: email, FirebaseUid: uid, Name: displayName, ImageUrl: photoURL },
      }),
    );
    const { payload, error, meta } = yield take(apiActions.apiResponse);
    if (error) {
      yield put(authActions.signupFailed(meta));
      return;
    }
    yield put(authActions.signupSuccess(payload));
    yield put(authActions.checkLogin());
    yield put(uiActions.setUiState({ signupStep: 4, signup: { name: displayName } }));
  } catch (err) {
    console.error(err.message);
    yield put(authActions.signupFailed(err.message));
  }
}

function* passwordReset({ payload: { email } }) {
  const auth = firebase.auth();
  try {
    yield auth.sendPasswordResetEmail(email);
    yield put(authActions.passwordResetSuccess());
  } catch (err) {
    console.error(err);
    yield put(authActions.passwordResetFailed(err));
  }
}

function* tokenGenerate() {
  yield put(
    apiActions.apiPostRequest({
      path: apiEndpoint.tokenGenerate(),
      body: {},
    }),
  );
  const { payload, error, meta } = yield take(apiActions.apiResponse);
  if (error) {
    console.error(meta);
    return;
  }
  localStorage.setItem('token', JSON.stringify(payload));
}

function* unsubscribe({ payload: { userId, reason, description } }) {
  const messageBody = `退会理由:${JSON.stringify(reason)}\n詳細:${description}\n`;
  const body = {
    Subject: `【退会完了】ユーザーID:${userId}`,
    Address: 'info@monooq.com',
    Body: messageBody,
  };

  yield put(apiActions.apiPostRequest({ path: apiEndpoint.sendMail(), body }));

  yield put(
    apiActions.apiDeleteRequest({
      path: apiEndpoint.users(userId),
    }),
  );

  const { error, meta } = yield take(apiActions.apiResponse);
  if (error) {
    yield put(authActions.unsubscribeFailed(meta));
    return;
  }

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
