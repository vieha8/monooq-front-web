import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, call } from 'redux-saga/effects';
import { getToken } from './auth';
import { getApiRequest, apiEndpoint } from '../helpers/api';
import { handleError } from './error';

// Actions
const FETCH_SECTIONS = 'FETCH_SECTIONS';
const FETCH_SUCCESS_SECTIONS = 'FETCH_SUCCESS_SECTIONS';
const FETCH_FAILED_SECTIONS = 'FETCH_FAILED_SECTIONS';

export const sectionActions = createActions(
  FETCH_SECTIONS,
  FETCH_SUCCESS_SECTIONS,
  FETCH_FAILED_SECTIONS,
);

// Reducer
const initialState = {
  sections: [],
  isLoading: false,
};

export const sectionReducer = handleActions(
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
function* getSections() {
  const token = yield* getToken();

  const api = apiEndpoint.sections();

  const { data, err } = yield call(getApiRequest, api, {}, token);
  if (err) {
    yield handleError(sectionActions.fetchFailedSections, '', 'getSections', err, false);
    return;
  }

  yield put(sectionActions.fetchSuccessSections(data));
}

export const sectionSagas = [takeEvery(FETCH_SECTIONS, getSections)];
