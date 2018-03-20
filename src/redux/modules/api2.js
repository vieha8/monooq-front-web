import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { getApiRequest, postApiRequest, putApiRequest, deleteApiRequest } from '../helpers/api';

export const apiEndpoint = {
  authFirebase: id => (id ? `/auth/firebase/${id}` : `/auth/firebase`),
};

const ACTIONS = {
  GET: 'API_GET_REQUEST',
  POST: 'API_POST_REQUEST',
  PUT: 'API_PUT_REQUEST',
  DELETE: 'API_DELETE_REQUEST',
  RESPONSE: 'API_RESPONSE',
};

export const apiActions2 = createActions(...Object.values(ACTIONS));

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
    return {
      ...state,
      error: action.meta,
    };
  },
};

export const apiReducer2 = handleActions(
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
  yield put({ ...apiActions2.apiResponse(data), error: !!err, meta: err });
}

export const apiSagas2 = [takeEvery(ACTIONS.GET, getRequest)];
