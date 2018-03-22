import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, call, select } from 'redux-saga/effects';
import { apiActions, apiEndpoint } from './api';
import { store } from '../store/configureStore';
import { push } from 'react-router-redux';
import { uploadImage } from '../helpers/firebase';
import fileType from '../../helpers/file-type';
import Path from '../../config/path';
import { userActions } from './user';
import axios from 'axios';
import { authActions } from './auth';

// Actions
const FETCH_SPACE = 'FETCH_SPACE';
const FETCH_SUCCESS_SPACE = 'FETCH_SUCCESS_SPACE';
const FETCH_FAILED_SPACE = 'FETCH_FAILED_SPACE';
const CREATE_SPACE = 'CREATE_SPACE';
const CREATE_SUCCESS_SPACE = 'CREATE_SUCCESS_SPACE';
const CREATE_FAILED_SPACE = 'CREATE_FAILED_SPACE';
const UPDATE_SPACE = 'UPDATE_SPACE';
const UPDATE_SUCCESS_SPACE = 'UPDATE_SUCCESS_SPACE';
const UPDATE_FAILED_SPACE = 'UPDATE_FAILED_SPACE';

export const spaceActions = createActions(
  FETCH_SPACE,
  FETCH_SUCCESS_SPACE,
  FETCH_FAILED_SPACE,
  CREATE_SPACE,
  CREATE_SUCCESS_SPACE,
  CREATE_FAILED_SPACE,
  UPDATE_SPACE,
  UPDATE_SUCCESS_SPACE,
  UPDATE_FAILED_SPACE,
);

// Reducer
const initialState = {
  isLoading: false,
  space: null,
};

export const spaceReducer = handleActions(
  {
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
    }),
    [CREATE_SUCCESS_SPACE]: (state, action) => ({
      ...state,
      created: action.payload,
    }),
  },
  initialState,
);

//Sagas
function* getSpace({ payload: { spaceId, isSelfOnly } }) {
  yield put(apiActions.apiGetRequest({ path: apiEndpoint.spaces(spaceId) }));
  const { payload, error, meta } = yield take(apiActions.apiResponse);
  if (error) {
    yield put(spaceActions.fetchFailedSpace(meta));
    return;
  }

  if (isSelfOnly) {
    // 不正対策
    let user = yield select(state => state.auth.user);
    if (!user.ID) {
      yield take(authActions.checkLoginSuccess);
    }
    user = yield select(state => state.auth.user);
    if (payload.UserId !== user.ID) {
      store.dispatch(push(Path.error(400)));
    }
  }

  if (payload.Address) {
    // TODO 本来はサーバー側でlat,lngは持つけど暫定的に
    const KEY = 'AIzaSyCrHQDZXZI21cMEW8FIYYWKyvI2kLUDsbA';
    const places = yield call(
      () =>
        new Promise((resolve, reject) => {
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?key=${KEY}&address=${
                payload.Address
              }`,
            )
            .then(result => resolve(result))
            .catch(error => reject(error));
        }),
    );
    //TODO APIレスポンスのエラーハンドリング
    if (places.data.results.length > 0) {
      payload.location = places.data.results[0].geometry.location;
    }
  }

  yield put(spaceActions.fetchSuccessSpace(payload));
}

function* createSpace({ payload: { body } }) {
  const { images } = body;
  body.images = null;

  yield put(apiActions.apiPostRequest({ path: apiEndpoint.spaces(), body }));
  const { payload, error, meta } = yield take(apiActions.apiResponse);
  if (error) {
    yield put(spaceActions.createFailedSpace(meta));
    return;
  }

  if (images.length > 0) {
    const spaceId = payload.ID;
    const imageUrls = yield Promise.all(
      images.map(async image => {
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
    payload.images = imageUrls.map(url => ({ imageUrl: url }));

    yield put(apiActions.apiPutRequest({ path: apiEndpoint.spaces(spaceId), payload }));
    const { error, meta } = yield take(apiActions.apiResponse);
    if (error) {
      yield put(spaceActions.createFailedSpace(meta));
      return;
    }
  }
  yield put(spaceActions.createSuccessSpace(payload));
  store.dispatch(push(Path.createSpaceCompletion()));
}

function* updateSpace({ payload: { spaceId, body } }) {
  const { images } = body;
  delete body.id;
  if (images) {
    //TODO 画像アップロード処理
  }
  yield put(apiActions.apiPutRequest({ path: apiEndpoint.spaces(spaceId), body }));
  const { payload, error, meta } = yield take(apiActions.apiResponse);
  if (error) {
    yield put(userActions.updateFailedSpace(meta));
    return;
  }
  yield put(spaceActions.updateSuccessSpace(payload));
  store.dispatch(push(Path.editSpaceCompletion(spaceId)));
}

export const spaceSagas = [
  takeEvery(FETCH_SPACE, getSpace),
  takeEvery(CREATE_SPACE, createSpace),
  takeEvery(UPDATE_SPACE, updateSpace),
];
