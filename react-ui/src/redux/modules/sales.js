import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, call, select, take } from 'redux-saga/effects';

import { getApiRequest, postApiRequest, apiEndpoint } from '../helpers/api';
import { errorActions } from './error';
import { authActions, getToken } from './auth';

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
  const { data, err } = yield call(getApiRequest, apiEndpoint.sales(), {}, token);
  if (err) {
    yield put(salesActions.fetchSalesFailed(err));
    yield put(errorActions.setError(err));
    return;
  }

  let sales = 0;
  let payout = 0;
  let deposit = 0;

  data.map(v => {
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

const sendMailToAdmin = (
  userId,
  bankName,
  branchName,
  accountType,
  accountNumber,
  accountName,
  payouts,
) =>
  new Promise(async resolve => {
    // 運営への通知
    let message = `ユーザーID: ${userId}\n`;
    message += `金融機関名: ${bankName}\n`;
    message += `支店名: ${branchName}\n`;
    message += `預金種類: ${accountType ? '普通' : '当座'}\n`;
    message += `口座番号: ${accountNumber}\n`;
    message += `口座名義: ${accountName}\n`;
    if (payouts < 10000) {
      message += `振込金額: ${payouts}円\n`;
    } else {
      message += `振込金額: ${payouts + 260}円\n`;
    }

    const body = {
      Subject: `新規振込申請 ユーザーID:${userId}`,
      Address: 'info@monooq.com',
      Body: message,
      Category: 'payout',
    };

    const token = await getToken();
    postApiRequest(apiEndpoint.sendMail(), body, token);
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
    if (payouts < 10000) {
      message += `振込金額: ${payouts - 260}円\n\n`;
    } else {
      message += `振込金額: ${payouts}円\n\n`;
    }
    message += `取引(お預かり)の開始と口座情報が確認でき次第、5営業日以内にお振込させていただきます。\n\n`;
    message += `*営業日は土・日・祝、年末年始(12/30〜1/3)以外の平日となります。\n`;
    message += `*口座情報に誤りがあると思われる場合、メールにて確認のご連絡をさせていただきます。\n\n`;
    message += `引き続き、モノオクをよろしくお願い致します。`;

    const body = {
      Subject: `振込申請が完了しました`,
      Address: email,
      Body: message,
      Category: 'payout',
    };
    postApiRequest(apiEndpoint.sendMail(), body);
    resolve();
  });

const addBacklogIssue = (
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
    // 運営への通知
    let message = `ユーザーID: ${userId}\n`;
    message += `ユーザー名: ${userName}\n`;
    message += `メールアドレス: ${email}\n`;
    message += `金融機関名: ${bankName}\n`;
    message += `支店名: ${branchName}\n`;
    message += `預金種類: ${accountType ? '普通' : '当座'}\n`;
    message += `口座番号: ${accountNumber}\n`;
    message += `口座名義: ${accountName}\n`;

    if (payouts < 10000) {
      message += `振込金額: ${payouts}円\n`;
    } else {
      message += `振込金額: ${payouts + 260}円\n`;
    }

    const body = {
      Summary: `新規振込申請 ユーザーID:${userId}`,
      Description: message,
    };

    postApiRequest(apiEndpoint.backlogAddIssue(), body);
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

  console.log(payouts);

  // 開発環境はinfoに対するメールとBacklog通知しない
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

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
    addBacklogIssue,
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
