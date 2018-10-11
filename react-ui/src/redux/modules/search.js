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
    } else {
      space.Images = space.Images.map(image => {
        const imageUrl = image.ImageUrl;

        let storageUrl = 'https://firebasestorage.googleapis.com/v0/b/monooq-prod.appspot.com/o/';
        let imgixUrl = 'https://monooq.imgix.net/';

        if (imageUrl.indexOf('monooq-dev.appspot.com') > -1) {
          storageUrl = 'https://firebasestorage.googleapis.com/v0/b/monooq-dev.appspot.com/o/';
          imgixUrl = 'https://monooq-dev.imgix.net/';
        }

        let replaceUrl =
          imageUrl.replace(storageUrl, imgixUrl) + '&fit=crop&w=350&max-h=200&format=auto';

        if (imageUrl.indexOf('s3-ap-northeast-1') > -1) {
          storageUrl = 'https://s3-ap-northeast-1.amazonaws.com/monooq/';
          imgixUrl = 'https://monooq-s3.imgix.net/';
          replaceUrl =
            imageUrl.replace(storageUrl, imgixUrl) + '?fit=crop&w=350&max-h=200&format=auto';
        }
        image.ImageUrl = replaceUrl;
        return image;
      });
    }
    return space;
  });

  const isMore = res.length === limit;
  yield put(searchActions.successSearch({ spaces: res, isMore }));
}

export const searchSagas = [takeEvery(DO_SEARCH, search)];
