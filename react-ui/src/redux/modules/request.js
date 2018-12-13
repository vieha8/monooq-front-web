import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, select, call } from 'redux-saga/effects';
import firebase from 'firebase/app';
import { push } from 'connected-react-router';
import { apiEndpoint } from './api';
import { authActions, getToken } from './auth';
import { store } from '../store/configureStore';
import { createOmiseToken } from '../helpers/omise';
import Path from '../../config/path';
import { getApiRequest, postApiRequest } from '../helpers/api';
import { errorActions } from './error';
import { getRoomId, createRoom } from './messages';
import { isAvailableLocalStorage } from 'helpers/storage';

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
const REQUEST = 'REQUEST';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_FAILED = 'REQUEST_FAILED';

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
  REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
);

// Reducer
const initialState = {
  isLoading: false,
  schedule: {
    user: [],
    host: [],
  },
  estimate: {
    isSending: false,
  },
  payment: {
    isSending: false,
    isSuccess: false,
    isFailed: false,
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
      payment: { isSending: true, isSuccess: false, isFailed: false },
    }),
    [PAYMENT_SUCCESS]: state => ({
      ...state,
      payment: { isSending: false, isSuccess: true, isFailed: false },
    }),
    [PAYMENT_FAILED]: state => ({
      ...state,
      payment: { isSending: false, isSuccess: false, isFailed: true },
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
    [REQUEST]: state => ({
      ...state,
      isLoading: true,
    }),
    [REQUEST_SUCCESS]: state => ({
      ...state,
      isLoading: false,
    }),
    [REQUEST_FAILED]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
);

function* sendEstimateEmail(payload) {
  const { roomId, toUserId } = payload;

  const token = yield* getToken();
  const { data: toUser } = yield call(getApiRequest, apiEndpoint.users(toUserId), {}, token);

  let messageBody = 'お見積りが届きました。\n';
  messageBody += '確認するには以下のリンクをクリックしてください。\n';

  // TODO 開発環境バレ防止の為、URLは環境変数にいれる
  if (process.env.REACT_APP_ENV === 'production') {
    messageBody += `https://monooq.com/messages/${roomId}`;
  } else {
    messageBody += `https://monooq-front-web-dev.herokuapp.com/messages/${roomId}`;
  }

  const body = {
    Subject: 'お見積りが届いています：モノオクからのお知らせ',
    Address: toUser.Email,
    Body: messageBody,
    category: 'estimate',
  };

  yield call(postApiRequest, apiEndpoint.sendMail(), body, token);
}

// Sagas
function* estimate({ payload: { roomId, userId, startDate, endDate, price } }) {
  const db = firebase.firestore();
  const roomDoc = db.collection('rooms').doc(roomId);
  const room = yield roomDoc.get();
  const { spaceId, userId1, userId2 } = room.data();

  let requestUserId = userId1;
  if (userId1 === userId) {
    requestUserId = userId2;
  }

  const token = yield* getToken();
  const { data: requestInfo, err } = yield call(
    postApiRequest,
    apiEndpoint.requests(),
    {
      userId: requestUserId,
      spaceId,
      startDate,
      endDate,
      price: parseInt(price, 10),
      status: 'estimate',
    },
    token,
  );

  if (err) {
    yield put(requestActions.estimateFailed(err));
    yield put(errorActions.setError(err));
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

  yield sendEstimateEmail({ toUserId: requestUserId, roomId });
  yield put(requestActions.estimateSuccess(requestInfo));
  window.dataLayer.push({ event: 'estimate', eventValue: requestInfo.ID });
  store.dispatch(push(Path.message(roomId)));
}

function* sendPaymentEmail(payload) {
  const { roomId, spaceId } = payload;

  const token = yield* getToken();
  const { data: space } = yield call(getApiRequest, apiEndpoint.spaces(spaceId), {}, token);
  const { data: toUser } = yield call(getApiRequest, apiEndpoint.users(space.UserID), {}, token);

  let messageBody = '見積りに対するお支払いがありました。\n';
  messageBody += '詳細を確認するには以下のリンクをクリックしてください。\n';

  // TODO 開発環境バレ防止の為、URLは環境変数にいれる
  if (process.env.REACT_APP_ENV === 'production') {
    messageBody += `https://monooq.com/messages/${roomId}`;
  } else {
    messageBody += `https://monooq-front-web-dev.herokuapp.com/messages/${roomId}`;
  }

  const body = {
    Subject: 'ユーザーの支払いが完了されました：モノオクからのお知らせ',
    Address: toUser.Email,
    Body: messageBody,
    Category: 'payment',
  };

  yield call(postApiRequest, apiEndpoint.sendMail(), body);
}

function* payment({ payload: { roomId, requestId, payment: card } }) {
  // 不正対策
  const token = yield* getToken();
  const { data: requestData, err } = yield call(
    getApiRequest,
    apiEndpoint.requests(requestId),
    {},
    token,
  );
  if (err) {
    yield put(requestActions.paymentFailed(err));
    yield put(errorActions.setError(err));
    return;
  }

  let user = yield select(state => state.auth.user);
  if (!user.ID) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);
  if (requestData.UserID !== user.ID) {
    yield put(requestActions.paymentFailed());
    yield put(errorActions.setError('Bad Request'));
    return;
  }

  // Omiseトークン生成
  const { id: cardToken } = yield createOmiseToken({
    card: {
      name: card.name,
      number: card.number,
      security_code: parseInt(card.cvc, 10),
      expiration_month: parseInt(card.month, 10),
      expiration_year: parseInt(card.year, 10),
    },
  });

  if (!cardToken) {
    //TODO トークン生成失敗理由をキャッチする
    yield put(requestActions.paymentFailed());
    // yield put(errorActions.setError('Bad Request'));
    return;
  }

  const { data, err: err2 } = yield call(
    postApiRequest,
    apiEndpoint.payments(),
    {
      RequestId: parseInt(requestId, 10),
      CardToken: cardToken,
    },
    token,
  );
  if (err2) {
    yield put(requestActions.paymentFailed(err2));
    yield put(errorActions.setError(err2));
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

  window.dataLayer.push({ event: 'match', eventValue: requestId });
  yield sendPaymentEmail({ roomId, spaceId: requestData.SpaceID });
  yield put(requestActions.paymentSuccess(data));
}

function* fetchSchedule() {
  let user = yield select(state => state.auth.user);
  if (!user.ID) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);

  const token = yield* getToken();
  const { data: userRequests } = yield call(
    getApiRequest,
    apiEndpoint.requestsByUserId(user.ID),
    {},
    token,
  );
  const { data: hostRequests } = yield call(
    getApiRequest,
    apiEndpoint.requestsByHostUserId(user.ID),
    {},
    token,
  );
  // TODO エラーハンドリング

  yield put(requestActions.fetchScheduleSuccess({ user: userRequests, host: hostRequests }));
}

function* request({ payload: { user, space } }) {
  let roomId = yield call(getRoomId, user.ID, space.Host.ID, space.ID);
  if (roomId) {
    yield put(requestActions.requestSuccess());
    store.dispatch(push(Path.message(roomId)));
    return;
  }

  roomId = yield call(
    createRoom,
    user.ID,
    user.Name,
    user.FirebaseUid,
    space.Host.ID,
    space.Host.FirebaseUid,
    space.ID,
  );
  store.dispatch(push(Path.message(roomId)));

  const isRequested = localStorage.getItem('isRequested');
  if (!isRequested && user.ID !== 2613) {
    window.dataLayer.push({ event: 'newRequest' }); // GTM

    const script = document.createElement('script');

    script.innerHTML = `var __atw = __atw || [];
    __atw.push({ "merchant" : "monooq", "param" : {
        "result_id" : "105",
        "verify" : "new_request_user${user.ID}_space${space.ID}",
    }});
(function(a){var b=a.createElement("script");b.src="https://h.accesstrade.net/js/nct/cv.min.js";b.async=!0;
a=a.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})(document);`;

    document.body.appendChild(script);

    if (isAvailableLocalStorage()) {
      localStorage.setItem('isRequested', 'true');
    }
  }
  yield put(requestActions.requestSuccess());
}

export const requestSagas = [
  takeEvery(ESTIMATE, estimate),
  takeEvery(PAYMENT, payment),
  takeEvery(FETCH_SCHEDULE, fetchSchedule),
  takeEvery(REQUEST, request),
];
