import { createActions, handleActions } from 'redux-actions';
import { eventChannel } from 'redux-saga';
import { put, call, takeEvery, take, select, fork, cancel, cancelled } from 'redux-saga/effects';
import { push } from 'connected-next-router';
import { captureException } from '@sentry/browser';
<<<<<<< HEAD
import { getToken } from 'redux/modules/auth';
=======
import dynamic from 'next/dynamic';
import { getToken } from 'redux/sagas/auth/generators';
>>>>>>> 568df103bcc6d8316e02a77521614155e30938d1
import { userActions } from 'redux/modules/user';
import { spaceActions } from 'redux/modules/space';
import { handleError } from 'redux/modules/error';
import { getApiRequest, postApiRequest, apiEndpoint } from 'redux/helpers/api';
import { uploadImage } from 'redux/helpers/firebase';
import fileType from 'helpers/file-type';
import { convertImgixUrl, convertSpaceImgUrl } from 'helpers/imgix';
import { formatName } from 'helpers/string';
import Path from 'config/path';

// Actions
const FETCH_ROOMS_ID_START = 'FETCH_ROOMS_ID_START';
const FETCH_ROOMS_ID_END = 'FETCH_ROOMS_ID_END';
const FETCH_ROOMS_START = 'FETCH_ROOMS_START';
const FETCH_ROOMS_END = 'FETCH_ROOMS_END';
const FETCH_UNREAD_ROOMS_START = 'FETCH_UNREAD_ROOMS_START';
const FETCH_UNREAD_ROOMS_END = 'FETCH_UNREAD_ROOMS_END';
const FETCH_MESSAGES_START = 'FETCH_MESSAGES_START';
const FETCH_MESSAGES_END = 'FETCH_MESSAGES_END';
const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
const MAKE_BOSYU_ROOM = 'MAKE_BOSYU_ROOM';

export const messagesActions = createActions(
  FETCH_ROOMS_ID_START,
  FETCH_ROOMS_ID_END,
  FETCH_ROOMS_START,
  FETCH_ROOMS_END,
  FETCH_UNREAD_ROOMS_START,
  FETCH_UNREAD_ROOMS_END,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_END,
  SEND_MESSAGE,
  UPDATE_MESSAGE,
  MAKE_BOSYU_ROOM,
);

// Reducer

const initialState = {
  rooms: [],
  messages: [],
  room: null,
  isLoading: false,
  unreadRooms: 0,
};

export const messagesReducer = handleActions(
  {
    [FETCH_ROOMS_ID_START]: state => ({ ...state }),
    [FETCH_ROOMS_ID_END]: (state, { payload }) => ({
      ...state,
      roomId: payload.roomId,
    }),
    [FETCH_ROOMS_START]: state => ({ ...state, isLoading: true }),
    [FETCH_ROOMS_END]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      rooms: payload.rooms,
      unreadRooms: payload.unreadRooms,
    }),
    [FETCH_UNREAD_ROOMS_START]: state => ({ ...state, isLoading: true }),
    [FETCH_UNREAD_ROOMS_END]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      unreadRooms: payload.unreadRooms,
    }),
    [FETCH_MESSAGES_START]: state => ({ ...state, messages: [], isLoading: true }),
    [FETCH_MESSAGES_END]: (state, action) => ({
      ...state,
      isLoading: false,
      room: action.payload.room,
    }),
    [UPDATE_MESSAGE]: (state, action) => ({
      ...state,
      messages: [].concat(state.messages, action.payload),
    }),
  },
  initialState,
);

const roomCollection = async () => {
  const firebase = await import('firebase/app');
  await import('firebase/firestore');

  const firestore = firebase.default.firestore();
  return firestore.collection('rooms');
};

// ルーム取得
const getRooms = userId =>
  new Promise(async (resolve, reject) => {
    try {
      const roomCollectionResult = await roomCollection();
      const rooms = await roomCollectionResult.where(`user${userId}`, '==', true).get();
      const res = [];
      rooms.forEach(room => {
        if (room.data().lastMessageDt) {
          res.push({
            id: room.id,
            ...room.data(),
            lastMessageDt: room.data().lastMessageDt.toDate(),
          });
        }
      });
      res.sort((a, b) => (a.lastMessageDt < b.lastMessageDt ? 1 : -1));
      resolve(res);
    } catch (err) {
      captureException(err);
      reject(err);
    }
  });

function* fetchRoomStart() {
  const user = yield select(state => state.auth.user);
  const rooms = yield getRooms(user.id);
  const token = yield* getToken();

  const userIds = rooms.map(r => (user.id === r.userId1 ? r.userId2 : r.userId1));

  const { data, err } = yield call(
    getApiRequest,
    apiEndpoint.users(),
    { ids: userIds.join(',') },
    token,
  );

  if (err) {
    yield handleError('', '', 'fetchRoomStart', err, false);
    return;
  }

  const res = rooms.map(v => {
    const room = v;
    room.isRead = room.isUnsubscribe;
    if (room[`user${user.id}LastReadDt`]) {
      const lastMessageDt = parseInt(room.lastMessageDt.getTime() / 1000, 10);
      const lastReadDt = room[`user${user.id}LastReadDt`].seconds;
      room.isRead = room.isRead || lastMessageDt <= lastReadDt;
    } else {
      room.isRead = false;
    }

    const { userId1, userId2 } = room;
    const partnerId = user.id === userId1 ? userId2 : userId1;
    room.user = data.find(u => u.id === partnerId);
    if (room.user) {
      room.user.imageUrl = convertImgixUrl(room.user.imageUrl, 'w=128&auto=format&auto=compress');
    }

    return room;
  });

  const unreadRooms = res.filter(v => v.isRead === false).length;

  yield put(messagesActions.fetchRoomsEnd({ rooms: res, unreadRooms }));
}

function* fetchUnreadRoomsStart() {
  const user = yield select(state => state.auth.user);
  const rooms = yield getRooms(user.id);

  const res = rooms.map(v => {
    const room = v;
    room.isRead = room.isUnsubscribe;
    if (room[`user${user.id}LastReadDt`]) {
      const lastMessageDt = parseInt(room.lastMessageDt.getTime() / 1000, 10);
      const lastReadDt = room[`user${user.id}LastReadDt`].seconds;
      room.isRead = room.isRead || lastMessageDt <= lastReadDt;
    } else {
      room.isRead = false;
    }
    return room;
  });

  const unreadRooms = res.filter(v => v.isRead === false).length;

  yield put(messagesActions.fetchUnreadRoomsEnd({ unreadRooms }));
}

// メッセージ取得
const getMessages = roomId =>
  new Promise(async (resolve, reject) => {
    try {
      const c = await roomCollection();
      const roomDoc = await c.doc(roomId);
      const messages = await roomDoc.collection('messages').orderBy('createDt').get();

      const room = await roomDoc.get();
      const res = {
        room: room.data(),
        messages: messages.docs.map(v => ({
          id: v.id,
          ...v.data(),
          createDt: v.data().createDt.toDate(),
        })),
        messageObserver: roomDoc.collection('messages'),
      };
      resolve(res);
    } catch (err) {
      captureException(err);
      reject(err);
    }
  });

const subscribeRooms = [];

function messageChannel(observer) {
  return eventChannel(emit => {
    return observer.onSnapshot(snapshot => {
      if (snapshot.docChanges().length === 1) {
        emit(snapshot);
      }
    });
  });
}

function* watchMessages(observer) {
  const messages = yield call(messageChannel, observer);
  try {
    while (true) {
      const snapshot = yield take(messages);
      const message = snapshot.docChanges()[0].doc.data();
      message.createDt = message.createDt.toDate();

      if (message.messageType === 2 || message.messageType === 3) {
        const { requestId } = message;
        const token = yield* getToken();
        const { data } = yield call(getApiRequest, apiEndpoint.requests(requestId), {}, token);
        message.request = data;
      }

      yield put(messagesActions.updateMessage(message));
    }
  } finally {
    if (yield cancelled()) {
      messages.close();
    }
  }
}

function* fetchMessagesStart({ payload: roomId }) {
  if (subscribeRooms.length === 1) {
    yield cancel(subscribeRooms[0]);
    subscribeRooms.shift();
  }

  const user = yield select(state => state.auth.user);

  const messageData = yield getMessages(roomId);
  const { room, messageObserver } = messageData;
  if (!room) {
    yield put(push(Path.pageNotFound()));
    return;
  }

  // アクセス制限
  if (user.id !== 7111 && user.id !== 2613 && user.id !== 9000) {
    if (!(room.userId1 === user.id || room.userId2 === user.id)) {
      yield put(push(Path.pageNotFound()));
      return;
    }
  }

  let { messages } = messageData;
  const token = yield* getToken();

  // 見積もりステータスの取得
  const requestIds = messages.filter(v => v.requestId != null).map(v => v.requestId);
  if (requestIds.length > 0) {
    const { data } = yield call(
      getApiRequest,
      apiEndpoint.requests(),
      { ids: requestIds.join(',') },
      token,
    );

    messages = messages.map(message => {
      if (message.requestId) {
        const request = data.filter(v => v.id === message.requestId)[0];
        return { ...message, request };
      }
      return message;
    });
  }

  // 既読フラグ付加
  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1];
    const c = yield roomCollection();
    c.doc(roomId).set(
      { [`user${user.id}LastRead`]: lastMessage.id, [`user${user.id}LastReadDt`]: new Date() },
      { merge: true },
    );
  } else {
    const c = yield roomCollection();
    c.doc(roomId).set({ [`user${user.id}LastReadDt`]: new Date() }, { merge: true });
  }

  // メッセージが１件のみの場合はobserverから取得した方を使用するためViewとして追加しない
  if (messages.length > 1) {
    yield put(messagesActions.updateMessage(messages));
  }
  const task = yield fork(watchMessages, messageObserver);
  subscribeRooms.push(task);

  const { userId1, userId2, spaceId } = room;

  const partnerUserId = user.id === userId1 ? userId2 : userId1;

  yield put(userActions.fetchUser({ userId: partnerUserId }));
  const { payload: partnerUser } = yield take(userActions.fetchSuccessUser);
  room.user = partnerUser;

  yield put(spaceActions.fetchSpace({ spaceId }));
  const { payload: space } = yield take(spaceActions.fetchSuccessSpace);

  space.images = space.images.map(image => ({
    ...image,
    imageUrl: convertSpaceImgUrl(image.imageUrl, 'w=100&fit=crop'),
  }));

  room.space = space;

  yield put(messagesActions.fetchMessagesEnd({ messages, room }));
}

// ルーム作成
export const createRoom = (
  userId1,
  userName,
  firebaseUid1,
  userId2,
  firebaseUid2,
  spaceId,
  requestUsage,
  requestBreadth,
  requestPackageContents,
  requestPhoneNumber,
  requestNotes,
  requestSetStartDate,
  requestSetEndDate,
) =>
  new Promise(async resolve => {
    let requestMessage = `はじめまして、${formatName(userName)}と申します。
以下の内容で荷物を置けるスペースを探しています。
お見積もりをお願いします。

【期間】
${requestSetStartDate} 〜 ${requestSetEndDate}

【借りたい広さ】
${requestBreadth}

【用途】
${requestUsage}

【荷物の内容】
${requestPackageContents}
`;

    if (requestPhoneNumber) {
      requestMessage += `
【電話番号】
${requestPhoneNumber}
`;
    }

    if (requestNotes) {
      requestMessage += `
【備考】
${requestNotes}`;
    }

    const room = {
      [`user${userId1}`]: true,
      [`user${userId2}`]: true,
      [`space${spaceId}`]: true,
      userId1,
      userId2,
      firebaseUid1,
      firebaseUid2,
      spaceId,
      lastMessageDt: new Date(),
      lastMessage: requestMessage,
      status: 0,
    };
    const roomCollectionResult = await roomCollection();
    const roomRef = await roomCollectionResult.add(room);
    const message = {
      userId: userId1,
      text: requestMessage,
      messageType: 1,
      createDt: new Date(),
    };
    await roomRef.collection('messages').add(message);

    resolve(roomRef.id);
  });

export const getRoomId = (userId1, userId2, spaceId) =>
  new Promise(async resolve => {
    const roomCollectionResult = await roomCollection();
    const rooms = await roomCollectionResult
      .where(`user${userId1}`, '==', true)
      .where(`user${userId2}`, '==', true)
      .where(`space${spaceId}`, '==', true)
      .get();

    if (rooms.size === 1) {
      resolve(rooms.docs[0].id);
      return;
    }
    resolve(false);
  });

function* fetchRoomId({ payload: { guestId, hostId, spaceId } }) {
  const roomId = yield getRoomId(guestId, hostId, spaceId);
  yield put(messagesActions.fetchRoomsIdEnd({ roomId }));
}

// メッセージ送信
function* sendMessage(payload) {
  try {
    const { roomId, userId, text, image } = payload;

    let imageUrl;
    if (image) {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(image);
      const ext = yield call(
        () =>
          new Promise(resolve => {
            fileReader.onload = () => {
              const imageType = fileType(fileReader.result);
              resolve(imageType.ext);
            };
          }),
      );
      const timeStamp = Date.now();
      imageUrl = yield call(() => uploadImage(`/${roomId}/${userId}/${timeStamp}.${ext}`, image));
    }

    return yield new Promise(async resolve => {
      const message = {
        userId,
        text,
        messageType: 1,
        createDt: new Date(),
      };
      if (imageUrl) {
        message.image = imageUrl;
      }
      const c = await roomCollection();
      const roomDoc = await c.doc(roomId);
      const messageDoc = await roomDoc.collection('messages').add(message);
      await roomDoc.set(
        {
          lastMessage: message.text,
          lastMessageDt: new Date(),
          [`user${userId}LastReadDt`]: new Date(),
        },
        { merge: true },
      );
      resolve(messageDoc.id);
    });
  } catch (err) {
    return captureException(err);
  }
}

function* sendEmail(payload, messageDocId) {
  const { roomId, toUserId, text } = payload;

  const token = yield* getToken();
  const { data: toUser, err } = yield call(getApiRequest, apiEndpoint.users(toUserId), {}, token);
  if (err) {
    yield handleError('', '', 'sendEmail', err, false);
    return;
  }

  const user = yield select(state => state.auth.user);

  const name = user.name !== '' ? `${formatName(user.name)}さんから` : '';
  let messageBody = `${name}メッセージが届いています。\n\n`;

  if (text.length !== 0) {
    messageBody += text;
  } else {
    messageBody = '画像が届いています。';
  }

  messageBody += '\n\n返信するには以下のリンクをクリックしてください。\n';

  // TODO 開発環境バレ防止の為、URLは環境変数にいれる
  messageBody += `${process.env.NEXT_PUBLIC_MESSAGE_BASE_URL}${roomId}\n\n\n`;
  messageBody += '◯取引全体の流れはこちら\n';
  messageBody += '・荷物を預けたい方\n';
  messageBody += '1. 見積もり　　ホストと相談して見積もりをもらいましょう。\n';
  messageBody += '2. 決済　　　　見積もりを確認して決済しましょう。\n';
  messageBody += '3. 住所を確認　決済の完了が確認されるとホストの詳細住所が届きます。\n';
  messageBody += '4. 荷物を送る　荷物を送ってお預けを開始しましょう。\n';
  messageBody += '5. 荷物を回収　期間が終わったら荷物を回収して取引終了です！\n';
  messageBody += '詳しくはこちら https://help.monooq.com/ja/articles/3029220-\n\n';
  messageBody += '・スペースを貸したい方\n';
  messageBody += '1. 見積もり　　　　ゲストと相談して見積もりを出しましょう。\n';
  messageBody += '2. 決済　　　　　　見積もりを確認して決済しましょう。\n';
  messageBody += '3. 荷物を受け取る　荷物を受け取りお預けを開始しましょう。\n';
  messageBody += '4. 荷物を引き渡し　期間が終わったら荷物を回収してもらい取引終了です！\n';
  messageBody += '詳しくはこちら https://help.monooq.com/ja/articles/3029212-\n\n\n';

  messageBody += '◯月額決済に対応しています！\n';
  messageBody += '詳しくはこちら https://help.monooq.com/ja/articles/3694521-\n\n\n';

  const body = {
    Subject: '【モノオク】新しいメッセージが届いています！',
    Uid: toUser.firebaseUid,
    Body: messageBody,
    Category: 'message',
    CustomData: { messageDocId },
  };

  yield call(postApiRequest, apiEndpoint.sendMail(), body, token);
}

function* sendHostFirstEmail(payload, messageDocId) {
  const { roomId, toUserId, text } = payload;

  const token = yield* getToken();
  const { data: toUser, err } = yield call(getApiRequest, apiEndpoint.users(toUserId), {}, token);
  if (err) {
    yield handleError('', '', 'sendEmail', err, false);
    return;
  }

  const user = yield select(state => state.auth.user);

  let messageBody = `${toUser.name}さんモノオクのご利用ありがとうございます。\n\n`;
  messageBody += `ホストの${user.name}さんが${toUser.name}さんの荷物を預かることができます。\n`;
  messageBody += `荷物の内容や利用希望の広さを伝え、気軽に相談してみましょう。\n\n`;

  messageBody += 'ーーーーーーーーーーーーーーーーー\n';
  messageBody += 'ホストからのメッセージ:\n';
  if (text.length !== 0) {
    messageBody += text;
  } else {
    messageBody = '画像が届いています。';
  }

  messageBody += '\n\n↓こちらからホストにメッセージを送ることが出来ます。↓\n';

  // TODO 開発環境バレ防止の為、URLは環境変数にいれる
  messageBody += `${process.env.NEXT_PUBLIC_MESSAGE_BASE_URL}${roomId}\n`;
  messageBody += 'ーーーーーーーーーーーーーーーーー\n\n';
  messageBody +=
    '※希望条件をご回答いただいたゲストのみなさまに、預かれるホストから応募があった際にこちらのメールをお送りしております。\n\n';

  const body = {
    Subject: `【モノオク】${formatName(
      user.name,
    )}さんがあなたの荷物を預かれます！スペースを見てみましょう。\n`,
    Uid: toUser.firebaseUid,
    Body: messageBody,
    Category: 'message',
    CustomData: { messageDocId },
  };

  yield call(postApiRequest, apiEndpoint.sendMail(), body, token);
}

function* sendSMS(payload) {
  const { roomId, toUserId } = payload;

  const token = yield* getToken();
  const user = yield select(state => state.auth.user);

  const name = user.name !== '' ? `${user.name}さんから` : '';
  let messageBody = `【モノオク】${name}メッセージが届いています。下記リンクからご確認ください。\n\n`;

  // TODO 開発環境バレ防止の為、URLは環境変数にいれる
  messageBody += `${process.env.NEXT_PUBLIC_MESSAGE_BASE_URL}${roomId}`;

  const body = {
    UserId: toUserId,
    Body: messageBody,
  };

  yield call(postApiRequest, apiEndpoint.sendSMS(), body, token);
}

function* sendMessageAndNotice({ payload }) {
  const messageDocId = yield sendMessage(payload);
  if (payload.isHostFirst) {
    yield sendHostFirstEmail(payload, messageDocId);
  } else {
    yield sendEmail(payload, messageDocId);
  }
  yield sendSMS(payload);
}

function* makeBosyuRoom({ payload }) {
  const token = yield* getToken();
  const { data, err } = yield call(postApiRequest, apiEndpoint.bosyu(payload), {}, token);
  if (err) {
    yield handleError('', '', 'makeBosyuRoom', err, false);
    return;
  }
  yield put(push(Path.message(data.roomId)));
}

// Sagas
export const messagesSagas = [
  takeEvery(FETCH_ROOMS_ID_START, fetchRoomId),
  takeEvery(FETCH_ROOMS_START, fetchRoomStart),
  takeEvery(FETCH_UNREAD_ROOMS_START, fetchUnreadRoomsStart),
  takeEvery(FETCH_MESSAGES_START, fetchMessagesStart),
  takeEvery(SEND_MESSAGE, sendMessageAndNotice),
  takeEvery(MAKE_BOSYU_ROOM, makeBosyuRoom),
];
