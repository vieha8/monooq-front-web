import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import dummySpaceImage from 'images/dummy_space.png';
import { authActions, getToken } from 'redux/modules/auth';
import { uiActions } from 'redux/modules/ui';
import { loggerActions } from 'redux/modules/logger';
import {
  getApiRequest,
  postApiRequest,
  putApiRequest,
  deleteApiRequest,
  apiEndpoint,
} from 'redux/helpers/api';
import { uploadImage } from 'redux/helpers/firebase';
import fileType from 'helpers/file-type';
import { convertBaseUrl, convertImgixUrl } from 'helpers/imgix';
import { getPrefecture } from 'helpers/prefectures';
import { formatAddComma } from 'helpers/string';
import Path from 'config/path';
import { handleError } from './error';

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
const DELETE_FAILED_SPACE = 'DELETE_FAILED_SPACE';
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
  DELETE_FAILED_SPACE,
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
      space: null,
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
    [DELETE_FAILED_SPACE]: state => ({
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
  const { data: payload, status, err } = yield call(
    getApiRequest,
    apiEndpoint.spaces(spaceId),
    {},
    token,
  );

  if (err) {
    if (status === 404) {
      // yield put(push(Path.pageNotFound()));
      window.location.href = Path.pageNotFound();
      // node.jsサーバー側で404返すための処置
    } else {
      yield handleError(spaceActions.fetchFailedSpace, '', 'getSpace', err, false);
    }
    return;
  }

  if (isSelfOnly) {
    // 不正対策
    const user = yield select(state => state.auth.user);
    if (payload.userId !== user.id) {
      yield handleError(
        '',
        '',
        'getSpace(Bad Request)',
        `spaceUserID(${payload.userId})/loginUserID(${user.id})`,
        false,
      );
    }
  }

  if (!payload.images || payload.images.length === 0) {
    if (!payload.images) {
      payload.images = [];
    }
    payload.images[0] = { imageUrl: dummySpaceImage };
  }

  yield put(spaceActions.fetchSuccessSpace(payload));
}

function* getGeocode({ payload: { address } }) {
  const KEY = 'AIzaSyAF1kxs-DsZJHW3tX3eNi88tKixy-zbGtk';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${KEY}&address=${address}`;

  try {
    const { data: places, err } = yield call(
      () =>
        new Promise((resolve, reject) => {
          axios
            .get(url)
            .then(result => resolve(result))
            .catch(error => reject(error));
        }),
    );

    if (err) {
      yield handleError(spaceActions.getFailedGeocode, '', 'getGeocode', err, false);
      return;
    }

    if (places.results.length > 0) {
      yield put(
        spaceActions.getSuccessGeocode({
          geocode: places.results[0].geometry.location,
        }),
      );
    } else {
      yield handleError(
        spaceActions.getFailedGeocode,
        '',
        'getGeocode',
        'places.results is 0',
        false,
      );
    }
  } catch (err) {
    yield handleError(spaceActions.getFailedGeocode, '', 'getGeocode(exception)', err, false);
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
      if (image.imageUrl) {
        if (image.imageUrl.includes('data:image/png;base64,')) {
          return '';
        }
        return convertBaseUrl(image.imageUrl);
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
  const { data, err } = yield call(postApiRequest, apiEndpoint.spaces(), params, token);

  if (err) {
    yield handleError(spaceActions.createFailedSpace, '', 'createSpace', err, false);
    return;
  }

  if (images && images.length > 0) {
    const spaceId = data.id;
    const imageUrls = yield createImageUrls(spaceId, images);

    if (imageUrls.error) {
      yield handleError(
        spaceActions.createFailedSpace,
        '',
        'createSpace(imageUrls)',
        imageUrls.error,
        false,
      );
      return;
    }

    const imgs = imageUrls
      .filter(url => url !== '')
      .map(url => ({ SpaceID: spaceId, ImageUrl: url }));

    if (imgs.length > 0) {
      const { err: err2 } = yield call(
        putApiRequest,
        apiEndpoint.spaces(spaceId),
        {
          Images: imgs,
        },
        token,
      );

      if (err2) {
        yield handleError(spaceActions.fetchFailedSpace, '', 'createSpace(err2)', err2, false);
        return;
      }
    }
  }

  yield put(spaceActions.createSuccessSpace(data));
}

function* prepareUpdateSpace({ payload: spaceId }) {
  if (Object.keys(yield select(state => state.auth.user)).length === 0) {
    return;
  }

  const spaceCache = yield select(state => state.ui.space);
  if (spaceCache.id) {
    return;
  }

  const token = yield* getToken();
  const { data: space, status, err } = yield call(
    getApiRequest,
    apiEndpoint.spaces(spaceId),
    {},
    token,
  );

  if (err) {
    if (status === 404) {
      yield put(push(Path.pageNotFound()));
    } else {
      yield handleError(spaceActions.fetchFailedSpace, '', 'prepareUpdateSpace', err, false);
    }
    return;
  }

  if (space === undefined) {
    yield handleError(
      spaceActions.fetchFailedSpace,
      '',
      'prepareUpdateSpace(space data undefined)',
      `spaceId:${spaceId}`,
      false,
    );
    return;
  }

  const user = yield select(state => state.auth.user);
  if (space.userId !== user.id) {
    yield handleError(
      '',
      '',
      'prepareUpdateSpace(Bad Request)',
      `spaceUserID(${space.userId})/loginUserID(${user.id})`,
      false,
    );
    return;
  }

  space.priceFull = formatAddComma(space.priceFull);
  space.priceHalf = formatAddComma(space.priceHalf);
  space.priceQuarter = formatAddComma(space.priceQuarter);

  yield put(uiActions.setUiState({ space }));
}

function* updateSpace({ payload: { spaceId, body } }) {
  const params = generateSpaceRequestParams(body);
  const { images } = params;
  params.images = null;

  delete params.id;

  if (images && images.length > 0) {
    const imageUrls = yield createImageUrls(spaceId, images);
    if (imageUrls.error) {
      yield handleError(
        spaceActions.updateFailedSpace,
        '',
        'updateSpace(imageUrls)',
        imageUrls.error,
        false,
      );
      return;
    }
    params.images = imageUrls
      .filter(url => url !== '')
      .map(url => ({ SpaceID: spaceId, ImageUrl: url }));
    params.Status = 'public';
  }

  const token = yield* getToken();
  const { data, status, err } = yield call(
    putApiRequest,
    apiEndpoint.spaces(spaceId),
    params,
    token,
  );

  if (err) {
    if (status === 404) {
      yield handleError(
        spaceActions.updateFailedSpace,
        '',
        'updateSpace(404)',
        `spaceId:${spaceId}`,
        false,
      );
    } else {
      yield handleError(spaceActions.updateFailedSpace, '', 'updateSpace', err, false);
    }
    return;
  }

  yield put(spaceActions.updateSuccessSpace(data));
}

function* deleteSpace({ payload: { space } }) {
  const user = yield select(state => state.auth.user);
  if (space.userId !== user.id) {
    yield handleError(
      '',
      '',
      'deleteSpace(Bad Request)',
      `spaceUserID(${space.userId})/loginUserID(${user.id})`,
      false,
    );
    return;
  }
  const token = yield* getToken();
  const { err } = yield call(deleteApiRequest, apiEndpoint.spaces(space.id), token);
  if (err) {
    yield handleError(spaceActions.deleteFailedSpace, '', 'deleteSpace', err, false);
    return;
  }

  window.location.href = Path.spaces();
}

function* addSpaceAccessLog({ payload: { spaceId } }) {
  let user = yield select(state => state.auth.user);
  if (!user.id) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);
  const token = yield* getToken();
  const { err } = yield call(
    postApiRequest,
    apiEndpoint.addUserSpaceAccessLog(user.id, spaceId),
    {},
    token,
  );

  if (err) {
    yield handleError('', '', 'addSpaceAccessLog', err, false);
  }
}

function* search({
  payload: { limit, offset, keyword, prefCode, receiptType, type, isFurniture },
}) {
  const token = yield* getToken();

  const params = {
    limit,
    offset,
    keyword,
    pref: getPrefecture(prefCode),
    receiptType,
    spaceType: type,
    isFurniture,
  };

  const { data, err, headers } = yield call(getApiRequest, apiEndpoint.spaces(), params, token);

  if (err) {
    yield handleError(spaceActions.failedSearch, '', 'search', err, false);
    return;
  }

  const res = data.map(v => {
    const space = v;
    if (space.images.length === 0) {
      space.images = [{ imageUrl: dummySpaceImage }];
    } else {
      space.images = space.images.map(image => {
        image.imageUrl = convertImgixUrl(
          image.imageUrl,
          'fit=crop&fill-color=DBDBDB&w=600&h=400&auto=format',
        );
        return image;
      });
    }
    return space;
  });

  yield put(
    loggerActions.recordEvent({
      event: 'space_searches',
      detail: {
        params,
      },
    }),
  );

  const isMore = res.length === limit;
  yield put(
    spaceActions.successSearch({
      spaces: res,
      isMore,
      maxCount: parseInt(headers['content-range'], 10),
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
