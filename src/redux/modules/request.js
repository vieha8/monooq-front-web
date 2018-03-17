import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take } from 'redux-saga/effects';
import { apiActions } from './api';
import { authActions } from './auth';
import firebase from 'firebase';
import { store } from '../store/configureStore';
import { push } from 'react-router-redux';
import { createOmiseToken } from '../helpers/omise';

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
  schedule: {},
};

export const requestReducer = handleActions(
  {
    [FETCH_SCHEDULE_SUCCESS]: (state, action) => ({
      ...state,
      schedule: action.payload,
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

  yield put(
    apiActions.requestPost({
      body: { userId: requestUserId, spaceId, startDate, endDate, price: parseInt(price, 10) },
    }),
  );
  const { payload: requestInfo } = yield take(apiActions.requestPostSuccess);

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
  store.dispatch(push(`/message/${roomId}`));
}

function* payment({ payload: { roomId, requestId, card } }) {
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
    apiActions.paymentPost({ body: { RequestId: parseInt(requestId, 10), CardToken: token } }),
  );
  yield take(apiActions.paymentPostSuccess);

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

  store.dispatch(push(`/message/${roomId}`));
}

function* fetchSchedule() {
  const { payload: { user } } = yield take(authActions.checkLoginEnd); //TODO とりあえず動かすためにやってるけど、本当はよろしくない
  yield put(apiActions.requestUserGet({ id: user.ID }));
  const { payload: userRequests } = yield take(apiActions.requestUserGetSuccess);

  yield put(apiActions.requestHostGet({ id: user.ID }));
  const { payload: hostRequests } = yield take(apiActions.requestHostGetSuccess);

  yield put(requestActions.fetchScheduleSuccess({ user: userRequests, host: hostRequests }));
}

export const requestSagas = [
  takeEvery(ESTIMATE, estimate),
  takeEvery(PAYMENT, payment),
  takeEvery(FETCH_SCHEDULE, fetchSchedule),
];
