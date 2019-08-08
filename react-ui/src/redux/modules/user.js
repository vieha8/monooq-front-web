import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, select, call } from 'redux-saga/effects';
import dummySpaceImage from 'images/dummy_space.png';
import { convertImgixUrl } from 'helpers/imgix';
import { handleGTM } from 'helpers/gtm';
import { push } from 'connected-react-router';
import Path from 'config/path';
import { ErrorMessages } from 'variables';
import { uploadImage } from '../helpers/firebase';
import fileType from '../../helpers/file-type';
import { authActions, getToken } from './auth';
import { getApiRequest, putApiRequest, apiEndpoint } from '../helpers/api';
import { handleError } from './error';
import { isAvailableLocalStorage } from '../../helpers/storage';

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
    [UPDATE_FAILED_USER]: (state, action) => ({
      ...state,
      updateSuccess: false,
      updateFailed: true,
      isLoading: false,
      errMessage: action.payload,
    }),
    [PREPARE_UPDATE_USER]: state => ({
      ...state,
      user: {},
      updateSuccess: false,
      updateFailed: false,
      isLoading: false,
      errMessage: '',
    }),
  },
  initialState,
);

// Sagas
export function* getUser({ payload: { userId } }) {
  const token = yield* getToken();
  const { data, err } = yield call(getApiRequest, apiEndpoint.users(userId), {}, token);

  if (err) {
    yield handleError(userActions.fetchFailedUser, '', 'getUser', err, false);
    return;
  }

  yield put(userActions.fetchSuccessUser(data));
}

function* getSpaces(params) {
  let targetUserId = '';
  let user = '';
  const functionName = 'getSpaces';
  if (params && params.payload && params.payload.userId) {
    targetUserId = params.payload.userId;
  } else {
    user = yield select(state => state.auth.user);
    if (!user.id) {
      yield handleError(
        userActions.fetchFailedUserSpaces,
        '',
        functionName,
        'Undefined userId.',
        false,
      );
      return;
    }
  }

  const token = yield* getToken();
  const { data, status, err } = yield call(
    getApiRequest,
    apiEndpoint.userSpaces(targetUserId || user.id),
    {},
    token,
  );

  if (err) {
    if (status === 404) {
      yield put(push(Path.pageNotFound()));
    } else {
      yield handleError(userActions.fetchFailedUserSpaces, '', functionName, err, false);
    }
    return;
  }

  if (Array.isArray(data)) {
    const res = data.map(v => {
      if (v.images.length === 0) {
        v.images[0] = { imageUrl: dummySpaceImage };
      } else {
        v.images = v.images.map(image => {
          image.imageUrl = convertImgixUrl(
            image.imageUrl,
            'fit=fill&fill-color=DBDBDB&w=540&h=290&auto=format',
          );
          return image;
        });
      }
      return v;
    });
    yield put(userActions.fetchSuccessUserSpaces(res));
  } else {
    yield handleError(
      userActions.fetchFailedUserSpaces,
      '',
      functionName,
      'data is not Array.',
      false,
    );
  }
}

function* updateUser({ payload: { userId, body } }) {
  const user = yield select(state => state.auth.user);
  if (user.name === '' && body.name !== '') {
    handleGTM('userRegistered', user.id);
  }

  if (body.imageUrl instanceof Blob) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(body.imageUrl);
    const ext = yield new Promise(resolve => {
      fileReader.onload = () => {
        const imageType = fileType(fileReader.result);
        resolve(imageType.ext);
      };
    });
    const timeStamp = Date.now();
    const imagePath = `/img/users/${userId}/profile/${timeStamp}.${ext}`;
    body.imageUrl = yield uploadImage(imagePath, body.imageUrl);
  }
  const token = yield* getToken();
  const { data, err } = yield call(putApiRequest, apiEndpoint.users(userId), body, token);

  if (err) {
    let errMessage = '';
    let isOnlyAction = false;
    if (err === 'googleapi: Error 400: EMAIL_EXISTS, invalid') {
      errMessage = ErrorMessages.FailedSignUpMailExist;
      isOnlyAction = true;
    }
    yield handleError(userActions.updateFailedUser, errMessage, 'updateUser', err, isOnlyAction);
    return;
  }

  if (isAvailableLocalStorage()) {
    localStorage.removeItem('status');
  }
  yield put(authActions.setUser(data));
  yield put(userActions.updateSuccessUser(data));

  const redirectPath = yield select(state => state.ui.redirectPath);
  if (redirectPath) {
    yield put(push(redirectPath));
  }
}

export const userSagas = [
  takeEvery(FETCH_USER, getUser),
  takeEvery(UPDATE_USER, updateUser),
  takeEvery(FETCH_USER_SPACES, getSpaces),
];
