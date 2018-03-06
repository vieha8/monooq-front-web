import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take } from 'redux-saga/effects';
import { apiActions } from './api';

// Actions
const FETCH_START_SEARCH = 'FETCH_START_SEARCH';
const FETCH_SUCCESS_SEARCH = 'FETCH_SUCCESS_SEARCH';
const FETCH_FAILED_SEARCH = 'FETCH_FAILED_SEARCH';

export const searchActions = createActions(
  FETCH_START_SEARCH,
  FETCH_SUCCESS_SEARCH,
  FETCH_FAILED_SEARCH,
);

// Reducer
const initialState = {
  isLoading: false,
  location: '',
  spaces: [],
};
const { fetchStartSearch, fetchSuccessSearch } = searchActions;
export const searchReducer = handleActions(
  {
    [fetchStartSearch]: (state, action) => ({
      ...state,
      isLoading: true,
      location: action.payload,
    }),
    [fetchSuccessSearch]: (state, action) => ({
      ...state,
      isLoading: false,
      spaces: action.payload,
    }),
  },
  initialState,
);

//Sagas
function* search({ payload: { location } }) {
  yield put(apiActions.spacesGet(location));
  const { payload } = yield take(apiActions.spacesGetSuccess);
  yield put(fetchSuccessSearch(payload));
}

export const searchSagas = [takeEvery(FETCH_START_SEARCH, search)];
