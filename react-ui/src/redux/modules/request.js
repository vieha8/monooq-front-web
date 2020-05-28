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
import { getPrefecture } from 'helpers/prefectures';
import { authActions, getToken } from './auth';
import { createOmiseToken } from '../helpers/omise';
import Path from '../../config/path';
import { getApiRequest, postApiRequest, apiEndpoint } from '../helpers/api';
import { handleError } from './error';
import { getRoomId, createRoom } from './messages';
import { handleAccessTrade, handleCircuitX } from '../../helpers/asp';

// Actions
const FETCH_REQUEST_TAKELATE_BEFORE = 'FETCH_REQUEST_TAKELATE_BEFORE';
const FETCH_REQUEST_TAKELATE_BEFORE_SUCCESS = 'FETCH_REQUEST_TAKELATE_BEFORE_SUCCESS';
const FETCH_REQUEST_TAKELATE_BEFORE_FAILED = 'FETCH_REQUEST_TAKELATE_BEFORE_FAILED';
const ESTIMATE = 'ESTIMATE';
const ESTIMATE_SUCCESS = 'ESTIMATE_SUCCESS';
const ESTIMATE_FAILED = 'ESTIMATE_FAILED';
const PAYMENT_CONFIRM = 'PAYMENT_CONFIRM';
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
const BOSYU = 'BOSYU';
const BOSYU_SUCCESS = 'BOSYU_SUCCESS';
const BOSYU_FAILED = 'BOSYU_FAILED';

export const requestActions = createActions(
  FETCH_REQUEST_TAKELATE_BEFORE,
  FETCH_REQUEST_TAKELATE_BEFORE_SUCCESS,
  FETCH_REQUEST_TAKELATE_BEFORE_FAILED,
  ESTIMATE,
  ESTIMATE_SUCCESS,
  ESTIMATE_FAILED,
  PAYMENT_CONFIRM,
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
  BOSYU,
  BOSYU_SUCCESS,
  BOSYU_FAILED,
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
    [FETCH_REQUEST_TAKELATE_BEFORE]: state => ({
      ...state,
      estimate: {
        isSending: true,
        isTakelateBefore: false,
      },
    }),
    [FETCH_REQUEST_TAKELATE_BEFORE_SUCCESS]: (state, action) => ({
      ...state,
      estimate: {
        isSending: false,
        isTakelateBefore: action.payload.isTakelateBefore,
      },
    }),
    [FETCH_REQUEST_TAKELATE_BEFORE_FAILED]: state => ({
      ...state,
      estimate: {
        isSending: false,
        isTakelateBefore: false,
      },
    }),
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
    [PAYMENT_CONFIRM]: state => ({
      ...state,
      payment: {
        isSending: false,
        isSuccess: false,
        isFailed: false,
        errMsg: '',
      },
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
    [BOSYU]: state => ({
      ...state,
      isLoading: true,
    }),
    [BOSYU_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      prefName: action.payload && action.payload.prefName,
    }),
    [BOSYU_FAILED]: state => ({
      ...state,
      isLoading: false,
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

// TODO: 共通化する
function* fetchRequestTakelateBefore({ payload: { guestId, spaceId } }) {
  const token = yield* getToken();
  const { data: payload, err } = yield call(
    getApiRequest,
    apiEndpoint.requestsByHostUserIdTakelateBefore(guestId, spaceId),
    {},
    token,
  );

  if (err) {
    yield handleError(
      requestActions.fetchRequestTakelateBeforeFailed,
      '',
      'fetchRequestTakelateBefore',
      err,
      false,
    );
    return;
  }

  let isTakelateBefore = false;
  if (payload.length > 0) {
    isTakelateBefore = true;
  }

  yield put(requestActions.fetchRequestTakelateBeforeSuccess({ isTakelateBefore }));
}

// Sagas
function* estimate({
  payload: {
    roomId,
    userId,
    startDate,
    endDate,
    usagePeriod,
    isUndecided,
    tatami,
    indexTatami,
    price,
  },
}) {
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
      usagePeriod: parseInt(usagePeriod, 10),
      isUndecided: parseInt(isUndecided, 10),
      tatami: parseInt(tatami, 10),
      indexTatami: parseInt(indexTatami, 10),
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
    usagePeriod: parseInt(usagePeriod, 10),
    isUndecided: parseInt(isUndecided, 10),
    tatami: parseInt(tatami, 10),
    indexTatami: parseInt(indexTatami, 10),
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

function* payment({ payload: { roomId, requestId, info, payment: card } }) {
  // 不正対策
  const token = yield* getToken();
  const { data: requestData, err } = yield call(
    getApiRequest,
    apiEndpoint.requests(requestId),
    {},
    token,
  );

  let errMsg = '決済ができませんでした。\n';
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
      PaymentType: info.paymentType,
      PaymentPrice: info.paymentPrice,
      StartDate: info.startDate,
      EndDate: info.endDate,
      IsUndecided: info.isUndecided,
    },
    token,
  );

  if (err2) {
    switch (err2) {
      case 'invalid_security_code':
        errMsg = 'セキュリティコードに誤りがあります';
        break;
      case 'insufficient_fund':
        errMsg = 'カードの与信限度枠を超えています';
        break;
      case 'stolen_or_lost_card': // このカードは盗難カードまたは紛失カードです
      case 'failed_fraud_check': // このカードは不正だと判定されました。
        errMsg =
          'こちらのカードはご利用いただくことができません。\n詳細はカード会社にお問い合わせください。';
        break;
      case 'failed_processing': // トランザクション処理のプロセスが失敗しました。
      case 'payment_rejected': // 何らかの理由により、課金が拒否されました。
      case 'invalid_account_number': // 利用できないカード番号です。
        errMsg = errMsgCs;
        break;
      case 'already_paid':
        errMsg = 'この見積もりは既にお支払済みです';
        break;
      default:
        errMsg =
          '決済に失敗しました。カード名義・カード番号・有効期限・セキュリティコードをお確かめください。';
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
  yield put(push(`${Path.message(roomId)}?phase=start`));

  let isRequested = 'false';
  if (isAvailableLocalStorage()) {
    if (localStorage.getItem('isRequested')) {
      isRequested = localStorage.getItem('isRequested');
    }
    localStorage.setItem('request_params', JSON.stringify(params));
  }

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
  const { data, err: errReq } = yield call(
    getApiRequest,
    apiEndpoint.requests(requestId),
    {},
    token,
  );

  if (errReq) {
    yield handleError(requestActions.fetchRequestFailed, '', 'fetchRequestFailed', errReq, false);
    return;
  }

  const { data: takelateBefore, err: errCheckTakelate } = yield call(
    getApiRequest,
    apiEndpoint.requestsByHostUserIdTakelateBefore(data.userId, data.spaceId),
    {},
    token,
  );

  if (errCheckTakelate) {
    yield handleError(
      requestActions.fetchRequestFailed,
      '',
      'fetchRequestTakelateBefore(payment)',
      errCheckTakelate,
      false,
    );
    return;
  }

  let isTakelateBefore = false;
  if (takelateBefore.length > 0) {
    isTakelateBefore = true;
  }
  data.isTakelateBefore = isTakelateBefore;

  yield put(requestActions.fetchRequestSuccess(data));
}

function* bosyu({ payload: { body } }) {
  const { prefCode, city, usage, startDate, isUseOver6Month, breadth } = generateRequestParams(
    body,
  );

  const token = yield* getToken();
  const user = yield select(state => state.auth.user);

  const pref = getPrefecture(prefCode);

  const params = {
    prefecture: pref,
    city,
    usages: parseInt(usage, 10),
    startDate: new Date(`${startDate.year}/${startDate.month}/${startDate.day}`),
    isLong: isUseOver6Month,
    breadth: parseInt(breadth, 10),
  };

  const { err, data: recommendSpaces } = yield call(
    postApiRequest,
    apiEndpoint.guestWish(user.id),
    params,
    token,
  );

  if (err) {
    yield handleError(requestActions.bosyuFailed, '', 'bosyuWish', err, false);
    return;
  }

  if (isAvailableLocalStorage()) {
    localStorage.setItem('isRequestedTop', 'true');
  }

  const limit = 20; // TODO 暫定
  let recommendPrefSpaces = [];
  if (recommendSpaces.length < limit) {
    const searchParams = {
      limit,
      offset: 0,
      pref: prefCode,
      sizeType: parseInt(breadth, 10),
      status: 'open,consultation',
    };

    const { data, err: err2 } = yield call(
      getApiRequest,
      apiEndpoint.spaces(),
      searchParams,
      token,
    );
    if (err2 && !recommendSpaces.length) {
      yield handleError(requestActions.bosyuFailed, '', 'bosyuSearch', err, false);
      return;
    }

    // レコメンド用スペース
    if (!data) {
      yield put(requestActions.bosyuSuccess({ prefName: pref }));
      return;
    }
    recommendPrefSpaces = data.results;
  }

  yield put(requestActions.bosyuSuccess());

  const sortedResult = [...recommendSpaces, ...recommendPrefSpaces];
  const uniqById = array => {
    const uniquedArray = [];
    for (const elem of array) {
      if (!uniquedArray.map(s => s.id).includes(elem.id)) {
        uniquedArray.push(elem);
      }
    }
    return uniquedArray;
  };

  const uniqArray = uniqById(sortedResult);
  const inCity = uniqArray.filter(space => space.addressCity === city);
  const outCity = uniqArray.filter(space => space.addressCity !== city);
  const results = [...inCity, ...outCity];

  yield put(
    push({
      pathname: Path.recommend(),
      state: { recommendSpaces: { results } },
    }),
  );
}

export const requestSagas = [
  takeEvery(FETCH_REQUEST_TAKELATE_BEFORE, fetchRequestTakelateBefore),
  takeEvery(ESTIMATE, estimate),
  takeEvery(PAYMENT, payment),
  takeEvery(PAYMENT_OTHER, paymentOther),
  takeEvery(FETCH_SCHEDULE, fetchSchedule),
  takeEvery(REQUEST, request),
  takeEvery(FETCH_REQUEST, fetchRequest),
  takeEvery(BOSYU, bosyu),
];
