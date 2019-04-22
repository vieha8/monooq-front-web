import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, select, call, race, delay } from 'redux-saga/effects';
import dummySpaceImage from 'images/dummy_space.png';
import { convertImgixUrl } from 'helpers/imgix';
import { push } from 'connected-react-router';
import { uploadImage } from '../helpers/firebase';
import fileType from '../../helpers/file-type';
import { authActions, getToken } from './auth';
import { getApiRequest, putApiRequest, apiEndpoint } from '../helpers/api';
import { errorActions } from './error';
import { store } from '../store/index';
import { isAvailableLocalStorage } from '../../helpers/storage';

const TIMEOUT = 30000;

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

// Sagas
export function* getUser({ payload: { userId } }) {
  const token = yield* getToken();
  const { posts, timeout } = yield race({
    posts: call(getApiRequest, apiEndpoint.users(userId), {}, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'getUser';
  if (timeout) {
    yield put(userActions.fetchFailedUser(`timeout(${functionName}):${apiEndpoint.users(userId)}`));
    yield put(errorActions.setError(`timeout(${functionName}):${apiEndpoint.users(userId)}`));
    return;
  }
  if (posts.err) {
    yield put(userActions.fetchFailedUser(`error(${functionName}):${posts.err}`));
    yield put(errorActions.setError(`error(${functionName}):${posts.err}`));
    return;
  }

  yield put(userActions.fetchSuccessUser(posts.data));
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

  const { posts, timeout } = yield race({
    posts: call(getApiRequest, apiEndpoint.userSpaces(targetUserId || user.ID), {}, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'getSpaces';
  if (timeout) {
    yield put(
      userActions.fetchFailedUserSpaces(
        `timeout(${functionName}):${apiEndpoint.userSpaces(targetUserId || user.ID)}`,
      ),
    );
    yield put(
      errorActions.setError(
        `timeout(${functionName}):${apiEndpoint.userSpaces(targetUserId || user.ID)}`,
      ),
    );
    return;
  }
  if (posts.err) {
    yield put(userActions.fetchFailedUserSpaces(`error(${functionName}):${posts.err}`));
    yield put(errorActions.setError(`error(${functionName}):${posts.err}`));
    return;
  }

  if (Array.isArray(posts.data)) {
    const res = posts.data.map(v => {
      if (v.Images.length === 0) {
        v.Images[0] = { ImageUrl: dummySpaceImage };
      } else {
        v.Images = v.Images.map(image => {
          image.ImageUrl = convertImgixUrl(
            image.ImageUrl,
            'fit=fill&fill-color=DBDBDB&w=540&h=290&format=auto',
          );
          return image;
        });
      }
      return v;
    });
    yield put(userActions.fetchSuccessUserSpaces(res));
  } else {
    yield put(userActions.fetchFailedUserSpaces(posts.data));
    yield put(errorActions.setError(posts.err));
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

  const { posts, timeout } = yield race({
    posts: call(putApiRequest, apiEndpoint.users(userId), body, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'updateUser';
  if (timeout) {
    yield put(
      userActions.updateFailedUser(`timeout(${functionName}):${apiEndpoint.users(userId)}`),
    );
    yield put(errorActions.setError(`timeout(${functionName}):${apiEndpoint.users(userId)}`));
    return;
  }
  if (posts.err) {
    yield put(userActions.updateFailedUser(`error(${functionName}):${posts.err}`));
    yield put(errorActions.setError(`error(${functionName}):${posts.err}`));
    return;
  }

  if (isAvailableLocalStorage()) {
    localStorage.removeItem('status');
  }
  yield put(authActions.setUser(posts.data));
  yield put(userActions.updateSuccessUser(posts.data));

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
