import { createActions, handleActions } from 'redux-actions';
import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';

const FETCH_START_SEARCH = 'FETCH_START_SEARCH';
const FETCH_SUCCESS_SEARCH = 'FETCH_SUCCESS_SEARCH';
const FETCH_FAILED_SEARCH = 'FETCH_FAILED_SEARCH';

export const searchActions = createActions(
  FETCH_START_SEARCH,
  FETCH_SUCCESS_SEARCH,
  FETCH_FAILED_SEARCH,
);

const initialState = { isLoading: false };

export const searchReducer = handleActions(
  {
    [searchActions.fetchStartSearch]: state => ({
      ...state,
      isLoading: true,
    }),
    [searchActions.fetchSuccessSearch]: (state, action) => ({
      ...state,
      isLoading: false,
      result: action.payload,
    }),
  },
  initialState,
);

function* getSearchAPI() {
  yield call(delay, 1000);
  // ここでAPIからデータとってきたりする
  const result = { test: 1 };
  yield put(searchActions.fetchSuccessSearch(result));
}

export const searchSagas = [takeEvery(FETCH_START_SEARCH, getSearchAPI)];
