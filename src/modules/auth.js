import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase';

// Actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const CHECK_LOGIN_START = 'CHECK_LOGIN_START';
const CHECK_LOGIN_END = 'CHECK_LOGIN_END';

export const authActions = createActions(LOGIN, LOGOUT, CHECK_LOGIN_START, CHECK_LOGIN_END);

// Reducer
const initialState = {
  isLogin: false,
  isChecking: false,
};
const { login, logout, checkLoginStart, checkLoginEnd } = authActions;
export const authReducer = handleActions(
  {
    [login]: state => ({
      ...state,
      isLogin: true,
    }),
    [logout]: state => ({
      ...state,
      isLogin: false,
    }),
    [checkLoginStart]: state => ({
      ...state,
      isChecking: true,
    }),
    [checkLoginEnd]: (state, action) => ({
      ...state,
      // isLogin: action.payload,
      isLogin: true,
      isChecking: false,
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
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  });
  yield put(checkLoginEnd(isLogin));
}

export const authSagas = [takeEvery(CHECK_LOGIN_START, checkLoginFirebaseAuth)];
