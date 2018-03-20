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
  USER: 'USER',
  USER_SPACES: 'USER_SPACES',
  USER_BANK: 'USER_BANK',
  SPACES: 'SPACES',
  SPACE: 'SPACE',
  SPACE_IMAGE: 'SPACE_IMAGE',
  REQUEST: 'REQUEST',
  REQUEST_USER: 'REQUEST_USER',
  REQUEST_SPACE: 'REQUEST_SPACE',
  REQUEST_HOST: 'REQUEST_HOST',
  PAYMENT: 'PAYMENT',
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
// console.log(apiActions);

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

function* authPastPost({ payload: { body } }) {
  const { data, err } = yield call(() => postApiRequest('/auth/past', body));
  if (!err) {
    yield put(apiActions.authPastPostSuccess(data));
  } else {
    yield put(apiActions.authPastPostFailed(err));
  }
}

function* authFirebasePut({ payload: { body } }) {
  const { data, err } = yield call(() => putApiRequest('/auth/firebase', body));
  if (!err) {
    yield put(apiActions.authFirebasePutSuccess(data));
  } else {
    yield put(apiActions.authFirebasePutFailed(err));
  }
}

function* authFirebaseGet({ payload: { id } }) {
  const { data, err } = yield call(() => getApiRequest(`/auth/firebase/${id}`));
  if (!err) {
    yield put(apiActions.authFirebaseGetSuccess(data));
  } else {
    yield put(apiActions.authFirebaseGetFailed(err));
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

function* userPost({ payload: { body } }) {
  const { data, err } = yield call(() => postApiRequest('/users', body));
  if (!err) {
    yield put(apiActions.userPostSuccess(data));
  } else {
    yield put(apiActions.userPostFailed(err));
  }
}

function* userGet({ payload: { id } }) {
  const { data, err } = yield call(() => getApiRequest(`/users/${id}`));
  if (!err) {
    yield put(apiActions.userGetSuccess(data));
  } else {
    yield put(apiActions.userGetFailed(err));
  }
}

function* userPut({ payload: { id, body } }) {
  const { data, err } = yield call(() => putApiRequest(`/users/${id}`, body));
  if (!err) {
    yield put(apiActions.userPutSuccess(data));
  } else {
    yield put(apiActions.userPutFailed(err));
  }
}

function* userDelete({ payload: { id } }) {
  const { data, err } = yield call(() => deleteApiRequest(`/users/${id}`));
  if (!err) {
    yield put(apiActions.userDeleteSuccess(data));
  } else {
    yield put(apiActions.userDeleteFailed(err));
  }
}

function* userBankPut({ payload: { id, body } }) {
  const { data, err } = yield call(() => putApiRequest(`/users/${id}`, body));
  if (!err) {
    yield put(apiActions.userBankPutSuccess(data));
  } else {
    yield put(apiActions.userBankPutFailed(err));
  }
}

function* userSpacesGet({ payload: { id } }) {
  const { data, err } = yield call(() => getApiRequest(`/users/${id}/spaces`));
  if (!err) {
    yield put(apiActions.userSpacesGetSuccess(data));
  } else {
    yield put(apiActions.userSpacesGetFailed(err));
  }
}

function* spacesGet() {
  const { data, err } = yield call(() => getApiRequest(`/spaces`));
  if (!err) {
    yield put(apiActions.spacesGetSuccess(data));
  } else {
    yield put(apiActions.spacesGetFailed(err));
  }
}

function* spacePost({ payload: { body } }) {
  const { data, err } = yield call(() => postApiRequest('/spaces', body));
  if (!err) {
    yield put(apiActions.spacePostSuccess(data));
  } else {
    yield put(apiActions.spacePostFailed(err));
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

function* spaceImagePost({ payload: { id, body } }) {
  const { data, err } = yield call(() => postApiRequest(`/spaces/${id}/image`, body));
  if (!err) {
    yield put(apiActions.spacesPostSuccess(data));
  } else {
    yield put(apiActions.spacesPostFailed(err));
  }
}

function* spaceImageDelete({ payload: { spaceId, imageId } }) {
  const { data, err } = yield call(() => deleteApiRequest(`/spaces/${spaceId}/image/${imageId}`));
  if (!err) {
    yield put(apiActions.spacesPostSuccess(data));
  } else {
    yield put(apiActions.spacesPostFailed(err));
  }
}

function* requestPost({ payload: { body } }) {
  const { data, err } = yield call(() => postApiRequest('/requests', body));
  if (!err) {
    yield put(apiActions.requestPostSuccess(data));
  } else {
    yield put(apiActions.requestPostFailed(err));
  }
}

function* requestGet({ payload: { id } }) {
  const { data, err } = yield call(() => getApiRequest(`/requests/${id}`));
  if (!err) {
    yield put(apiActions.requestGetSuccess(data));
  } else {
    yield put(apiActions.requestGetFailed(err));
  }
}

function* requestPut({ payload: { id, body } }) {
  const { data, err } = yield call(() => putApiRequest(`/requests/${id}`, body));
  if (!err) {
    yield put(apiActions.requestPutSuccess(data));
  } else {
    yield put(apiActions.requestPutFailed(err));
  }
}

function* requestDelete({ payload: { id } }) {
  const { data, err } = yield call(() => deleteApiRequest(`/requests/${id}`));
  if (!err) {
    yield put(apiActions.requestDeleteSuccess(data));
  } else {
    yield put(apiActions.requestDeleteFailed(err));
  }
}

function* requestUserGet({ payload: { id } }) {
  const { data, err } = yield call(() => getApiRequest(`/requests/user/${id}`));
  if (!err) {
    yield put(apiActions.requestUserGetSuccess(data));
  } else {
    yield put(apiActions.requestUserGetFailed(err));
  }
}

function* requestSpaceGet({ payload: { id } }) {
  const { data, err } = yield call(() => getApiRequest(`/requests/space/${id}`));
  if (!err) {
    yield put(apiActions.requestSpaceGetSuccess(data));
  } else {
    yield put(apiActions.requestSpaceGetFailed(err));
  }
}

function* requestHostGet({ payload: { id } }) {
  const { data, err } = yield call(() => getApiRequest(`/requests/host/${id}`));
  if (!err) {
    yield put(apiActions.requestHostGetSuccess(data));
  } else {
    yield put(apiActions.requestHostGetFailed(err));
  }
}

function* paymentPost({ payload: { body } }) {
  const { data, err } = yield call(() => postApiRequest('/payments', body));
  if (!err) {
    yield put(apiActions.paymentPostSuccess(data));
  } else {
    yield put(apiActions.paymentPostFailed(err));
  }
}

function* paymentGet({ payload: { id } }) {
  const { data, err } = yield call(() => getApiRequest(`/payments/${id}`));
  if (!err) {
    yield put(apiActions.paymentGetSuccess(data));
  } else {
    yield put(apiActions.paymentGetFailed(err));
  }
}

function* paymentPut({ payload: { id, body } }) {
  const { data, err } = yield call(() => putApiRequest(`/payments/${id}`, body));
  if (!err) {
    yield put(apiActions.paymentPutSuccess(data));
  } else {
    yield put(apiActions.paymentPutFailed(err));
  }
}

function* paymentDelete({ payload: { id } }) {
  const { data, err } = yield call(() => deleteApiRequest(`/payments/${id}`));
  if (!err) {
    yield put(apiActions.paymentDeleteSuccess(data));
  } else {
    yield put(apiActions.paymentDeleteFailed(err));
  }
}

export const apiSagas = [
  takeEvery(API_ACTIONS.AUTH_PAST.GET.REQUEST, authPastGet),
  takeEvery(API_ACTIONS.AUTH_PAST.POST.REQUEST, authPastPost),
  takeEvery(API_ACTIONS.AUTH_FIREBASE.PUT.REQUEST, authFirebasePut),
  takeEvery(API_ACTIONS.AUTH_FIREBASE.GET.REQUEST, authFirebaseGet),
  takeEvery(API_ACTIONS.TOKEN_GENERATE.POST.REQUEST, tokenGeneratePost),
  takeEvery(API_ACTIONS.USER.POST.REQUEST, userPost),
  takeEvery(API_ACTIONS.USER.GET.REQUEST, userGet),
  takeEvery(API_ACTIONS.USER.PUT.REQUEST, userPut),
  takeEvery(API_ACTIONS.USER.DELETE.REQUEST, userDelete),
  takeEvery(API_ACTIONS.USER_BANK.PUT.REQUEST, userBankPut),
  takeEvery(API_ACTIONS.USER_SPACES.GET.REQUEST, userSpacesGet),
  takeEvery(API_ACTIONS.SPACES.GET.REQUEST, spacesGet),
  takeEvery(API_ACTIONS.SPACE.POST.REQUEST, spacePost),
  takeEvery(API_ACTIONS.SPACE.GET.REQUEST, spaceGet),
  takeEvery(API_ACTIONS.SPACE.PUT.REQUEST, spacePut),
  takeEvery(API_ACTIONS.SPACE.DELETE.REQUEST, spaceDelete),
  takeEvery(API_ACTIONS.SPACE_IMAGE.POST.REQUEST, spaceImagePost),
  takeEvery(API_ACTIONS.SPACE_IMAGE.DELETE.REQUEST, spaceImageDelete),
  takeEvery(API_ACTIONS.REQUEST.POST.REQUEST, requestPost),
  takeEvery(API_ACTIONS.REQUEST.GET.REQUEST, requestGet),
  takeEvery(API_ACTIONS.REQUEST.PUT.REQUEST, requestPut),
  takeEvery(API_ACTIONS.REQUEST.DELETE.REQUEST, requestDelete),
  takeEvery(API_ACTIONS.REQUEST_USER.GET.REQUEST, requestUserGet),
  takeEvery(API_ACTIONS.REQUEST_SPACE.GET.REQUEST, requestSpaceGet),
  takeEvery(API_ACTIONS.REQUEST_HOST.GET.REQUEST, requestHostGet),
  takeEvery(API_ACTIONS.PAYMENT.POST.REQUEST, paymentPost),
  takeEvery(API_ACTIONS.PAYMENT.GET.REQUEST, paymentGet),
  takeEvery(API_ACTIONS.PAYMENT.PUT.REQUEST, paymentPut),
  takeEvery(API_ACTIONS.PAYMENT.DELETE.REQUEST, paymentDelete),
];
