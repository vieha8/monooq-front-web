import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, call, select } from 'redux-saga/effects';
import dummySpaceImage from 'images/dummy_space.png';
import { apiEndpoint } from './api';
import { uploadImage } from '../helpers/firebase';
import fileType from '../../helpers/file-type';
import { userActions } from './user';
import { authActions } from './auth';
import { getApiRequest, postApiRequest, putApiRequest, deleteApiRequest } from '../helpers/api';
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
);

// Reducer
const initialState = {
  isComplete: false,
  isLoading: false,
  space: null,
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
  },
  initialState,
);

// Sagas
function* getSpace({ payload: { spaceId, isSelfOnly } }) {
  const { data: payload, err } = yield call(getApiRequest, apiEndpoint.spaces(spaceId));

  if (err) {
    yield put(spaceActions.fetchFailedSpace(err));
    yield put(errorActions.setError(err));
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

function* createSpace({ payload: { body } }) {
  const params = generateSpaceRequestParams(body);
  const { images } = params;
  params.images = null;

  if (params.prefecture) {
    params.address = `${params.prefecture}${params.address}`;
  }

  const { data, err } = yield call(postApiRequest, apiEndpoint.spaces(), params);
  if (err) {
    yield put(spaceActions.createFailedSpace(err));
    yield put(errorActions.setError(err));
    return;
  }

  if (images && images.length > 0) {
    const spaceId = data.ID;
    const imageUrls = yield Promise.all(
      images.filter(image => !image.ID).map(async image => {
        if (image.ImageUrl) {
          if (image.ImageUrl.includes('data:image/png;base64,')) {
            return '';
          }
          return image.ImageUrl;
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
    );
    const imgs = imageUrls
      .filter(url => url !== '')
      .map(url => ({ SpaceID: spaceId, ImageUrl: url }));

    if (imgs.length > 0) {
      const { err: err2 } = yield call(putApiRequest, apiEndpoint.spaces(spaceId), {
        Images: imgs,
      });
      if (err2) {
        yield put(spaceActions.createFailedSpace(err));
        yield put(errorActions.setError(err));
        return;
      }
    }
  }

  yield put(spaceActions.createSuccessSpace(data));
}

function* updateSpace({ payload: { spaceId, body } }) {
  const params = generateSpaceRequestParams(body);
  const { images } = params;
  params.images = null;

  delete params.id;

  if (images && images.length > 0) {
    const imageUrls = yield Promise.all(
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
    );
    params.images = imageUrls
      .filter(url => url !== '')
      .map(url => ({ SpaceID: spaceId, ImageUrl: url }));
  }

  const { data, err } = yield call(putApiRequest, apiEndpoint.spaces(spaceId), params);
  if (err) {
    yield put(userActions.updateFailedSpace(err));
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
  yield call(deleteApiRequest, apiEndpoint.spaces(space.ID));
  window.location.href = Path.spaces();
}

export const spaceSagas = [
  takeEvery(FETCH_SPACE, getSpace),
  takeEvery(CREATE_SPACE, createSpace),
  takeEvery(UPDATE_SPACE, updateSpace),
  takeEvery(DELETE_SPACE, deleteSpace),
];
