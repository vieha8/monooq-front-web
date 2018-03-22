import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, take } from 'redux-saga/effects';
import firebase from 'firebase';
import { apiEndpoint, apiActions } from './api';
import { uiActions } from './ui';
import { push } from 'react-router-redux';
import { store } from '../store/configureStore';

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
const PASSWORD_RESET = 'PASSWORD_RESET';
const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
const TOKEN_GENERATE = 'TOKEN_GENERATE';

const CHECK_LOGIN = 'CHECK_LOGIN';
const CHECK_LOGIN_SUCCESS = 'CHECK_LOGIN_SUCCESS';
const CHECK_LOGIN_FAILED = 'CHECK_LOGIN_FAILED';

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
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  TOKEN_GENERATE,
);

// Reducer
const initialState = {
  isLogin: false,
  isChecking: false,
  user: {},
  error: '',
};
export const authReducer = handleActions(
  {
    [LOGIN_EMAIL]: state => ({
      ...state,
    }),
    [LOGIN_FACEBOOK]: state => ({
      ...state,
    }),
    [LOGOUT]: state => ({
      ...state,
      isLogin: false,
    }),
    [LOGIN_SUCCESS]: state => ({
      ...state,
      isLogin: true,
    }),
    [LOGIN_FAILED]: (state, action) => ({
      ...state,
      error: action.payload,
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
    yield put(apiActions.apiGetRequest({ path: apiEndpoint.authFirebase(user.uid) }));
    const { payload: res, error, meta } = yield take(apiActions.apiResponse);
    if (error) {
      yield put(authActions.checkLoginFailed(meta));
      yield put(authActions.logout());
      window.location.reload(true);
      return;
    }
    status.user = res;
    if (status.user.Profile === '') {
      yield put(uiActions.setUiState({ signUpStep: 4 }));
      store.dispatch(push('/signup'));
    }
  }

  yield put(authActions.checkLoginSuccess(status));
}

function* loginEmail({ payload: { email, password } }) {
  try {
    yield firebase.auth().signInWithEmailAndPassword(email, password);
    yield put(authActions.loginSuccess());
  } catch (err) {
    console.error(err);
    yield put(authActions.loginFailed(err));
  }
}

function* loginFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  yield firebase.auth().signInWithRedirect(provider);
}

function* logout() {
  yield firebase.auth().signOut();
}

function* signUpEmail({ payload: { email, password } }) {
  try {
    const result = yield firebase.auth().createUserWithEmailAndPassword(email, password);
    const firebaseUid = result.uid;

    yield put(
      apiActions.apiPostRequest({
        path: apiEndpoint.users(),
        body: { Email: email, FirebaseUid: firebaseUid },
      }),
    );
    const { payload, error, meta } = yield take(apiActions.apiResponse);
    if (error) {
      yield put(authActions.signupFailed(meta));
      return;
    }
    yield put(authActions.signupSuccess(payload));
    yield put(authActions.checkLoginStart());
    yield put(uiActions.setUiState({ signUpStep: 4 }));
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
    yield put(authActions.checkLoginStart());
    yield put(uiActions.setUiState({ signUpStep: 4, name: displayName }));
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
    store.dispatch(push('/password/reset/end'));
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

export const authSagas = [
  takeEvery(CHECK_LOGIN, checkLoginFirebaseAuth),
  takeEvery(LOGIN_EMAIL, loginEmail),
  takeEvery(LOGIN_FACEBOOK, loginFacebook),
  takeEvery(LOGOUT, logout),
  takeEvery(SIGNUP_EMAIL, signUpEmail),
  takeEvery(SIGNUP_FACEBOOK, signUpFacebook),
  takeEvery(PASSWORD_RESET, passwordReset),
  takeEvery(TOKEN_GENERATE, tokenGenerate),
];
