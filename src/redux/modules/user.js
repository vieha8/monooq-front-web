import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, select, call } from 'redux-saga/effects';
import firebase from 'firebase';
import { apiActions, apiEndpoint } from './api';
import { uiActions } from './ui';
import { uploadImage } from '../helpers/firebase';
import fileType from '../../helpers/file-type';
import { authActions } from './auth';

import dummySpaceImage from 'images/dummy_space.png';
import { getApiRequest } from '../helpers/api';

// Actions
const FETCH_USER = 'FETCH_USER';
const FETCH_SUCCESS_USER = 'FETCH_SUCCESS_USER';
const FETCH_FAILED_USER = 'FETCH_FAILED_USER';
const FETCH_USER_SPACES = 'FETCH_USER_SPACES';
const FETCH_SUCCESS_USER_SPACES = 'FETCH_SUCCESS_USER_SPACES';
const FETCH_FAILED_USER_SPACES = 'FETCH_FAILED_USER_SPACES';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_SUCCESS_USER = 'UPDATE_SUCCESS_USER';
const UPDATE_FAILED_USER = 'UPDATE_FAILED_USER';
const PREPARE_UPDATE_USER = 'PREPARE_UPDATE_USER';

export const userActions = createActions(
  FETCH_USER,
  FETCH_SUCCESS_USER,
  FETCH_FAILED_USER,
  FETCH_USER_SPACES,
  FETCH_SUCCESS_USER_SPACES,
  FETCH_FAILED_USER_SPACES,
  UPDATE_USER,
  UPDATE_SUCCESS_USER,
  UPDATE_FAILED_USER,
  PREPARE_UPDATE_USER,
);

// Reducer
const initialState = {
  user: null,
  spaces: [],
  updateSuccess: false,
  updateFailed: false,
  isLoading: false,
};

export const userReducer = handleActions(
  {
    [FETCH_SUCCESS_USER]: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    [FETCH_USER_SPACES]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SUCCESS_USER_SPACES]: (state, action) => ({
      ...state,
      spaces: action.payload,
      isLoading: false,
    }),
    [FETCH_FAILED_USER_SPACES]: state => ({
      ...state,
      isLoading: false,
    }),
    [UPDATE_USER]: state => ({
      ...state,
      updateSuccess: false,
      updateFailed: false,
      isLoading: true,
    }),
    [UPDATE_SUCCESS_USER]: (state, action) => ({
      ...state,
      user: action.payload,
      updateSuccess: true,
      updateFailed: false,
      isLoading: false,
    }),
    [UPDATE_FAILED_USER]: state => ({
      ...state,
      updateSuccess: false,
      updateFailed: true,
      isLoading: false,
    }),
    [PREPARE_UPDATE_USER]: state => ({
      ...state,
      user: {},
      updateSuccess: false,
      updateFailed: false,
      isLoading: false,
    }),
  },
  initialState,
);

//Sagas
export function* getUser({ payload: { userId } }) {
  yield put(apiActions.apiGetRequest({ path: apiEndpoint.users(userId) }));
  const { payload, error, meta } = yield take(apiActions.apiResponse);
  if (error) {
    yield put(userActions.fetchFailedUser(meta));
    return;
  }
  yield put(userActions.fetchSuccessUser(payload));
}

function* getSpaces(params) {
  let targetUserId = '';
  if (params && params.payload && params.payload.userId) {
    targetUserId = params.payload.userId;
  }

  let user = yield select(state => state.auth.user);
  if (!user.ID) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);

  const { data, err } = yield call(getApiRequest, apiEndpoint.userSpaces(targetUserId || user.ID));
  if (err) {
    yield put(userActions.fetchFailedUserSpaces(err));
    return;
  }

  if (Array.isArray(data)) {
    const res = data.map(v => {
      if (v.Images.length === 0) {
        v.Images[0] = { ImageUrl: dummySpaceImage };
      }
      return v;
    });
    yield put(userActions.fetchSuccessUserSpaces(res));
  } else {
    yield put(userActions.fetchFailedUserSpaces(data));
  }
}

function* updateUser({ payload: { userId, body } }) {
  if (body.imageUri instanceof Blob) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(body.imageUri);
    const ext = yield new Promise(resolve => {
      fileReader.onload = () => {
        const imageType = fileType(fileReader.result);
        resolve(imageType.ext);
      };
    });
    const timeStamp = Date.now();
    const imagePath = `/img/users/${userId}/profile/${timeStamp}.${ext}`;
    body.imageUrl = yield uploadImage(imagePath, body.imageUri);
  }
  if (body.email) {
    const user = firebase.auth().currentUser;
    try {
      yield user.updateEmail(body.email);
    } catch (err) {
      console.log(err.message);
      //TODO 再ログインを促す必要あり
      yield put(userActions.updateFailedUser(err.message));
      return;
    }
  }
  yield put(apiActions.apiPutRequest({ path: apiEndpoint.users(userId), body }));
  const { payload, error, meta } = yield take(apiActions.apiResponse);
  if (error) {
    yield put(userActions.updateFailedUser(meta));
    return;
  }
  yield put(authActions.setUser(payload));
  yield put(userActions.updateSuccessUser(payload));
  yield put(uiActions.setUiState({ signupStep: 5 }));
}

export const userSagas = [
  takeEvery(FETCH_USER, getUser),
  takeEvery(UPDATE_USER, updateUser),
  takeEvery(FETCH_USER_SPACES, getSpaces),
];
