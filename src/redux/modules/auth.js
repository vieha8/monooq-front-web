import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, take } from 'redux-saga/effects';
import firebase from 'firebase';
import { apiActions, API_ACTIONS } from './api';

// Actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const CHECK_LOGIN_START = 'CHECK_LOGIN_START';
const CHECK_LOGIN_END = 'CHECK_LOGIN_END';

const VERIFY_PASSWORD_START = 'VERIFY_PASSWORD_START';
const VERIFY_PASSWORD_END = 'VERIFY_PASSWORD_END';

export const authActions = createActions(
  LOGIN,
  LOGOUT,
  CHECK_LOGIN_START,
  CHECK_LOGIN_END,
  VERIFY_PASSWORD_START,
  VERIFY_PASSWORD_END,
);

// Reducer
const initialState = {
  isLogin: false,
  isChecking: false,
  user: {},
};
export const authReducer = handleActions(
  {
    [LOGIN]: state => ({
      ...state,
      isLogin: true,
    }),
    [LOGOUT]: state => ({
      ...state,
      isLogin: false,
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
    [VERIFY_PASSWORD_START]: state => ({
      ...state,
    }),
    [VERIFY_PASSWORD_END]: state => ({
      ...state,
    }),
  },
  initialState,
);

//Sagas
function* checkLoginFirebaseAuth() {
  const isLogin = yield call(() => {
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
  yield put(authActions.checkLoginEnd(isLogin));
}

function* verifyPassword({ payload: { email, password } }) {
  yield put(apiActions.usersOldGet(email));
  const { payload } = yield take(API_ACTIONS.USERS_OLD.GET.SUCCESS);

  //元々登録されていたユーザーかチェック
  const isOld = payload.result;

  if (isOld) {
    //元々登録されていた場合パスワードが正しいかチェックする
    //パスワードが正しければfirebase APIでcreateUserWithEmailAndPassowrdを叩く
    //firebase uidとデータを紐付けるAPIを叩く
  } else {
    //firebase apiの場合、loginWithEmailAndPassword叩く
  }

  yield put(authActions.verifyPasswordEnd());
}

export const authSagas = [
  takeEvery(CHECK_LOGIN_START, checkLoginFirebaseAuth),
  takeEvery(VERIFY_PASSWORD_START, verifyPassword),
];
