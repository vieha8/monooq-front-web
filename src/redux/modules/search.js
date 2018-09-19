import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import dummySpaceImage from 'images/dummy_space.png';
import { apiEndpoint } from './api';
import { getApiRequest } from '../helpers/api';
import { errorActions } from './error';

// Actions
const DO_SEARCH = 'DO_SEARCH';
const SUCCESS_SEARCH = 'SUCCESS_SEARCH';
const FAILED_SEARCH = 'FAILED_SEARCH';

export const searchActions = createActions(DO_SEARCH, SUCCESS_SEARCH, FAILED_SEARCH);

// Reducer
const initialState = {
  isLoading: false,
  isMore: true,
  location: '',
  spaces: [],
};

export const searchReducer = handleActions(
  {
    [DO_SEARCH]: (state, action) => ({
      ...state,
      isLoading: true,
      location: action.payload,
    }),
    [SUCCESS_SEARCH]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      spaces: [...state.spaces, ...payload.spaces],
      isMore: payload.isMore,
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
    yield put(searchActions.failedSearch());
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

  const isMore = res.length === limit;
  yield put(searchActions.successSearch({ spaces: res, isMore }));
}

export const searchSagas = [takeEvery(DO_SEARCH, search)];
