import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  getApiRequest,
  postApiRequest,
  putApiRequest,
  deleteApiRequest,
  createRESTConstants,
} from '../helpers/api';

// Actions
const END_POINTS = {
  TOKEN_GENERATE: 'TOKEN_GENERATE',
  AUTH_PAST: 'AUTH_PAST',
  AUTH_FIREBASE: 'AUTH_FIREBASE',
  USERS: 'USERS',
  SPACES: 'SPACES',
  SPACE: 'SPACE',
  SPACES_IMAGE: 'SPACES_IMAGE',
  REQUESTS: 'REQUESTS',
  PAYMENTS: 'PAYMENTS',
};

export const API_ACTIONS = {};
for (let key in END_POINTS) {
  API_ACTIONS[key] = createRESTConstants(END_POINTS[key]);
}

const actionsArr = () => {
  const res = [];
  for (let i in API_ACTIONS) {
    for (let j in API_ACTIONS[i]) {
      for (let k in API_ACTIONS[i][j]) {
        res.push(API_ACTIONS[i][j][k]);
      }
    }
  }
  return res;
};

export const apiActions = createActions(...actionsArr());

const initialState = {};

export const apiReducer = handleActions({}, initialState);

//Sagas

function* authPastGet({ payload: { query } }) {
  const { data, err } = yield call(() => getApiRequest('/auth/past', query));
  if (!err) {
    yield put(apiActions.authPastGetSuccess(data));
  } else {
    yield put(apiActions.authPastGetFailed(err));
  }
}

function* tokenGeneratePost() {
  const { data, err } = yield call(() => postApiRequest('/token/generate'));
  if (!err) {
    const obj = JSON.stringify(data);
    localStorage.setItem('token', obj);
    yield put(apiActions.tokenGeneratePostSuccess(data));
  } else {
    yield put(apiActions.tokenGeneratePostFailed(err));
  }
}

function* spacesPost({ payload: { body } }) {
  const { data, err } = yield call(() => postApiRequest('/spaces', body));
  if (!err) {
    yield put(apiActions.spacesPostSuccess(data));
  } else {
    yield put(apiActions.spacesPostFailed(err));
  }
}

function* spaceGet({ payload: { id } }) {
  const { data, err } = yield call(() => getApiRequest(`/spaces/${id}`));
  if (!err) {
    yield put(apiActions.spaceGetSuccess(data));
  } else {
    yield put(apiActions.spaceGetFailed(err));
  }
}

function* spacePut({ payload: { id, body } }) {
  const { data, err } = yield call(() => putApiRequest(`/spaces/${id}`, body));
  if (!err) {
    yield put(apiActions.spacePutSuccess(data));
  } else {
    yield put(apiActions.spacePutFailed(err));
  }
}

function* spaceDelete({ payload: { id } }) {
  const { data, err } = yield call(() => deleteApiRequest(`/spaces/${id}`));
  if (!err) {
    yield put(apiActions.spaceDeleteSuccess(data));
  } else {
    yield put(apiActions.spaceDeleteFailed(err));
  }
}

export const apiSagas = [
  takeEvery(API_ACTIONS.AUTH_PAST.GET.REQUEST, authPastGet),
  takeEvery(API_ACTIONS.TOKEN_GENERATE.POST.REQUEST, tokenGeneratePost),
  takeEvery(API_ACTIONS.SPACES.POST.REQUEST, spacesPost),
  takeEvery(API_ACTIONS.SPACE.GET.REQUEST, spaceGet),
  takeEvery(API_ACTIONS.SPACE.PUT.REQUEST, spacePut),
  takeEvery(API_ACTIONS.SPACE.DELETE.REQUEST, spaceDelete),
];
