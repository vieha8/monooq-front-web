import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, select } from 'redux-saga/effects';
import firebase from 'firebase';
import { apiActions } from './api';
import { uiActions } from './ui';
import { uploadImage } from '../helpers/firebase';
import fileType from '../../helpers/file-type';
import { authActions } from './auth';

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
);

// Reducer
const initialState = {
  user: null,
  spaces: [],
};

export const userReducer = handleActions(
  {
    [FETCH_SUCCESS_USER]: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    [FETCH_SUCCESS_USER_SPACES]: (state, action) => ({
      ...state,
      spaces: action.payload,
    }),
  },
  initialState,
);

//Sagas
function* getUser({ payload: { userId } }) {
  yield put(apiActions.userGet({ id: userId }));
  const { payload } = yield take(apiActions.userGetSuccess);
  yield put(userActions.fetchSuccessUser(payload));
}

function* getSpaces({ payload: { userId } }) {
  if (!userId) {
    let user = yield select(state => state.auth.user);
    if (!user.ID) {
      yield take(authActions.checkLoginEnd);
    }
    user = yield select(state => state.auth.user);
    userId = user.ID;
  }
  yield put(apiActions.userSpacesGet({ id: userId }));
  const { payload } = yield take(apiActions.userSpacesGetSuccess);
  yield put(userActions.fetchSuccessUserSpaces(payload));
}

function* updateUser({ payload: { userId, body } }) {
  if (body.image) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(body.image);
    const ext = yield new Promise(resolve => {
      fileReader.onload = () => {
        const imageType = fileType(fileReader.result);
        resolve(imageType.ext);
      };
    });
    const timeStamp = Date.now();
    const imagePath = `/img/users/${userId}/profile/${timeStamp}.${ext}`;
    body.imageUrl = yield uploadImage(imagePath, body.image);
  }
  if (body.email) {
    const user = firebase.auth().currentUser;
    try {
      yield user.updateEmail(body.email);
    } catch (err) {
      console.log(err.message);
      yield put(userActions.updateFailedUser(err.message));
      return;
    }
  }
  yield put(apiActions.userPut({ id: userId, body: body }));
  const { payload } = yield take(apiActions.userPutSuccess);
  yield put(userActions.updateSuccessUser(payload));
  yield put(uiActions.setUiState({ signUpStep: 5 }));
}

export const userSagas = [
  takeEvery(FETCH_USER, getUser),
  takeEvery(UPDATE_USER, updateUser),
  takeEvery(FETCH_USER_SPACES, getSpaces),
];
