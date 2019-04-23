import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, call, race, delay } from 'redux-saga/effects';
import { getToken } from './auth';
import { getApiRequest, apiEndpoint } from '../helpers/api';
import { errorActions } from './error';

const TIMEOUT = 30000;

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
function* getSections() {
  const token = yield* getToken();

  const { posts: payload, timeout } = yield race({
    posts: call(getApiRequest, apiEndpoint.sections(), {}, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'sections';
  if (timeout) {
    yield put(homeActions.fetchFailedSections(`timeout(${functionName})`));
    yield put(errorActions.setError(`timeout(${functionName})`));
    return;
  }
  if (payload.err) {
    yield put(homeActions.fetchFailedSections(`error(${functionName}):${payload.err}`));
    yield put(errorActions.setError(`error(${functionName}):${payload.err}`));
    return;
  }

  yield put(homeActions.fetchSuccessSections(payload.data));
}

export const homeSagas = [takeEvery(FETCH_SECTIONS, getSections)];
