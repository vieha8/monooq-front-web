import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take } from 'redux-saga/effects';
import { apiActions } from './api';

// Actions
const FETCH_SPACE = 'FETCH_SPACE';
const FETCH_SUCCESS_SPACE = 'FETCH_SUCCESS_SPACE';
const FETCH_FAILED_SPACE = 'FETCH_FAILED_SPACE';

export const spaceActions = createActions(FETCH_SPACE, FETCH_SUCCESS_SPACE, FETCH_FAILED_SPACE);

// Reducer
const initialState = {
  isLoading: false,
  space: null,
};

export const spaceReducer = handleActions(
  {
    [FETCH_SPACE]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SUCCESS_SPACE]: (state, action) => ({
      ...state,
      isLoading: false,
      space: action.payload,
    }),
    [FETCH_FAILED_SPACE]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

//Sagas
function* getSpace({ payload: { spaceId } }) {
  yield put(apiActions.spaceGet({ id: spaceId }));
  const { payload } = yield take(apiActions.spaceGetSuccess);
  yield put(spaceActions.fetchSuccessSpace(payload));
}

export const spaceSagas = [takeEvery(FETCH_SPACE, getSpace)];
