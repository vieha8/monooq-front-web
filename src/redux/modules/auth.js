import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, take } from 'redux-saga/effects';
import firebase from 'firebase';
import { apiActions, API_ACTIONS } from './api';
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

const CHECK_LOGIN_START = 'CHECK_LOGIN_START';
const CHECK_LOGIN_END = 'CHECK_LOGIN_END';

export const authActions = createActions(
  LOGIN_EMAIL,
  LOGIN_FACEBOOK,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CHECK_LOGIN_START,
  CHECK_LOGIN_END,
  SIGNUP_EMAIL,
  SIGNUP_FACEBOOK,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
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
    [CHECK_LOGIN_START]: state => ({
      ...state,
      isChecking: true,
    }),
    [CHECK_LOGIN_END]: (state, action) => ({
      ...state,
      ...action.payload,
      isChecking: false,
    }),
  },
  initialState,
);

//Sagas
function* checkLoginFirebaseAuth() {
  //TODO とりあえずここでやってるけどなんか違う気はする
  try {
    const result = yield firebase.auth().getRedirectResult();
    // TODO result.additionalUserInfo.isNewUserがtrueだと新規登録なので会員登録動線に飛ばす必要あり(signUpFormのstep4)
    if (result.user) {
      yield put(authActions.loginSuccess());
    }
  } catch (err) {
    console.error(err);
    yield put(authActions.loginFailed(err));
  }

  const status = yield call(() => {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve({ isLogin: true, user: user });
        } else {
          resolve({ isLogin: false });
        }
      });
    });
  });

  if (status.isLogin) {
    yield put(apiActions.authFirebaseGet({ id: status.user.uid }));
    const { payload } = yield take(apiActions.authFirebaseGetSuccess);
    status.user = payload;
    if (payload.Profile === '') {
      yield put(uiActions.setUiState({ signUpStep: 4 }));
      store.dispatch(push('/signup'));
    }
  }

  yield put(authActions.checkLoginEnd(status));
}

function* loginEmail({ payload: { email, password } }) {
  yield put(apiActions.authPastGet({ query: { email: email } }));
  const { payload } = yield take(API_ACTIONS.AUTH_PAST.GET.SUCCESS);

  //元々登録されていたユーザーかチェック
  const isOld = payload.result;
  if (isOld) {
    try {
      // 元々登録されていた場合パスワードが正しいかチェックする
      // パスワードが正しければfirebase APIでcreateUserWithEmailAndPasswordを叩く
      // firebase uidとデータを紐付けるAPIを叩く
      yield firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      yield put(authActions.loginFailed(err));
    }
  } else {
    try {
      yield firebase.auth().signInWithEmailAndPassword(email, password);
      yield put(authActions.loginSuccess());
    } catch (err) {
      console.error(err);
      yield put(authActions.loginFailed(err));
    }
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
    yield put(apiActions.userPost({ body: { Email: email, FirebaseUid: firebaseUid } }));
    const { payload } = yield take(apiActions.userPostSuccess);
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
    console.log(result);
    if (!isNewUser) {
      yield put(authActions.signupFailed('Already registered.'));
      return;
    }
    const { displayName, email, uid, photoURL } = result.user;
    yield put(
      apiActions.userPost({
        body: { Email: email, FirebaseUid: uid, Name: displayName, ImageUrl: photoURL },
      }),
    );
    const { payload } = yield take(apiActions.userPostSuccess);
    yield put(authActions.signupSuccess(payload));
    yield put(authActions.checkLoginStart());
    yield put(uiActions.setUiState({ signUpStep: 4, name: displayName }));
  } catch (err) {
    console.error(err.message);
    yield put(authActions.signupFailed(err.message));
  }
}

export const authSagas = [
  takeEvery(CHECK_LOGIN_START, checkLoginFirebaseAuth),
  takeEvery(LOGIN_EMAIL, loginEmail),
  takeEvery(LOGIN_FACEBOOK, loginFacebook),
  takeEvery(LOGOUT, logout),
  takeEvery(SIGNUP_EMAIL, signUpEmail),
  takeEvery(SIGNUP_FACEBOOK, signUpFacebook),
];
