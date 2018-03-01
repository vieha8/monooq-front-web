import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { getApiRequest, createRESTConstants } from '../helpers/api';

// Actions
const END_POINTS = {
  USERS_OLD: 'USERS_OLD',
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

export const apiReducer = handleActions(
  {
    [API_ACTIONS.USERS_OLD.GET.REQUEST]: state => ({
      ...state,
    }),
  },
  initialState,
);

//Sagas
function* usersOldGet({ payload }) {
  const { data, err } = yield call(() => getApiRequest('/users/old', { email: payload }));
  if (!err) {
    yield put(apiActions.usersOldGetSuccess(data));
  } else {
    yield put(apiActions.usersOldGetFailed(err));
  }
}

export const apiSagas = [takeEvery(API_ACTIONS.USERS_OLD.GET.REQUEST, usersOldGet)];
