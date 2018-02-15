import { createActions, handleActions } from 'redux-actions';
import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';

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
function* getSearchAPI(action) {
  yield call(delay, 1000);

  // ここでAPIからデータとってきたりする
  const location = action.payload;
  const spaces = [...Array(10)];

  yield put(fetchSuccessSearch(spaces));
}

export const searchSagas = [takeEvery(FETCH_START_SEARCH, getSearchAPI)];
