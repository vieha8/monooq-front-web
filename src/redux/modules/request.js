import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, select } from 'redux-saga/effects';
import { apiActions, apiEndpoint } from './api';
import { authActions } from './auth';
import firebase from 'firebase';
import { store } from '../store/configureStore';
import { push } from 'react-router-redux';
import { createOmiseToken } from '../helpers/omise';
import path from '../../config/path';

// Actions
const ESTIMATE = 'ESTIMATE';
const ESTIMATE_SUCCESS = 'ESTIMATE_SUCCESS';
const ESTIMATE_FAILED = 'ESTIMATE_FAILED';
const PAYMENT = 'PAYMENT';
const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
const PAYMENT_FAILED = 'PAYMENT_FAILED';
const FETCH_SCHEDULE = 'FETCH_SCHEDULE';
const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS';
const FETCH_SCHEDULE_FAILED = 'FETCH_SCHEDULE_FAILED';

export const requestActions = createActions(
  ESTIMATE,
  ESTIMATE_SUCCESS,
  ESTIMATE_FAILED,
  PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAILED,
  FETCH_SCHEDULE,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILED,
);

// Reducer
const initialState = {
  schedule: {
    user: [],
    host: [],
    isLoading: false,
  },
  estimate: {
    isSending: false,
  },
  payment: {
    isSending: false,
    isSuccess: false,
  },
};

export const requestReducer = handleActions(
  {
    [ESTIMATE]: state => ({
      ...state,
      estimate: { isSending: true },
    }),
    [ESTIMATE_SUCCESS]: state => ({
      ...state,
      estimate: { isSending: false },
    }),
    [ESTIMATE_FAILED]: state => ({
      ...state,
      estimate: { isSending: false },
    }),
    [PAYMENT]: state => ({
      ...state,
      payment: { isSending: true, isSuccess: false },
    }),
    [PAYMENT_SUCCESS]: state => ({
      ...state,
      payment: { isSending: false, isSuccess: true },
    }),
    [PAYMENT_FAILED]: state => ({
      ...state,
      payment: { isSending: false, isSuccess: false },
    }),
    [FETCH_SCHEDULE]: state => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_SCHEDULE_SUCCESS]: (state, action) => ({
      ...state,
      schedule: action.payload,
      isLoading: false,
    }),
    [FETCH_SCHEDULE_FAILED]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

//Sagas
function* estimate({ payload: { roomId, userId, startDate, endDate, price } }) {
  const db = firebase.firestore();
  const roomDoc = db.collection('rooms').doc(roomId);
  const room = yield roomDoc.get();
  const { spaceId, userId1, userId2 } = room.data();

  let requestUserId = userId1;
  if (userId1 === userId) {
    requestUserId = userId2;
  }

  yield sendEstimateEmail({ toUserId: requestUserId, roomId });

  yield put(
    apiActions.apiPostRequest({
      path: apiEndpoint.requests(),
      body: { userId: requestUserId, spaceId, startDate, endDate, price: parseInt(price, 10) },
    }),
  );
  const { payload: requestInfo, error, meta } = yield take(apiActions.apiResponse);
  if (error) {
    yield put(requestActions.estimateFailed(meta));
    return;
  }

  const message = {
    messageType: 2,
    createDt: new Date(),
    requestId: requestInfo.ID,
    price: parseInt(price, 10),
    startDate,
    endDate,
  };
  yield roomDoc.collection('messages').add(message);
  yield roomDoc.set(
    {
      lastMessage: '見積りが届いています',
      lastMessageDt: new Date(),
    },
    { merge: true },
  );
  yield put(requestActions.estimateSuccess(requestInfo));
  store.dispatch(push(path.message(roomId)));
}

function* payment({ payload: { roomId, requestId, card } }) {
  //不正対策
  yield put(
    apiActions.apiGetRequest({
      path: apiEndpoint.requests(requestId),
    }),
  );
  const { payload: requestData, error, meta } = yield take(apiActions.apiResponse);
  if (error) {
    yield put(requestActions.paymentFailed(meta));
    return;
  }
  let user = yield select(state => state.auth.user);
  if (!user.ID) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);
  if (requestData.UserID !== user.ID) {
    yield put(requestActions.paymentFailed());
    store.dispatch(push(path.error(400)));
    return;
  }

  yield sendPaymentEmail({ roomId, spaceId: requestData.SpaceID });

  //Omiseトークン生成
  const { id: token } = yield createOmiseToken({
    card: {
      name: card.name,
      number: card.number,
      security_code: parseInt(card.code, 10),
      expiration_month: parseInt(card.expiryMonth, 10),
      expiration_year: parseInt(card.expiryYear, 10),
    },
  });

  yield put(
    apiActions.apiPostRequest({
      path: apiEndpoint.payments(),
      body: { RequestId: parseInt(requestId, 10), CardToken: token },
    }),
  );
  const { payload, error2, meta2 } = yield take(apiActions.apiResponse);
  if (error2) {
    yield put(requestActions.paymentFailed(meta2));
    return;
  }

  const db = firebase.firestore();
  const message = {
    messageType: 3,
    createDt: new Date(),
    requestId: parseInt(requestId, 10),
  };

  const roomDoc = db.collection('rooms').doc(roomId);
  yield roomDoc.collection('messages').add(message);
  yield roomDoc.set(
    {
      lastMessage: 'お支払いが完了しました',
      lastMessageDt: new Date(),
    },
    { merge: true },
  );

  yield put(requestActions.paymentSuccess(payload));
}

function* fetchSchedule() {
  let user = yield select(state => state.auth.user);
  if (!user.ID) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);

  yield put(apiActions.apiGetRequest({ path: apiEndpoint.requestsByUserId(user.ID) }));
  yield take(apiActions.apiResponse);
  const { payload: userRequests, error, meta } = yield take(apiActions.apiResponse);

  if (error) {
    yield put(requestActions.fetchScheduleFailed(meta));
    return;
  }

  yield put(apiActions.apiGetRequest({ path: apiEndpoint.requestsByHostUserId(user.ID) }));
  const { payload: hostRequests, error: error2, meta: meta2 } = yield take(apiActions.apiResponse);
  if (error2) {
    yield put(requestActions.fetchScheduleFailed(meta2));
    return;
  }

  yield put(requestActions.fetchScheduleSuccess({ user: userRequests, host: hostRequests }));
}

function* sendEstimateEmail(payload) {
  const { roomId, toUserId } = payload;

  yield put(apiActions.apiGetRequest({ path: apiEndpoint.users(toUserId) }));
  const { payload: toUser } = yield take(apiActions.apiResponse);

  let messageBody = 'お見積りが届きました。\n';
  messageBody += '確認するには以下のリンクをクリックしてください。\n';

  //TODO 開発環境バレ防止の為、URLは環境変数にいれる
  if (process.env.REACT_APP_ENV === 'production') {
    messageBody += `https://monooq.com/messages/${roomId}`;
  } else {
    messageBody += `https://monooq-front-web-dev.herokuapp.com/messages/${roomId}`;
  }

  const body = {
    Subject: 'お見積りが届いています：モノオクからのお知らせ',
    Address: toUser.Email,
    Body: messageBody,
  };

  yield put(apiActions.apiPostRequest({ path: apiEndpoint.sendMail(), body }));
}

function* sendPaymentEmail(payload) {
  const { roomId, spaceId } = payload;

  yield put(apiActions.apiGetRequest({ path: apiEndpoint.spaces(spaceId) }));
  const { payload: space } = yield take(apiActions.apiResponse);

  const toUserId = space.UserID;

  yield put(apiActions.apiGetRequest({ path: apiEndpoint.users(toUserId) }));
  const { payload: toUser } = yield take(apiActions.apiResponse);

  let messageBody = '見積りに対するお支払いがありました。\n';
  messageBody += '詳細を確認するには以下のリンクをクリックしてください。\n';

  //TODO 開発環境バレ防止の為、URLは環境変数にいれる
  if (process.env.REACT_APP_ENV === 'production') {
    messageBody += `https://monooq.com/messages/${roomId}`;
  } else {
    messageBody += `https://monooq-front-web-dev.herokuapp.com/messages/${roomId}`;
  }

  const body = {
    Subject: 'ユーザーの支払いが完了されました：モノオクからのお知らせ',
    Address: toUser.Email,
    Body: messageBody,
  };

  yield put(apiActions.apiPostRequest({ path: apiEndpoint.sendMail(), body }));
}

export const requestSagas = [
  takeEvery(ESTIMATE, estimate),
  takeEvery(PAYMENT, payment),
  takeEvery(FETCH_SCHEDULE, fetchSchedule),
];
