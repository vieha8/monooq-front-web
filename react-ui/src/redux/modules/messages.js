import { createActions, handleActions } from 'redux-actions';
import { eventChannel } from 'redux-saga';
import { put, call, takeEvery, take, select, fork, cancel, cancelled } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { push } from 'connected-react-router';
import { captureException } from '@sentry/browser';
import { getToken } from 'redux/modules/auth';
import { userActions } from 'redux/modules/user';
import { spaceActions } from 'redux/modules/space';
import { handleError } from 'redux/modules/error';
import { getApiRequest, postApiRequest, apiEndpoint } from 'redux/helpers/api';
import { uploadImage } from 'redux/helpers/firebase';
import fileType from 'helpers/file-type';
import { convertImgixUrl } from 'helpers/imgix';
import { formatName } from 'helpers/string';
import Path from 'config/path';

// Actions
const FETCH_ROOMS_START = 'FETCH_ROOMS_START';
const FETCH_ROOMS_END = 'FETCH_ROOMS_END';
const FETCH_UNREAD_ROOMS_START = 'FETCH_UNREAD_ROOMS_START';
const FETCH_UNREAD_ROOMS_END = 'FETCH_UNREAD_ROOMS_END';
const FETCH_MESSAGES_START = 'FETCH_MESSAGES_START';
const FETCH_MESSAGES_END = 'FETCH_MESSAGES_END';
const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

export const messagesActions = createActions(
  FETCH_ROOMS_START,
  FETCH_ROOMS_END,
  FETCH_UNREAD_ROOMS_START,
  FETCH_UNREAD_ROOMS_END,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_END,
  SEND_MESSAGE,
  UPDATE_MESSAGE,
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

const roomCollection = () => {
  const firestore = firebase.firestore();
  return firestore.collection('rooms');
};

// ルーム取得
const getRooms = userId =>
  new Promise(async (resolve, reject) => {
    try {
      const rooms = await roomCollection()
        .where(`user${userId}`, '==', true)
        .get();
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
    }

    const { userId1, userId2 } = room;
    const partnerId = user.id === userId1 ? userId2 : userId1;
    room.user = data.find(u => u.id === partnerId);
    if (room.user) {
      room.user.imageUrl = convertImgixUrl(room.user.imageUrl, 'w=32&auto=format');
    }

    return room;
  });

  const unreadRooms = res.filter(v => v.isRead === false).length;

  yield put(messagesActions.fetchRoomsEnd({ rooms: res, unreadRooms }));
}

function* fetchUnreadRooms() {
  const user = yield select(state => state.auth.user);
  const rooms = yield getRooms(user.id);

  const res = rooms.map(v => {
    const room = v;
    room.isRead = room.isUnsubscribe;
    if (room[`user${user.id}LastReadDt`]) {
      const lastMessageDt = parseInt(room.lastMessageDt.getTime() / 1000, 10);
      const lastReadDt = room[`user${user.id}LastReadDt`].seconds;
      room.isRead = room.isRead || lastMessageDt <= lastReadDt;
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
      const roomDoc = roomCollection().doc(roomId);
      const messages = await roomDoc
        .collection('messages')
        .orderBy('createDt')
        .get();

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
        // TODO 見積もり＆決済完了時の情報取得処理
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
    yield put(push(Path.notFound()));
    return;
  }

  let { messages } = messageData;
  const token = yield* getToken();

  // 見積もりステータスの取得
  messages = yield Promise.all(
    messages.map(async message => {
      const { messageType } = message;
      if (messageType === 1) {
        return message;
      }
      const { requestId } = message;
      const { data } = await getApiRequest(apiEndpoint.requests(requestId), {}, token);
      message.request = data;
      return message;
    }),
  );

  // 既読フラグ付加
  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1];
    roomCollection()
      .doc(roomId)
      .set(
        { [`user${user.id}LastRead`]: lastMessage.id, [`user${user.id}LastReadDt`]: new Date() },
        { merge: true },
      );
  } else {
    roomCollection()
      .doc(roomId)
      .set({ [`user${user.id}LastReadDt`]: new Date() }, { merge: true });
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
  room.space = space;

  yield put(messagesActions.fetchMessagesEnd({ messages, room }));
}

// ルーム作成
export const createRoom = (userId1, userName, firebaseUid1, userId2, firebaseUid2, spaceId) =>
  new Promise(async resolve => {
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
      lastMessage: `${formatName(userName)}さんが興味を持っています`,
      status: 0,
    };
    const roomRef = await roomCollection().add(room);
    resolve(roomRef.id);
  });

export const getRoomId = (userId1, userId2, spaceId) =>
  new Promise(async resolve => {
    const rooms = await roomCollection()
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
      const roomDoc = roomCollection().doc(roomId);
      await roomDoc.collection('messages').add(message);
      await roomDoc.set(
        {
          lastMessage: message.text,
          lastMessageDt: new Date(),
          [`user${userId}LastReadDt`]: new Date(),
        },
        { merge: true },
      );
      resolve();
    });
  } catch (err) {
    return captureException(err);
  }
}

function* sendEmail(payload) {
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
  if (process.env.REACT_APP_ENV === 'production') {
    messageBody += `https://monooq.com/messages/${roomId}`;
  } else {
    messageBody += `https://monooq-front-web-dev.herokuapp.com/messages/${roomId}`;
  }

  const body = {
    Subject: 'メッセージが届いています：モノオクからのお知らせ',
    Uid: toUser.firebaseUid,
    Body: messageBody,
    Category: 'message',
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
  if (process.env.REACT_APP_ENV === 'production') {
    messageBody += `https://monooq.com/messages/${roomId}`;
  } else {
    messageBody += `https://monooq-front-web-dev.herokuapp.com/messages/${roomId}`;
  }

  const body = {
    UserId: toUserId,
    Body: messageBody,
  };

  yield call(postApiRequest, apiEndpoint.sendSMS(), body, token);
}

function* sendMessageAndNotice({ payload }) {
  yield sendMessage(payload);
  yield sendEmail(payload);
  yield sendSMS(payload);
}

// Sagas
export const messagesSagas = [
  takeEvery(FETCH_ROOMS_START, fetchRoomStart),
  takeEvery(FETCH_UNREAD_ROOMS_START, fetchUnreadRooms),
  takeEvery(FETCH_MESSAGES_START, fetchMessagesStart),
  takeEvery(SEND_MESSAGE, sendMessageAndNotice),
];
