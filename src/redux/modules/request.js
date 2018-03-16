import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take } from 'redux-saga/effects';
import { apiActions } from './api';
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

export const requestActions = createActions(
  ESTIMATE,
  ESTIMATE_SUCCESS,
  ESTIMATE_FAILED,
  PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAILED,
);

// Reducer
const initialState = {};

export const requestReducer = handleActions({}, initialState);

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

function* payment({ payload: { requestId, card } }) {
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
  const { payload } = take(apiActions.paymentPostSuccess);
  //TODO 決済完了メッセージを送る
  console.log(payload);
}

export const requestSagas = [takeEvery(ESTIMATE, estimate), takeEvery(PAYMENT, payment)];
