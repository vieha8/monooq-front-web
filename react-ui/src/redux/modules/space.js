import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import dummySpaceImage from 'images/dummy_space.png';
import { store } from '../store/configureStore';
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
import { convertBaseUrl } from '../../helpers/imgix';
import Path from '../../config/path';

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
const FETCH_FEATURE_SPACES = 'FETCH_FEATURE_SPACES';
const FETCH_SUCCESS_FEATURE_SPACES = 'FETCH_SUCCESS_FEATURE_SPACES';
const FETCH_FAILED_FEATURE_SPACES = 'FETCH_FAILED_FEATURE_SPACES';
const ADD_SPACE_ACCESS_LOG = 'ADD_SPACE_ACCESS_LOG';

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
  FETCH_FEATURE_SPACES,
  FETCH_SUCCESS_FEATURE_SPACES,
  FETCH_FAILED_FEATURE_SPACES,
  ADD_SPACE_ACCESS_LOG,
);

// Reducer
const initialState = {
  isComplete: false,
  isLoading: false,
  space: null,
  features: [
    {
      id: 6,
      title: '東京都内で預けるならここ!',
      spaces: [],
    },
    {
      id: 7,
      title: '大阪府内で預けるならここ!',
      spaces: [],
    },
    {
      id: 8,
      title: '福岡県内で預けるならここ!',
      spaces: [],
    },
    {
      id: 9,
      title: '大容量、倉庫スペース!',
      spaces: [],
    },
    {
      id: 5,
      title: '最近閲覧したスペース',
      spaces: [],
    },
  ],
};

export const spaceReducer = handleActions(
  {
    [CLEAR_SPACE]: state => ({
      ...state,
      space: {},
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
    [FETCH_FEATURE_SPACES]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SUCCESS_FEATURE_SPACES]: (state, action) => ({
      ...state,
      isLoading: false,
      features: action.payload,
    }),
  },
  initialState,
);

// Sagas
function* getSpace({ payload: { spaceId, isSelfOnly } }) {
  const token = yield* getToken();
  const { data: payload, err } = yield call(getApiRequest, apiEndpoint.spaces(spaceId), {}, token);

  if (err) {
    yield put(spaceActions.fetchFailedSpace(err));
    store.dispatch(push(Path.notFound()));
    return;
  }

  if (isSelfOnly) {
    // 不正対策
    let user = yield select(state => state.auth.user);
    if (!user.ID) {
      yield take(authActions.checkLoginSuccess);
    }
    user = yield select(state => state.auth.user);
    if (payload.UserID !== user.ID) {
      yield put(errorActions.setError('Bad Request'));
    }
  }

  if (!payload.Images || payload.Images.length === 0) {
    if (!payload.Images) {
      payload.Images = [];
    }
    payload.Images[0] = { ImageUrl: dummySpaceImage };
  }

  yield put(spaceActions.fetchSuccessSpace(payload));
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
  const { data, err } = yield call(postApiRequest, apiEndpoint.spaces(), params, token);
  if (err) {
    yield put(spaceActions.createFailedSpace(err));
    yield put(errorActions.setError(err));
    return;
  }

  if (images && images.length > 0) {
    const spaceId = data.ID;
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
      const { err: err2 } = yield call(
        putApiRequest,
        apiEndpoint.spaces(spaceId),
        {
          Images: imgs,
        },
        token,
      );
      if (err2) {
        yield put(spaceActions.createFailedSpace(err));
        yield put(errorActions.setError(err));
        return;
      }
    }
  }

  yield put(spaceActions.createSuccessSpace(data));
}

function* prepareUpdateSpace({ payload: spaceId }) {
  const spaceCache = yield select(state => state.ui.space);
  if (spaceCache.ID) {
    return;
  }

  const token = yield* getToken();
  const { data: space, err } = yield call(getApiRequest, apiEndpoint.spaces(spaceId), {}, token);

  const user = yield select(state => state.auth.user);
  if (space.UserID !== user.ID) {
    yield put(errorActions.setError('Bad Request'));
    return;
  }

  if (err) {
    yield put(spaceActions.fetchFailedSpace(err));
    store.dispatch(push(Path.notFound()));
    return;
  }

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
  const { data, err } = yield call(putApiRequest, apiEndpoint.spaces(spaceId), params, token);
  if (err) {
    yield put(spaceActions.updateFailedSpace(err));
    yield put(errorActions.setError(err));
    return;
  }
  yield put(spaceActions.updateSuccessSpace(data));
}

function* deleteSpace({ payload: { space } }) {
  const user = yield select(state => state.auth.user);
  if (space.UserID !== user.ID) {
    yield put(errorActions.setError('Bad Request'));
    return;
  }
  const token = yield* getToken();
  yield call(deleteApiRequest, apiEndpoint.spaces(space.ID), token);
  window.location.href = Path.spaces();
}

function* getFeatureSpaces() {
  let user = yield select(state => state.auth.user);
  if (!user.ID) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);
  const features = yield select(state => state.space.features);

  const token = yield* getToken();

  const res = yield Promise.all(
    features.map(async v => {
      const feature = v;
      const featureId = v.id;

      if (featureId === 5) {
        const { data } = await getApiRequest(apiEndpoint.userSpaceAccessLog(user.ID), {}, token);
        feature.spaces = data;
        return feature;
      }

      const { data } = await getApiRequest(apiEndpoint.features(featureId), {}, token);
      feature.spaces = data;
      return feature;
    }),
  );

  yield put(spaceActions.fetchSuccessFeatureSpaces(res));
}

function* addSpaceAccessLog({ payload: { spaceId } }) {
  let user = yield select(state => state.auth.user);
  if (!user.ID) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);
  const token = yield* getToken();
  yield call(postApiRequest, apiEndpoint.addUserSpaceAccessLog(user.ID, spaceId), {}, token);
}

export const spaceSagas = [
  takeEvery(FETCH_SPACE, getSpace),
  takeEvery(CREATE_SPACE, createSpace),
  takeEvery(UPDATE_SPACE, updateSpace),
  takeEvery(PREPARE_UPDATE_SPACE, prepareUpdateSpace),
  takeEvery(DELETE_SPACE, deleteSpace),
  takeEvery(FETCH_FEATURE_SPACES, getFeatureSpaces),
  takeEvery(ADD_SPACE_ACCESS_LOG, addSpaceAccessLog),
];
