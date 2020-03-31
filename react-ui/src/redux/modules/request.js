import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery, take, select, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ReactGA from 'react-ga';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { isAvailableLocalStorage } from 'helpers/storage';
import { formatName } from 'helpers/string';
import { handleGTM } from 'helpers/gtm';
import { getBreadthsDetailRoom, getBreadthsDetailOther } from 'helpers/breadths';
import { getUsages } from 'helpers/usages';
import { loggerActions } from 'redux/modules/logger';
import { authActions, getToken } from './auth';
import { createOmiseToken } from '../helpers/omise';
import Path from '../../config/path';
import { getApiRequest, postApiRequest, apiEndpoint } from '../helpers/api';
import { handleError } from './error';
import { getRoomId, createRoom } from './messages';
import { handleAccessTrade, handleCircuitX } from '../../helpers/asp';

// Actions
const ESTIMATE = 'ESTIMATE';
const ESTIMATE_SUCCESS = 'ESTIMATE_SUCCESS';
const ESTIMATE_FAILED = 'ESTIMATE_FAILED';
const PAYMENT = 'PAYMENT';
const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
const PAYMENT_FAILED = 'PAYMENT_FAILED';
const PAYMENT_OTHER = 'PAYMENT_OTHER';
const PAYMENT_PREPARE = 'PAYMENT_PREPARE';
const FETCH_SCHEDULE = 'FETCH_SCHEDULE';
const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS';
const FETCH_SCHEDULE_FAILED = 'FETCH_SCHEDULE_FAILED';
const REQUEST = 'REQUEST';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_FAILED = 'REQUEST_FAILED';
const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
const FETCH_REQUEST_FAILED = 'FETCH_REQUEST_FAILED';

export const requestActions = createActions(
  ESTIMATE,
  ESTIMATE_SUCCESS,
  ESTIMATE_FAILED,
  PAYMENT,
  PAYMENT_OTHER,
  PAYMENT_SUCCESS,
  PAYMENT_FAILED,
  PAYMENT_PREPARE,
  FETCH_SCHEDULE,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILED,
  REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
  FETCH_REQUEST,
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_FAILED,
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
    [PAYMENT_OTHER]: state => ({
      ...state,
      payment: { isSending: true, isSuccess: false, isFailed: false },
    }),
    [PAYMENT_SUCCESS]: (state, action) => ({
      ...state,
      payment: {
        isSending: false,
        isSuccess: true,
        isFailed: false,
        url: action.payload.paymentUrl,
      },
    }),
    [PAYMENT_FAILED]: (state, action) => ({
      ...state,
      payment: {
        isSending: false,
        isSuccess: false,
        isFailed: true,
        errMsg: action.payload.errMsg,
      },
    }),
    [PAYMENT_PREPARE]: state => ({
      ...state,
      payment: {
        isSending: false,
        isSuccess: false,
        isFailed: false,
        url: '',
      },
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
    [FETCH_REQUEST]: state => ({
      ...state,
      payment: { isSuccess: false, isFailed: false },
    }),
    [FETCH_REQUEST_SUCCESS]: (state, action) => ({
      ...state,
      request: action.payload,
    }),
  },
  initialState,
);

const getMessageRoomUrl = roomId => {
  if (process.env.REACT_APP_ENV !== 'production') {
    return `https://monooq-front-web-dev.herokuapp.com/messages/${roomId}`;
  }
  return `https://monooq.com/messages/${roomId}`;
};

function* sendEstimateEmail(payload, messageDocId) {
  const { roomId, toUserId } = payload;

  const token = yield* getToken();
  const { data: toUser } = yield call(getApiRequest, apiEndpoint.users(toUserId), {}, token);

  let messageBody = 'お見積もりが届きました。\n';
  messageBody += '確認するには以下のリンクをクリックしてください。\n';
  messageBody += `${getMessageRoomUrl(roomId)}`;

  const body = {
    Subject: 'お見積もりが届いています：モノオクからのお知らせ',
    Uid: toUser.firebaseUid,
    Body: messageBody,
    category: 'estimate',
    CustomData: { messageDocId },
  };

  yield call(postApiRequest, apiEndpoint.sendMail(), body, token);
}

const roomCollection = () => {
  const firestore = firebase.firestore();
  return firestore.collection('rooms');
};

// Sagas
function* estimate({ payload: { roomId, userId, startDate, endDate, price } }) {
  const roomDoc = roomCollection().doc(roomId);
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
    yield handleError(requestActions.estimateFailed, '', 'estimate', err, false);
    return;
  }

  const message = {
    messageType: 2,
    createDt: new Date(),
    requestId: requestInfo.id,
    price: parseInt(price, 10),
    startDate,
    endDate,
  };
  const messageDoc = yield roomDoc.collection('messages').add(message);
  yield roomDoc.set(
    {
      lastMessage: 'お見積もりが届いています',
      lastMessageDt: new Date(),
    },
    { merge: true },
  );

  yield sendEstimateEmail({ toUserId: requestUserId, roomId }, messageDoc.id);

  const messageRoomUrl = getMessageRoomUrl(roomId);
  const smsBody = `【モノオク】\nお見積りが届いています。下記リンクからお支払いを進めましょう。 \n\n${messageRoomUrl}`;

  const bodySMS = {
    UserId: requestUserId,
    Body: smsBody,
  };

  yield call(postApiRequest, apiEndpoint.sendSMS(), bodySMS, token);

  yield put(requestActions.estimateSuccess(requestInfo));

  handleGTM('estimate', requestInfo.id);

  yield put(push(Path.message(roomId)));
}

function* sendRequestNotice(payload) {
  const {
    user,
    toUserId,
    space,
    roomId,
    usage,
    breadth,
    packageContents,
    phoneNumber,
    notes,
    setStartDate,
    setEndDate,
  } = payload;

  const token = yield* getToken();
  const urlMessageRoom = getMessageRoomUrl(roomId);

  let messageBody = `${formatName(user.name)}さんからスペース利用希望のリクエストが届きました。

下記リンクのメッセージルームから返信しましょう。
${urlMessageRoom}

ーーーリクエスト内容ーーー
はじめまして、${formatName(user.name)}と申します。
以下の内容で荷物を置けるスペースを探しています。
お見積もりをお願いします。

【期間】
${setStartDate} 〜 ${setEndDate}

【借りたい広さ】
${breadth}

【用途】
${usage}

【荷物の内容】
${packageContents}
`;

  if (phoneNumber) {
    messageBody += `
  【電話番号】
  ${phoneNumber}
  `;
  }

  if (notes) {
    messageBody += `
  【備考】
  ${notes}`;
  }

  const body = {
    Subject: '【スペース利用のリクエストが届きました】モノオクからのお知らせ',
    Uid: space.user.firebaseUid,
    Body: messageBody,
    Category: 'request',
  };

  yield call(postApiRequest, apiEndpoint.sendMail(), body, token);

  const messageBodySMS = `【モノオク】スペース利用のリクエストが届きました。下記リンクからご確認ください。

${urlMessageRoom}`;

  const bodySMS = {
    UserId: toUserId,
    Body: messageBodySMS,
  };

  yield call(postApiRequest, apiEndpoint.sendSMS(), bodySMS, token);
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

  let errMsg = '以下の理由により決済ができませんでした。\n';
  const errMsgCs = `${errMsg}繰り返し失敗する場合、モノオクカスタマーサポートまでお問い合わせください。`;

  if (err) {
    yield handleError(requestActions.paymentFailed, { errMsg: errMsgCs }, 'payment', err, false);
    return;
  }

  const user = yield select(state => state.auth.user);
  if (requestData.userId !== user.id) {
    yield handleError(
      requestActions.paymentFailed,
      { errMsg: errMsgCs },
      'payment(estimate)',
      `requestDataUserID(${requestData.userId})/loginUserID(${user.id})`,
      false,
    );
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
    // TODO トークン生成失敗理由をキャッチする
    yield handleError(
      requestActions.paymentFailed,
      {
        errMsg: `一時的にシステムに障害が生じている可能性がございます。大変申し訳ありませんが、時間をあけて再度お試しください。`,
      },
      'payment',
      '',
      true,
    );
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
    switch (err2) {
      case 'invalid_security_code':
        errMsg += 'セキュリティコードが無効です。';
        break;

      case 'insufficient_fund':
        errMsg += 'カードの与信限度枠を超えています';
        break;

      case 'stolen_or_lost_card': // このカードは盗難カードまたは紛失カードです
      case 'failed_fraud_check': // このカードは不正だと判定されました。
        errMsg +=
          'こちらのカードはご利用いただくことができません。\n詳細はカード会社にお問い合わせください。';
        break;

      case 'failed_processing': // トランザクション処理のプロセスが失敗しました。
      case 'payment_rejected': // 何らかの理由により、課金が拒否されました。
      case 'invalid_account_number': // 利用できないカード番号です。
        errMsg = errMsgCs;
        break;
      case 'already_paid':
        errMsg += 'お支払済みです。';
        break;
      default:
        errMsg += 'カード名義・カード番号・有効期限・セキュリティコードをお確かめください。';
        break;
    }

    yield put(requestActions.paymentFailed({ errMsg }));
    return;
  }

  const message = {
    messageType: 3,
    createDt: new Date(),
    requestId: parseInt(requestId, 10),
  };

  const roomDoc = roomCollection().doc(roomId);
  yield roomDoc.collection('messages').add(message);
  yield roomDoc.set(
    {
      lastMessage: 'お支払いが完了しました',
      lastMessageDt: new Date(),
    },
    { merge: true },
  );

  handleGTM('match', requestId);

  yield put(requestActions.paymentSuccess(data));
}

function* paymentOther({ payload: { apiEndpointName, requestId } }) {
  const token = yield* getToken();
  const { data, err } = yield call(
    postApiRequest,
    apiEndpoint.payments(apiEndpointName),
    {
      RequestId: parseInt(requestId, 10),
    },
    token,
  );
  if (err) {
    const errMsg = `決済処理に失敗しました。\n繰り返し認証に失敗する場合、モノオクカスタマーサポートまでお問い合わせください。`;
    yield put(requestActions.paymentFailed({ errMsg }));
    return;
  }
  handleGTM('match', requestId);
  yield put(requestActions.paymentSuccess(data));
}

function* fetchSchedule() {
  let user = yield select(state => state.auth.user);
  if (!user.id) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);

  const token = yield* getToken();
  const { data: userRequests } = yield call(
    getApiRequest,
    apiEndpoint.requestsByUserId(user.id),
    {},
    token,
  );
  const { data: hostRequests } = yield call(
    getApiRequest,
    apiEndpoint.requestsByHostUserId(user.id),
    {},
    token,
  );
  // TODO エラーハンドリング

  yield put(requestActions.fetchScheduleSuccess({ user: userRequests, host: hostRequests }));
}

function generateRequestParams(space) {
  const params = {};

  Object.keys(space).forEach(key => {
    const requestKey = `${key[0].toLowerCase()}${key.substr(1)}`;
    params[requestKey] = space[key];
  });

  return params;
}

function* request({ payload: { user, space, body } }) {
  const params = generateRequestParams(body);
  let roomId = yield call(getRoomId, user.id, space.user.id, space.id);
  if (roomId) {
    yield put(requestActions.requestSuccess());
    yield put(push(Path.message(roomId)));
    return;
  }

  const setStartDate = `${params.startDate.year}/${params.startDate.month}/${params.startDate.day}`;
  const setEndDate = `${params.endDate.year}/${params.endDate.month}/${params.endDate.day}`;
  const usage = getUsages(params.usage);
  const breadth =
    space.sizeType > 0 && space.sizeType < 4
      ? getBreadthsDetailRoom(params.breadth)
      : getBreadthsDetailOther(params.breadth);

  roomId = yield call(
    createRoom,
    user.id,
    user.name,
    user.firebaseUid,
    space.user.id,
    space.user.firebaseUid,
    space.id,
    usage,
    breadth,
    params.packageContents,
    params.phoneNumber,
    params.notes,
    setStartDate,
    setEndDate,
  );
  yield put(push(Path.message(roomId)));

  let isRequested = 'false';
  if (isAvailableLocalStorage()) {
    if (localStorage.getItem('isRequested')) {
      isRequested = localStorage.getItem('isRequested');
    }
    localStorage.setItem('request_params', JSON.stringify(params));
  }

  yield put(
    loggerActions.recordEvent({
      event: 'space_requests',
      detail: {
        spaceId: space.id,
        userId: user.id,
        roomId,
        ...params,
      },
    }),
  );

  ReactGA.plugin.execute('ec', 'addProduct', {
    id: space.id,
    name: space.title,
  });
  ReactGA.plugin.execute('ec', 'setAction', 'add', {});

  if (isRequested === 'false' && user.id !== 2613) {
    handleGTM('newRequest', user.id);
    handleAccessTrade(105, `new_request_user${user.id}_space${space.id}`);
    handleCircuitX(1374, user.id);
    handleCircuitX(1377, user.id);

    const token = yield* getToken();
    let messageBody = ``;
    if (user.name && user.name !== '') {
      messageBody = `${user.name}さん\n\n`;
    }
    messageBody += 'この度はモノオクのご利用ありがとうございます。\n';
    messageBody +=
      '人気なスペースは契約が決まり次第埋まっていくため、複数のスペースへリクエストすることをおすすめしております。\n\n';

    messageBody += '一度リクエストした内容を使い回せるので、2回目以降は申請が楽々！\n';
    messageBody += `▶他のスペースも探すにはこちら: https://monooq.com/spaces/pref${space.prefCode}/\n\n`;

    if (space.prefCode === '13') {
      messageBody +=
        '緊急なのになかなか預け先が見つからない…そんなときはモノオク運営のスペースへご相談どうぞ！\n';
      messageBody += '▶モノオクのスペースはこちら: https://monooq.com/space/4518\n\n';
    }

    const mailBody = {
      Subject: `【モノオク】複数スペースへのリクエストがおすすめです!`,
      Uid: user.firebaseUid,
      Body: messageBody,
      Category: 'request_tips',
    };
    yield call(postApiRequest, apiEndpoint.sendMail(), mailBody, token);

    if (isAvailableLocalStorage()) {
      localStorage.setItem('isRequested', 'true');
    }
  }
  yield sendRequestNotice({
    user,
    toUserId: space.user.id,
    space,
    roomId,
    usage,
    breadth,
    packageContents: params.packageContents,
    phoneNumber: params.phoneNumber,
    notes: params.notes,
    setStartDate,
    setEndDate,
  });
  yield put(requestActions.requestSuccess());
}

function* fetchRequest({ payload: requestId }) {
  const token = yield* getToken();
  const { data } = yield call(getApiRequest, apiEndpoint.requests(requestId), {}, token);
  // TODO エラーハンドリング
  yield put(requestActions.fetchRequestSuccess(data));
}

export const requestSagas = [
  takeEvery(ESTIMATE, estimate),
  takeEvery(PAYMENT, payment),
  takeEvery(PAYMENT_OTHER, paymentOther),
  takeEvery(FETCH_SCHEDULE, fetchSchedule),
  takeEvery(REQUEST, request),
  takeEvery(FETCH_REQUEST, fetchRequest),
];
