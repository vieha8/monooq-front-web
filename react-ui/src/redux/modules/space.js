import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, call, select, race, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import dummySpaceImage from 'images/dummy_space.png';
import { store } from '../store/index';
import { uploadImage } from '../helpers/firebase';
import fileType from '../../helpers/file-type';
import { authActions, getToken } from './auth';
import { uiActions } from './ui';
import {
  getApiRequest,
  postApiRequest,
  putApiRequest,
  deleteApiRequest,
  apiEndpoint,
} from '../helpers/api';
import { errorActions } from './error';
import { convertBaseUrl, convertImgixUrl } from '../../helpers/imgix';
import Path from '../../config/path';
import { getPrefecture } from '../../helpers/prefectures';

const TIMEOUT = 30000;

// Actions
const CLEAR_SPACE = 'CLEAR_SPACE';
const FETCH_SPACE = 'FETCH_SPACE';
const FETCH_SUCCESS_SPACE = 'FETCH_SUCCESS_SPACE';
const FETCH_FAILED_SPACE = 'FETCH_FAILED_SPACE';
const CREATE_SPACE = 'CREATE_SPACE';
const CREATE_SUCCESS_SPACE = 'CREATE_SUCCESS_SPACE';
const CREATE_FAILED_SPACE = 'CREATE_FAILED_SPACE';
const UPDATE_SPACE = 'UPDATE_SPACE';
const UPDATE_SUCCESS_SPACE = 'UPDATE_SUCCESS_SPACE';
const UPDATE_FAILED_SPACE = 'UPDATE_FAILED_SPACE';
const SET_SPACE = 'SET_SPACE';
const DELETE_SPACE = 'DELETE_SPACE';
const PREPARE_UPDATE_SPACE = 'PREPARE_UPDATE_SPACE';
const ADD_SPACE_ACCESS_LOG = 'ADD_SPACE_ACCESS_LOG';
const DO_SEARCH = 'DO_SEARCH';
const SUCCESS_SEARCH = 'SUCCESS_SEARCH';
const FAILED_SEARCH = 'FAILED_SEARCH';
const GET_GEOCODE = 'GET_GEOCODE';
const GET_FAILED_GEOCODE = 'GET_FAILED_GEOCODE';
const GET_SUCCESS_GEOCODE = 'GET_SUCCESS_GEOCODE';
const RESET_SEARCH = 'RESET_SEARCH';

export const spaceActions = createActions(
  CLEAR_SPACE,
  FETCH_SPACE,
  FETCH_SUCCESS_SPACE,
  FETCH_FAILED_SPACE,
  CREATE_SPACE,
  CREATE_SUCCESS_SPACE,
  CREATE_FAILED_SPACE,
  UPDATE_SPACE,
  UPDATE_SUCCESS_SPACE,
  UPDATE_FAILED_SPACE,
  SET_SPACE,
  DELETE_SPACE,
  PREPARE_UPDATE_SPACE,
  ADD_SPACE_ACCESS_LOG,
  DO_SEARCH,
  SUCCESS_SEARCH,
  FAILED_SEARCH,
  RESET_SEARCH,
  GET_GEOCODE,
  GET_FAILED_GEOCODE,
  GET_SUCCESS_GEOCODE,
);

// Reducer
const initialState = {
  isComplete: false,
  isLoading: false,
  space: null,
  isMore: true,
  location: '',
  spaces: [],
  maxCount: 0,
};

export const spaceReducer = handleActions(
  {
    [CLEAR_SPACE]: state => ({
      ...state,
      space: {},
      isComplete: false,
    }),
    [FETCH_SPACE]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SUCCESS_SPACE]: (state, action) => ({
      ...state,
      isLoading: false,
      space: action.payload,
    }),
    [FETCH_FAILED_SPACE]: state => ({
      ...state,
      isLoading: false,
    }),
    [CREATE_SPACE]: state => ({
      ...state,
      created: null,
      isLoading: true,
      isComplete: false,
    }),
    [CREATE_SUCCESS_SPACE]: (state, action) => ({
      ...state,
      created: action.payload,
      isLoading: false,
      isComplete: true,
    }),
    [CREATE_FAILED_SPACE]: state => ({
      ...state,
      created: null,
      isLoading: false,
      isComplete: false,
    }),
    [UPDATE_SPACE]: state => ({
      ...state,
      isLoading: true,
      isComplete: false,
    }),
    [UPDATE_SUCCESS_SPACE]: state => ({
      ...state,
      isLoading: false,
      isComplete: true,
    }),
    [UPDATE_FAILED_SPACE]: state => ({
      ...state,
      isLoading: false,
      isComplete: false,
    }),
    [SET_SPACE]: (state, action) => ({
      ...state,
      space: action.payload.space,
    }),
    [PREPARE_UPDATE_SPACE]: state => ({
      ...state,
      isComplete: false,
    }),
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
    [GET_GEOCODE]: state => ({
      ...state,
      isLoading: true,
    }),
    [GET_SUCCESS_GEOCODE]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      geocode: payload.geocode,
    }),
    [GET_FAILED_GEOCODE]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

// Sagas
function* getSpace({ payload: { spaceId, isSelfOnly } }) {
  const token = yield* getToken();

  const { posts: payload, timeout } = yield race({
    posts: call(getApiRequest, apiEndpoint.spaces(spaceId), {}, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'getSpace';
  if (timeout) {
    yield put(
      spaceActions.fetchFailedSpace(`timeout(${functionName}):${apiEndpoint.spaces(spaceId)}`),
    );
    yield put(errorActions.setError(`timeout(${functionName}):${apiEndpoint.spaces(spaceId)}`));
    return;
  }
  if (payload.err) {
    if (payload.status === 404) {
      store.dispatch(push(Path.notFound()));
    } else {
      yield put(spaceActions.fetchFailedSpace(`error(${functionName}):${payload.err}`));
      yield put(errorActions.setError(`error(${functionName}):${payload.err}`));
    }
    return;
  }

  if (isSelfOnly) {
    // 不正対策
    let user = yield select(state => state.auth.user);
    if (!user.ID) {
      yield take(authActions.checkLoginSuccess);
    }
    user = yield select(state => state.auth.user);
    if (payload.data.UserID !== user.ID) {
      yield put(errorActions.setError('Bad Request'));
    }
  }

  if (!payload.data.Images || payload.data.Images.length === 0) {
    if (!payload.data.Images) {
      payload.data.Images = [];
    }
    payload.data.Images[0] = { ImageUrl: dummySpaceImage };
  }

  yield put(spaceActions.fetchSuccessSpace(payload.data));
}

function* getGeocode({ payload: { address } }) {
  const KEY = 'AIzaSyAF1kxs-DsZJHW3tX3eNi88tKixy-zbGtk';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${KEY}&address=${address}`;

  const { posts: places, timeout } = yield race({
    posts: call(
      () =>
        new Promise((resolve, reject) => {
          axios
            .get(url)
            .then(result => resolve(result))
            .catch(error => reject(error));
        }),
    ),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'getGeocode';
  if (timeout) {
    yield put(spaceActions.getFailedGeocode(`timeout(${functionName}):address(${url})`));
    yield put(errorActions.setError(`timeout(${functionName}):address(${url})`));
    return;
  }
  if (places.data.error_message) {
    yield put(
      spaceActions.getFailedGeocode(
        `error(${functionName}):${places.data.error_message}:url(${url})`,
      ),
    );
    yield put(
      errorActions.setError(`error(${functionName}):${places.data.error_message}:url(${url})`),
    );
    return;
  }

  if (places.data.results.length > 0) {
    yield put(
      spaceActions.getSuccessGeocode({
        geocode: places.data.results[0].geometry.location,
      }),
    );
  }
}

function generateSpaceRequestParams(space) {
  const params = {};

  Object.keys(space).forEach(key => {
    const requestKey = `${key[0].toLowerCase()}${key.substr(1)}`;
    params[requestKey] = space[key];
  });

  if (params.priceFull) {
    params.priceFull = parseInt(params.priceFull, 10);
  }

  if (params.priceHalf) {
    params.priceHalf = parseInt(params.priceHalf, 10);
  }

  if (params.priceQuarter) {
    params.priceQuarter = parseInt(params.priceQuarter, 10);
  }

  return params;
}

const createImageUrls = (spaceId, images) =>
  Promise.all(
    images.map(async image => {
      if (image.ImageUrl) {
        if (image.ImageUrl.includes('data:image/png;base64,')) {
          return '';
        }
        return convertBaseUrl(image.ImageUrl);
      }
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(image);
      const ext = await new Promise(resolve => {
        fileReader.onload = () => {
          const imageType = fileType(fileReader.result);
          resolve(imageType.ext);
        };
      });
      const timeStamp = Date.now();
      const imagePath = `/img/spaces/${spaceId}/${timeStamp}.${ext}`;
      return uploadImage(imagePath, image);
    }),
  ).catch(error => ({ error }));

function* createSpace({ payload: { body } }) {
  const params = generateSpaceRequestParams(body);
  const { images } = params;
  params.images = null;

  if (params.prefecture) {
    params.address = `${params.prefecture}${params.address}`;
  }

  const token = yield* getToken();

  const { posts: payload, timeout } = yield race({
    posts: call(postApiRequest, apiEndpoint.spaces(), params, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'createSpace';
  if (timeout) {
    yield put(spaceActions.createFailedSpace(`timeout(${functionName}):${JSON.stringify(params)}`));
    yield put(errorActions.setError(`timeout(${functionName}):${JSON.stringify(params)}`));
    return;
  }
  if (payload.err) {
    yield put(spaceActions.createFailedSpace(`error(${functionName}):${payload.err}`));
    yield put(errorActions.setError(`error(${functionName}):${payload.err}`));
    return;
  }

  if (images && images.length > 0) {
    const spaceId = payload.data.ID;
    const imageUrls = yield createImageUrls(spaceId, images);

    if (imageUrls.error) {
      yield put(spaceActions.createFailedSpace(imageUrls.error));
      yield put(errorActions.setError(imageUrls.error));
      return;
    }

    const imgs = imageUrls
      .filter(url => url !== '')
      .map(url => ({ SpaceID: spaceId, ImageUrl: url }));

    if (imgs.length > 0) {
      const { posts: payloadImage, timeout: timeoutImage } = yield race({
        posts: call(putApiRequest, apiEndpoint.spaces(spaceId), { Images: imgs }, token),
        timeout: delay(TIMEOUT),
      });

      if (timeoutImage) {
        yield put(
          spaceActions.fetchFailedSpace(
            `timeoutImage(${functionName}):${apiEndpoint.spaces(spaceId)}`,
          ),
        );
        yield put(
          errorActions.setError(`timeoutImage(${functionName}):${apiEndpoint.spaces(spaceId)}`),
        );
        return;
      }

      if (payloadImage.err) {
        yield put(spaceActions.fetchFailedSpace(`errorImage(${functionName}):${payloadImage.err}`));
        yield put(errorActions.setError(`errorImage(${functionName}):${payloadImage.err}`));
        return;
      }
    }
  }

  yield put(spaceActions.createSuccessSpace(payload.data));
}

function* prepareUpdateSpace({ payload: spaceId }) {
  if (Object.keys(yield select(state => state.auth.user)).length === 0) {
    return;
  }

  const spaceCache = yield select(state => state.ui.space);
  if (spaceCache.ID) {
    return;
  }

  const token = yield* getToken();

  const { posts: space, timeout } = yield race({
    posts: call(getApiRequest, apiEndpoint.spaces(spaceId), {}, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'prepareUpdateSpace';
  if (timeout) {
    yield put(
      spaceActions.fetchFailedSpace(`timeout(${functionName}):${apiEndpoint.spaces(spaceId)}`),
    );
    yield put(errorActions.setError(`timeout(${functionName}):${apiEndpoint.spaces(spaceId)}`));
    return;
  }
  if (space.err) {
    if (space.status === 404) {
      store.dispatch(push(Path.notFound()));
    } else {
      yield put(spaceActions.fetchFailedSpace(`error(${functionName}):${space.err}`));
      yield put(errorActions.setError(`error(${functionName}):${space.err}`));
    }
    return;
  }

  if (space.data === undefined) {
    yield put(
      spaceActions.fetchFailedSpace(
        `error(${functionName}):undefined(space.data):spaceId(${spaceId})`,
      ),
    );
    yield put(
      errorActions.setError(`error(${functionName}):undefined(space.data):spaceId(${spaceId})`),
    );
    return;
  }

  const user = yield select(state => state.auth.user);
  if (space.data.UserID !== user.ID) {
    yield put(
      errorActions.setError(
        `Bad Request(${functionName}):spaceUserID(${space.data.UserID})/loginUserID(${user.ID})`,
      ),
    );
    return;
  }

  yield put(uiActions.setUiState({ space: space.data }));
}

function* updateSpace({ payload: { spaceId, body } }) {
  const params = generateSpaceRequestParams(body);
  const { images } = params;
  params.images = null;

  delete params.id;

  if (images && images.length > 0) {
    const imageUrls = yield createImageUrls(spaceId, images);
    if (imageUrls.error) {
      yield put(spaceActions.createFailedSpace(imageUrls.error));
      yield put(errorActions.setError(imageUrls.error));
      return;
    }
    params.images = imageUrls
      .filter(url => url !== '')
      .map(url => ({ SpaceID: spaceId, ImageUrl: url }));
    params.Status = 'public';
  }

  const token = yield* getToken();

  const { posts: payload, timeout } = yield race({
    posts: call(putApiRequest, apiEndpoint.spaces(spaceId), params, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'updateSpace';
  if (timeout) {
    yield put(spaceActions.updateFailedSpace(`timeout(${functionName}):${JSON.stringify(params)}`));
    yield put(errorActions.setError(`timeout(${functionName}):${JSON.stringify(params)}`));
    return;
  }
  if (payload.status === 404) {
    yield put(spaceActions.updateFailedSpace(`error(${functionName}):status(${payload.status})`));
    yield put(errorActions.setError(`error(${functionName}):status(${payload.status})`));
    return;
  }
  if (payload.err) {
    yield put(spaceActions.updateFailedSpace(`error(${functionName}):${payload.err}`));
    yield put(errorActions.setError(`error(${functionName}):${payload.err}`));
    return;
  }

  yield put(spaceActions.updateSuccessSpace(payload.data));
}

function* deleteSpace({ payload: { space } }) {
  const user = yield select(state => state.auth.user);
  if (space.UserID !== user.ID) {
    yield put(errorActions.setError('Bad Request'));
    return;
  }
  const token = yield* getToken();

  const { posts: payload, timeout } = yield race({
    posts: call(deleteApiRequest, apiEndpoint.spaces(space.ID), token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'deleteSpace';
  if (timeout) {
    yield put(
      spaceActions.createFailedSpace(`timeout(${functionName}):${apiEndpoint.spaces(space.ID)}`),
    );
    yield put(errorActions.setError(`timeout(${functionName}):${apiEndpoint.spaces(space.ID)}`));
    return;
  }
  if (payload.err) {
    yield put(spaceActions.createFailedSpace(`error(${functionName}):${payload.err}`));
    yield put(errorActions.setError(`error(${functionName}):${payload.err}`));
    return;
  }

  window.location.href = Path.spaces();
}

function* addSpaceAccessLog({ payload: { spaceId } }) {
  let user = yield select(state => state.auth.user);
  if (!user.ID) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);
  const token = yield* getToken();

  const { posts: payload, timeout } = yield race({
    posts: call(postApiRequest, apiEndpoint.addUserSpaceAccessLog(user.ID, spaceId), {}, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'addSpaceAccessLog';
  if (timeout) {
    yield put(
      errorActions.setError(
        `timeout(${functionName}):${apiEndpoint.addUserSpaceAccessLog(user.ID, spaceId)}`,
      ),
    );
    return;
  }
  if (payload.err) {
    yield put(errorActions.setError(`error(${functionName}):${payload.err}`));
  }
}

function* search({
  payload: { limit, offset, keyword, prefCode, priceMin, priceMax, receiptType, type, isFurniture },
}) {
  const token = yield* getToken();

  const { posts: payload, timeout } = yield race({
    posts: call(
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
    ),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'search';
  if (timeout) {
    yield put(spaceActions.failedSearch(`timeout(${functionName})`));
    yield put(errorActions.setError(`timeout(${functionName})`));
    return;
  }
  if (payload.err) {
    yield put(spaceActions.failedSearch(`error(${functionName}):${payload.err}`));
    yield put(errorActions.setError(`error(${functionName}):${payload.err}`));
    return;
  }

  const res = payload.data.map(v => {
    const space = v;
    if (space.Images.length === 0) {
      space.Images = [{ ImageUrl: dummySpaceImage }];
    } else {
      space.Images = space.Images.map(image => {
        image.ImageUrl = convertImgixUrl(
          image.ImageUrl,
          'fit=fillmax&fill-color=DBDBDB&w=165&h=120&format=auto',
        );
        return image;
      });
    }
    return space;
  });

  const isMore = res.length === limit;
  yield put(
    spaceActions.successSearch({
      spaces: res,
      isMore,
      maxCount: parseInt(payload.headers['content-range'], 10),
    }),
  );
}

export const spaceSagas = [
  takeEvery(FETCH_SPACE, getSpace),
  takeEvery(CREATE_SPACE, createSpace),
  takeEvery(UPDATE_SPACE, updateSpace),
  takeEvery(PREPARE_UPDATE_SPACE, prepareUpdateSpace),
  takeEvery(DELETE_SPACE, deleteSpace),
  takeEvery(ADD_SPACE_ACCESS_LOG, addSpaceAccessLog),
  takeEvery(DO_SEARCH, search),
  takeEvery(GET_GEOCODE, getGeocode),
];
