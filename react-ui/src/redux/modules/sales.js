import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, call, select, race, delay } from 'redux-saga/effects';

import { getApiRequest, postApiRequest, apiEndpoint } from '../helpers/api';
import { errorActions } from './error';
import { getToken } from './auth';

const TIMEOUT = 30000;

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
  sales: 0,
  payout: 0,
  deposit: 0,
  isLoading: false,
};

export const salesReducer = handleActions(
  {
    [FETCH_SALES]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SALES_SUCCESS]: (state, action) => ({
      ...state,
      sales: action.payload.sales,
      payout: action.payload.payout,
      deposit: action.payload.deposit,
      isLoading: false,
    }),
    [FETCH_SALES_FAILED]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

// Sagas
function* getSales() {
  const token = yield* getToken();
  const { posts: response, timeout } = yield race({
    posts: call(getApiRequest, apiEndpoint.sales(), {}, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'getSales';
  if (timeout) {
    yield put(salesActions.fetchSalesFailed(`timeout(${functionName}):${apiEndpoint.sales()}`));
    yield put(errorActions.setError(`timeout(${functionName}):${apiEndpoint.sales()}`));
    return;
  }
  if (response.err) {
    yield put(salesActions.fetchSalesFailed(`error(${functionName}):${response.err}`));
    yield put(errorActions.setError(`error(${functionName}):${response.err}`));
    return;
  }

  let sales = 0;
  let payout = 0;
  let deposit = 0;

  response.data.map(v => {
    const startDate = v.Request.StartDate;
    const startTime = Date.parse(startDate);
    if (Date.now() > startTime) {
      sales += v.Price;
      payout += v.PriceMinusFee;
    } else {
      deposit += v.Price;
    }
    return 1;
  });

  yield put(salesActions.fetchSalesSuccess({ sales, payout, deposit }));
}

function* sendPayouts({
  payload: { bankName, branchName, accountType, accountNumber, accountName },
}) {
  const user = yield select(state => state.auth.user);
  if (!user.ID) {
    const err = 'Not Authentication';
    yield put(salesActions.sendPayoutsFailed(err));
    yield put(errorActions.setError(err));
    return;
  }

  const token = yield* getToken();
  const type = accountType === 1 ? '普通' : '当座';
  const params = { bankName, branchName, accountType: type, accountNumber, accountName };
  const { posts: payload, timeout } = yield race({
    posts: call(postApiRequest, apiEndpoint.sales(), params, token),
    timeout: delay(TIMEOUT),
  });

  const functionName = 'sendPayouts';
  if (timeout) {
    yield put(salesActions.sendPayoutsFailed(`timeout(${functionName}):${apiEndpoint.sales()}`));
    yield put(errorActions.setError(`timeout(${functionName}):${apiEndpoint.sales()}`));
    return;
  }
  if (payload.err) {
    yield put(salesActions.sendPayoutsFailed(`error(${functionName}):${payload.err}`));
    yield put(errorActions.setError(`error(${functionName}):${payload.err}`));
    return;
  }

  yield put(salesActions.sendPayoutsSuccess());
}

export const salesSagas = [takeEvery(FETCH_SALES, getSales), takeEvery(SEND_PAYOUTS, sendPayouts)];
