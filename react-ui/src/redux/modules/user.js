import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, select, call } from 'redux-saga/effects';
import dummySpaceImage from 'images/dummy_space.png';
import { convertImgixUrl } from 'helpers/imgix';
import { push } from 'connected-react-router';
import ErrorMessage from 'strings';
import { uploadImage } from '../helpers/firebase';
import fileType from '../../helpers/file-type';
import { authActions, getToken } from './auth';
import { getApiRequest, putApiRequest, apiEndpoint } from '../helpers/api';
import { errorActions, handleError } from './error';
import { store } from '../store/index';
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
    yield* handleError(userActions.fetchFailedUser, 'getUser', err);
    return;
  }

  yield put(userActions.fetchSuccessUser(data));
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

  const token = yield* getToken();
  const { data, err } = yield call(
    getApiRequest,
    apiEndpoint.userSpaces(targetUserId || user.ID),
    {},
    token,
  );

  if (err) {
    yield* handleError(userActions.fetchFailedUserSpaces, 'getSpaces', err);
    return;
  }

  if (Array.isArray(data)) {
    const res = data.map(v => {
      if (v.Images.length === 0) {
        v.Images[0] = { ImageUrl: dummySpaceImage };
      } else {
        v.Images = v.Images.map(image => {
          image.ImageUrl = convertImgixUrl(
            image.ImageUrl,
            'fit=fill&fill-color=DBDBDB&w=540&h=290&auto=format',
          );
          return image;
        });
      }
      return v;
    });
    yield put(userActions.fetchSuccessUserSpaces(res));
  } else {
    yield put(userActions.fetchFailedUserSpaces(data));
    yield put(errorActions.setError(err));
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
  const token = yield* getToken();
  const { data, err } = yield call(putApiRequest, apiEndpoint.users(userId), body, token);

  if (err) {
    let errMessage = '';
    let isOnlyAction = false;
    if (err === 'googleapi: Error 400: EMAIL_EXISTS, invalid') {
      errMessage = ErrorMessage.FailedSignUpMailExist;
      isOnlyAction = true;
    }
    yield* handleError(userActions.updateFailedUser, errMessage, 'updateUser', err, isOnlyAction);
    return;
  }

  if (isAvailableLocalStorage()) {
    localStorage.removeItem('status');
  }
  yield put(authActions.setUser(data));
  yield put(userActions.updateSuccessUser(data));

  const redirectPath = yield select(state => state.ui.redirectPath);
  if (redirectPath) {
    store.dispatch(push(redirectPath));
  }
}

export const userSagas = [
  takeEvery(FETCH_USER, getUser),
  takeEvery(UPDATE_USER, updateUser),
  takeEvery(FETCH_USER_SPACES, getSpaces),
];
