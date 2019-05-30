import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, call } from 'redux-saga/effects';
import { getToken } from './auth';
import { getApiRequest, apiEndpoint } from '../helpers/api';
import { handleError } from './error';

// Actions
const FETCH_SECTIONS = 'FETCH_SECTIONS';
const FETCH_SUCCESS_SECTIONS = 'FETCH_SUCCESS_SECTIONS';
const FETCH_FAILED_SECTIONS = 'FETCH_FAILED_SECTIONS';

export const homeActions = createActions(
  FETCH_SECTIONS,
  FETCH_SUCCESS_SECTIONS,
  FETCH_FAILED_SECTIONS,
);

// Reducer
const initialState = {
  sections: [],
  isLoading: false,
};

export const homeReducer = handleActions(
  {
    [FETCH_SECTIONS]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SUCCESS_SECTIONS]: (state, action) => ({
      ...state,
      sections: action.payload,
      isLoading: false,
    }),
    [FETCH_FAILED_SECTIONS]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

// Sagas
function* getSections({ payload }) {
  const token = yield* getToken();
  let api = apiEndpoint.sections();

  if (payload) {
    if (payload.regionId) {
      api = apiEndpoint.sectionsByRegionId(payload.regionId);
    }
    if (payload.prefectureId) {
      api = apiEndpoint.sectionsByPrefectureId(payload.prefectureId);
    }
  }

  const { data, err } = yield call(getApiRequest, api, {}, token);
  if (err) {
    yield handleError(homeActions.fetchFailedSections, '', 'getSections', err, false);
    return;
  }

  yield put(homeActions.fetchSuccessSections(data));
}

export const homeSagas = [takeEvery(FETCH_SECTIONS, getSections)];
