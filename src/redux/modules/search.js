import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import dummySpaceImage from 'images/dummy_space.png';
import { apiEndpoint } from './api';
import { getApiRequest } from '../helpers/api';
import { errorActions } from './error';

// Actions
const FETCH_START_SEARCH = 'FETCH_START_SEARCH';
const FETCH_SUCCESS_SEARCH = 'FETCH_SUCCESS_SEARCH';
const FETCH_FAILED_SEARCH = 'FETCH_FAILED_SEARCH';
// TODO FETCHいらない、STARTいらない

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

export const searchReducer = handleActions(
  {
    [FETCH_START_SEARCH]: (state, action) => ({
      ...state,
      isLoading: true,
      location: action.payload,
    }),
    [FETCH_SUCCESS_SEARCH]: (state, action) => ({
      ...state,
      isLoading: false,
      spaces: action.payload,
    }),
  },
  initialState,
);

// Sagas
function* search({ payload: { location, limit, offset } }) {
  const { data, err } = yield call(getApiRequest, apiEndpoint.spaces(), {
    location,
    limit,
    offset,
  });
  if (err) {
    yield put(searchActions.fetchFailedSearch());
    yield put(errorActions.setError(err));
    return;
  }

  const res = data.map(v => {
    const space = v;
    if (space.Images.length === 0) {
      space.Images = [{ ImageUrl: dummySpaceImage }];
    }
    return space;
  });

  yield put(searchActions.fetchSuccessSearch(res));
}

export const searchSagas = [takeEvery(FETCH_START_SEARCH, search)];
