import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take } from 'redux-saga/effects';
import { apiActions } from './api';
import { uiActions } from './ui';

// Actions
const FETCH_USER = 'FETCH_USER';
const FETCH_SUCCESS_USER = 'FETCH_SUCCESS_USER';
const FETCH_FAILED_USER = 'FETCH_FAILED_USER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_SUCCESS_USER = 'UPDATE_SUCCESS_USER';
const UPDATE_FAILED_USER = 'UPDATE_FAILED_USER';

export const userActions = createActions(
  FETCH_USER,
  FETCH_SUCCESS_USER,
  FETCH_FAILED_USER,
  UPDATE_USER,
  UPDATE_SUCCESS_USER,
  UPDATE_FAILED_USER,
);

// Reducer
const initialState = {
  isLoading: false,
  user: null,
};

export const userReducer = handleActions(
  {
    [FETCH_USER]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SUCCESS_USER]: (state, action) => ({
      ...state,
      isLoading: false,
      user: action.payload,
    }),
    [FETCH_FAILED_USER]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

//Sagas
function* getUser({ payload: { userId } }) {
  yield put(apiActions.userGet({ id: userId }));
  const { payload } = yield take(apiActions.userGetSuccess);
  yield put(userActions.fetchSuccessUser(payload));
}

function* updateUser({ payload: { userId, body } }) {
  yield put(apiActions.userPut({ id: userId, body: body }));
  const { payload } = yield take(apiActions.userPutSuccess);
  yield put(userActions.updateSuccessUser(payload));
  yield put(uiActions.setUiState({ signUpStep: 5 }));
}

export const userSagas = [takeEvery(FETCH_USER, getUser), takeEvery(UPDATE_USER, updateUser)];
