import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import dummySpaceImage from 'images/dummy_space.png';
import { getPrefecture } from 'helpers/prefectures';
import { convertImgixUrl } from 'helpers/imgix';
import { getApiRequest, apiEndpoint } from '../helpers/api';
import { errorActions } from './error';
import { getToken } from './auth';

// Actions
const DO_SEARCH = 'DO_SEARCH';
const SUCCESS_SEARCH = 'SUCCESS_SEARCH';
const FAILED_SEARCH = 'FAILED_SEARCH';
const RESET_SEARCH = 'RESET_SEARCH';

export const searchActions = createActions(DO_SEARCH, SUCCESS_SEARCH, FAILED_SEARCH, RESET_SEARCH);

// Reducer
const initialState = {
  isLoading: false,
  isMore: true,
  location: '',
  spaces: [],
  maxCount: 0,
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
      maxCount: payload.maxCount,
    }),
    [RESET_SEARCH]: state => ({
      ...state,
      spaces: [],
      isMore: true,
      maxCount: 0,
    }),
  },
  initialState,
);

// Sagas
function* search({
  payload: { limit, offset, keyword, prefCode, priceMin, priceMax, receiptType, type, isFurniture },
}) {
  const token = yield* getToken();

  const { data, err, headers } = yield call(
    getApiRequest,
    apiEndpoint.spaces(),
    {
      limit,
      offset,
      keyword,
      pref: getPrefecture(prefCode),
      priceMin: priceMin || 0,
      priceMax: priceMax || 0,
      receiptType,
      type,
      isFurniture,
    },
    token,
  );
  if (err) {
    yield put(searchActions.failedSearch());
    yield put(errorActions.setError(err));
    return;
  }

  const res = data.map(v => {
    const space = v;
    if (space.Images.length === 0) {
      space.Images = [{ ImageUrl: dummySpaceImage }];
    } else {
      space.Images = space.Images.map(image => {
        image.ImageUrl = convertImgixUrl(image.ImageUrl, 'fit=crop&w=350&max-h=200&format=auto');
        return image;
      });
    }
    return space;
  });

  const isMore = res.length === limit;
  yield put(
    searchActions.successSearch({
      spaces: res,
      isMore,
      maxCount: parseInt(headers['content-range'], 10),
    }),
  );
}

export const searchSagas = [takeEvery(DO_SEARCH, search)];
