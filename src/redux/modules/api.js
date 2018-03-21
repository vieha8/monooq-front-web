import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import { getApiRequest, postApiRequest, putApiRequest, deleteApiRequest } from '../helpers/api';

export const apiEndpoint = {
  tokenGenerate: () => `/token/generate`,
  authPast: () => `/auth/past`,
  authFirebase: id => (id ? `/auth/firebase/${id}` : `/auth/firebase`),
  users: id => (id ? `/users/${id}` : `/users`),
  userSpaces: id => `/users/${id}/spaces`,
  spaces: id => (id ? `/spaces/${id}` : `/spaces`),
  spaceImage: (spaceId, imageId) =>
    imageId ? `/spaces/${spaceId}/image/${imageId}` : `/spaces/${spaceId}/image`,
  requests: id => (id ? `/requests/${id}` : `/requests`),
  requestsByUserId: id => `/requests/user/${id}`,
  requestsByHostUserId: id => `/requests/host/${id}`,
  payments: id => (id ? `/payments/${id}` : `/payments`),
};

const ACTIONS = {
  GET: 'API_GET_REQUEST',
  POST: 'API_POST_REQUEST',
  PUT: 'API_PUT_REQUEST',
  DELETE: 'API_DELETE_REQUEST',
  RESPONSE: 'API_RESPONSE',
};

export const apiActions = createActions(...Object.values(ACTIONS));

const initialState = {
  path: null,
  request: null,
  response: null,
  status: null,
  error: null,
};

const requestReducer = {
  next: (state, { payload }) => ({
    path: payload.path,
    request: payload.params,
    error: null,
    response: null,
  }),
};

const responseReducer = {
  next: (state, { payload }) => {
    return {
      ...state,
      response: payload,
    };
  },
  throw: (state, action) => {
    console.error(action);
    return {
      ...state,
      error: action.meta,
    };
  },
};

export const apiReducer = handleActions(
  {
    [ACTIONS.GET]: requestReducer,
    [ACTIONS.POST]: requestReducer,
    [ACTIONS.PUT]: requestReducer,
    [ACTIONS.DELETE]: requestReducer,
    [ACTIONS.RESPONSE]: responseReducer,
  },
  initialState,
);

function* getRequest({ payload: { path, params = {} } }) {
  const { data, err } = yield getApiRequest(path, params);
  yield put({ ...apiActions.apiResponse(data), error: !!err, meta: err });
}

function* postRequest({ payload: { path, body } }) {
  const { data, err } = yield postApiRequest(path, body);
  yield put({ ...apiActions.apiResponse(data), error: !!err, meta: err });
}

function* putRequest({ payload: { path, body } }) {
  const { data, err } = yield putApiRequest(path, body);
  yield put({ ...apiActions.apiResponse(data), error: !!err, meta: err });
}

function* deleteRequest({ payload: { path } }) {
  const { data, err } = yield deleteApiRequest(path);
  yield put({ ...apiActions.apiResponse(data), error: !!err, meta: err });
}

export const apiSagas = [
  takeEvery(ACTIONS.GET, getRequest),
  takeEvery(ACTIONS.POST, postRequest),
  takeEvery(ACTIONS.PUT, putRequest),
  takeEvery(ACTIONS.DELETE, deleteRequest),
];
