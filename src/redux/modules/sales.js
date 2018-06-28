import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, call } from 'redux-saga/effects';

import { apiEndpoint } from './api';
import { getApiRequest, postApiRequest } from '../helpers/api';

// Actions
const FETCH_SALES = 'FETCH_SALES';
const FETCH_SALES_SUCCESS = `${FETCH_SALES}_SUCCESS`;
const FETCH_SALES_FAILED = `${FETCH_SALES}_FAILED`;
const SEND_PAYOUTS = 'SEND_PAYOUTS';

export const salesActions = createActions(
  FETCH_SALES,
  FETCH_SALES_SUCCESS,
  FETCH_SALES_FAILED,
  SEND_PAYOUTS,
);

// Reducer
const initialState = {
  sales: [],
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
      sales: action.payload,
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
  // TODO ユーザーとトークンが紐付けられてるか確認した方が良い
  const { data } = yield call(getApiRequest, apiEndpoint.sales());
  yield put(salesActions.fetchSalesSuccess(data));
  // TODO エラーハンドリング
}

function* sendPayouts({
  payload: { userId, bankName, branchName, accountType, accountNumber, accountName },
}) {
  let message = `ユーザーID: ${userId}\n`;
  message += `金融機関名: ${bankName}\n`;
  message += `支店名: ${branchName}\n`;
  message += `預金種類: ${accountType}\n`;
  message += `口座番号: ${accountNumber}\n`;
  message += `口座名義: ${accountName}\n`;

  const body = {
    Subject: `新規振込申請 ユーザーID:${userId}`,
    Address: 'info@monooq.com',
    Body: message,
  };

  yield call(postApiRequest, apiEndpoint.sendMail(), body);
}

export const salesSagas = [takeEvery(FETCH_SALES, getSales), takeEvery(SEND_PAYOUTS, sendPayouts)];
