import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, select } from 'redux-saga/effects';
import firebase from 'firebase/app';
import { apiActions, apiEndpoint } from './api';
import dummySpaceImage from 'images/dummy_space.png';

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
  yield put(
    apiActions.apiGetRequest({ path: apiEndpoint.spaces(), params: { location, limit, offset } }),
  );
  const { payload, error, meta } = yield take(apiActions.apiResponse);
  if (error) {
    yield put(searchActions.fetchFailedSearch(meta));
    return;
  }

  const res = payload.map(v => {
    if (v.Images.length === 0) {
      v.Images[0] = { ImageUrl: dummySpaceImage };
    }
    return v;
  });

  const logParams = { keyword: location, createDt: new Date() };
  const user = yield select(state => state.auth.user);
  const userId = user.ID;
  if (userId) {
    logParams.userId = userId;
  }
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  const db = firestore.collection('spaceSearchLogs');
  db.add(logParams);

  yield put(searchActions.fetchSuccessSearch(res));
}

export const searchSagas = [takeEvery(FETCH_START_SEARCH, search)];
