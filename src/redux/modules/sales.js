import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, call, select, take } from 'redux-saga/effects';

import { apiEndpoint } from './api';
import { getApiRequest, postApiRequest } from '../helpers/api';
import { errorActions } from './error';
import { authActions } from './auth';

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
  const { data, err } = yield call(getApiRequest, apiEndpoint.sales());
  if (err) {
    yield put(salesActions.fetchSalesFailed(err));
    yield put(errorActions.setError(err));
    return;
  }
  yield put(salesActions.fetchSalesSuccess(data));
}

const sendMailToAdmin = (
  userId,
  bankName,
  branchName,
  accountType,
  accountNumber,
  accountName,
  payouts,
) =>
  new Promise(resolve => {
    // 運営への通知
    let message = `ユーザーID: ${userId}\n`;
    message += `金融機関名: ${bankName}\n`;
    message += `支店名: ${branchName}\n`;
    message += `預金種類: ${accountType}\n`;
    message += `口座番号: ${accountNumber}\n`;
    message += `口座名義: ${accountName}\n`;
    message += `振込金額: ${payouts}円\n`;

    const body = {
      Subject: `新規振込申請 ユーザーID:${userId}`,
      Address: 'm-kudo@monooq.com',
      Body: message,
    };

    postApiRequest(apiEndpoint.sendMail(), body);
    resolve();
  });

const sendMailToUser = (
  userId,
  userName,
  email,
  bankName,
  branchName,
  accountType,
  accountNumber,
  accountName,
  payouts,
) =>
  new Promise(resolve => {
    // ユーザーへの通知
    let message = `${userName}様\n\n`;
    message += `この度はモノオクのご利用ありがとうございます。\n下記にて申請振込を受付致しました。\n\n`;
    message += `振込金額: ${payouts}円\n\n`;
    message += `取引(お預かり)の開始と口座情報が確認でき次第、5営業日以内にお振込させていただきます。\n\n`;
    message += `*営業日は土・日・祝、年末年始(12/30〜1/3)以外の平日となります。\n`;
    message += `*口座情報に誤りがある場合、確認にお時間をいただきますのでご了承下さい。\n\n`;
    message += `引き続き、モノオクをよろしくお願い致します。`;

    const body = {
      Subject: `振込申請が完了しました`,
      Address: email,
      Body: message,
    };

    postApiRequest(apiEndpoint.sendMail(), body);
    resolve();
  });

function* sendPayouts({
  payload: { userId, bankName, branchName, accountType, accountNumber, accountName, payouts },
}) {
  let user = yield select(state => state.auth.user);
  if (!user.ID) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);

  yield call(
    sendMailToAdmin,
    userId,
    bankName,
    branchName,
    accountType,
    accountNumber,
    accountName,
    payouts,
  );
  yield call(
    sendMailToUser,
    userId,
    user.Name,
    user.Email,
    bankName,
    branchName,
    accountType,
    accountNumber,
    accountName,
    payouts,
  );
}

export const salesSagas = [takeEvery(FETCH_SALES, getSales), takeEvery(SEND_PAYOUTS, sendPayouts)];
