import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { getApiRequest, postApiRequest, createRESTConstants } from '../helpers/api';

// Actions
const END_POINTS = {
  TOKEN_GENERATE: 'TOKEN_GENERATE',
  AUTH_PAST: 'AUTH_PAST',
  AUTH_FIREBASE: 'AUTH_FIREBASE',
  USERS: 'USERS',
  SPACES: 'SPACES',
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

function* authPastGet({ payload }) {
  const { data, err } = yield call(() => getApiRequest('/auth/past', { email: payload }));
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

export const apiSagas = [
  takeEvery(API_ACTIONS.AUTH_PAST.GET.REQUEST, authPastGet),
  takeEvery(API_ACTIONS.TOKEN_GENERATE.POST.REQUEST, tokenGeneratePost),
];
