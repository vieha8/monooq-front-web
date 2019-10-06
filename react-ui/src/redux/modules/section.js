import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, call, fork } from 'redux-saga/effects';
import { getToken } from './auth';
import { getApiRequest, apiEndpoint } from '../helpers/api';
import { handleError } from './error';

// Actions
const FETCH_SECTIONS = 'FETCH_SECTIONS';
const FETCH_SECTIONS_SUCCESS = 'FETCH_SECTIONS_SUCCESS';
const FETCH_SECTIONS_FAILED = 'FETCH_SECTIONS_FAILED';
const GET_REGION_SUCCESS = 'GET_REGION_SUCCESS';

export const sectionActions = createActions(
  FETCH_SECTIONS,
  FETCH_SECTIONS_SUCCESS,
  FETCH_SECTIONS_FAILED,
  GET_REGION_SUCCESS,
);

// Reducer
const initialState = {
  regionId: 2, // 関東
  sections: [],
  isLoading: false,
};

export const sectionReducer = handleActions(
  {
    [FETCH_SECTIONS]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SECTIONS_SUCCESS]: (state, action) => ({
      ...state,
      sections: action.payload,
      isLoading: false,
    }),
    [FETCH_SECTIONS_FAILED]: state => ({
      ...state,
      isLoading: false,
    }),
    [GET_REGION_SUCCESS]: (state, action) => ({
      ...state,
      regionId: action.payload,
    }),
  },
  initialState,
);

// Sagas
function* getRegion() {
  const token = yield* getToken();

  const api = apiEndpoint.region();
  const { data } = yield call(getApiRequest, api, {}, token);

  yield put(sectionActions.getRegionSuccess(data.regionId));
}

function* getSections() {
  yield fork(getRegion);

  const token = yield* getToken();

  const api = apiEndpoint.sections();
  const { data, err } = yield call(getApiRequest, api, {}, token);
  if (err) {
    yield handleError(sectionActions.fetchSectionsFailed, '', 'getSections', err, false);
    return;
  }

  yield put(sectionActions.fetchSectionsSuccess(data));
}

export const sectionSagas = [takeEvery(FETCH_SECTIONS, getSections)];
