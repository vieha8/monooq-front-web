import { createActions, handleActions } from 'redux-actions';
import { put, select, take, takeEvery } from 'redux-saga/effects';
import { authActions } from 'redux/modules/auth';
import { messagesActions } from 'redux/modules/messages';

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

  const user = yield select(state => state.auth.user);

  if (user.id) {
    yield put(messagesActions.fetchUnreadRoomsStart());
    yield take(messagesActions.fetchUnreadRoomsEnd);
  }

  yield put(initActions.initSuccess());
}

export const initSagas = [takeEvery(INIT, init)];
