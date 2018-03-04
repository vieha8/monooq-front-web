import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, take } from 'redux-saga/effects';
import firebase from 'firebase';
import { apiActions, API_ACTIONS } from './api';

// Actions
const LOGIN_EMAIL = 'LOGIN_EMAIL';
const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGOUT = 'LOGOUT';
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
    // TODO result.additionalUserInfo.isNewUserがtrueだと新規登録なので会員登録動線に飛ばす必要あり
    if (result.user) {
      yield put(authActions.loginSuccess());
    }
  } catch (err) {
    console.error(err);
    yield put(authActions.loginFailed(err));
  }

  const payload = yield call(() => {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve({ isLogin: true, user: { id: user.uid } });
        } else {
          resolve({ isLogin: false });
        }
      });
    });
  });
  yield put(authActions.checkLoginEnd(payload));
}

function* loginEmail({ payload: { email, password } }) {
  yield put(apiActions.authPastGet(email));
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

export const authSagas = [
  takeEvery(CHECK_LOGIN_START, checkLoginFirebaseAuth),
  takeEvery(LOGIN_EMAIL, loginEmail),
  takeEvery(LOGIN_FACEBOOK, loginFacebook),
  takeEvery(LOGOUT, logout),
];
