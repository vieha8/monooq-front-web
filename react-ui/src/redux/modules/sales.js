import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, call, select } from 'redux-saga/effects';

import { getApiRequest, postApiRequest, apiEndpoint } from '../helpers/api';
import { handleError } from './error';
import { getToken } from './auth';

// Actions
const FETCH_SALES = 'FETCH_SALES';
const FETCH_SALES_SUCCESS = `${FETCH_SALES}_SUCCESS`;
const FETCH_SALES_FAILED = `${FETCH_SALES}_FAILED`;
const SEND_PAYOUTS = 'SEND_PAYOUTS';
const SEND_PAYOUTS_SUCCESS = `${SEND_PAYOUTS}_SUCCESS`;
const SEND_PAYOUTS_FAILED = `${SEND_PAYOUTS}_FAILED`;

export const salesActions = createActions(
  FETCH_SALES,
  FETCH_SALES_SUCCESS,
  FETCH_SALES_FAILED,
  SEND_PAYOUTS,
  SEND_PAYOUTS_SUCCESS,
  SEND_PAYOUTS_FAILED,
);

// Reducer
const initialState = {
  before: 0,
  deposit: 0,
  pending: 0,
  paid: 0,
  isLoading: false,
};

export const salesReducer = handleActions(
  {
    [FETCH_SALES]: state => ({
      ...state,
      isLoading: true,
      isSend: false,
    }),
    [FETCH_SALES_SUCCESS]: (state, action) => ({
      ...state,
      before: action.payload.before,
      deposit: action.payload.deposit,
      pending: action.payload.pending,
      paid: action.payload.paid,
      isLoading: false,
      isSend: false,
    }),
    [FETCH_SALES_FAILED]: state => ({
      ...state,
      isLoading: false,
      isSend: false,
    }),
    [SEND_PAYOUTS]: state => ({
      ...state,
      isLoading: true,
      isSend: false,
    }),
    [SEND_PAYOUTS_SUCCESS]: state => ({
      ...state,
      isLoading: false,
      isSend: true,
    }),
    [SEND_PAYOUTS_FAILED]: state => ({
      ...state,
      isLoading: false,
      isSend: false,
    }),
  },
  initialState,
);

// Sagas
function* getSales() {
  const token = yield* getToken();
  const { data, err } = yield call(getApiRequest, apiEndpoint.sales(), {}, token);

  if (err) {
    yield handleError(salesActions.fetchSalesFailed, '', 'getSales', err, false);
    return;
  }

  yield put(salesActions.fetchSalesSuccess({ ...data }));
}

function* sendPayouts({
  payload: { bankName, branchName, accountType, accountNumber, accountName },
}) {
  const user = yield select(state => state.auth.user);
  if (!user.id) {
    yield handleError(
      salesActions.sendPayoutsFailed,
      '',
      'sendPayouts',
      'Not Authentication',
      false,
    );
    return;
  }

  const token = yield* getToken();
  const type = accountType === '1' ? '普通' : '当座';
  const params = { bankName, branchName, accountType: type, accountNumber, accountName };
  const { err } = yield call(postApiRequest, apiEndpoint.sales(), params, token);

  if (err) {
    yield handleError(salesActions.sendPayoutsFailed, '', 'sendPayouts', err, false);
    return;
  }

  yield put(salesActions.sendPayoutsSuccess());
}

export const salesSagas = [takeEvery(FETCH_SALES, getSales), takeEvery(SEND_PAYOUTS, sendPayouts)];
