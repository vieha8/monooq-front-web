import { createActions, handleActions } from 'redux-actions';
import { put, take, takeEvery } from 'redux-saga/effects';
import { authActions } from 'redux/modules/auth';

// Actions
const INIT = 'INIT';
const INIT_SUCCESS = 'INIT_SUCCESS';
const INIT_FAILED = 'INIT_FAILED';

export const initActions = createActions(INIT, INIT_SUCCESS, INIT_FAILED);

// Reducer
const initialState = {
  isInitialized: false,
};

export const initReducer = handleActions(
  {
    [INIT_SUCCESS]: state => ({
      ...state,
      isInitialized: true,
    }),
  },
  initialState,
);

// Sagas
function* init() {
  yield put(authActions.checkLogin());
  yield take(authActions.checkLoginSuccess);
  yield put(initActions.initSuccess());
}

export const initSagas = [takeEvery(INIT, init)];
