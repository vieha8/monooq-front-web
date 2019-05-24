import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, take, select } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { push } from 'connected-react-router';
import { authActions, getToken } from './auth';
import { userActions } from './user';
import { spaceActions } from './space';
import { getApiRequest, postApiRequest, apiEndpoint } from '../helpers/api';
import fileType from '../../helpers/file-type';
import { uploadImage } from '../helpers/firebase';
import { store } from '../store/index';
import Path from '../../config/path';
import { convertImgixUrl } from '../../helpers/imgix';

let messageObserverUnsubscribe = null;

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
    } catch (e) {
      reject(e);
    }
  });

function* fetchRoomStart() {
  const user = yield select(state => state.auth.user);
  const rooms = yield getRooms(user.ID);
  const token = yield* getToken();

  const userIds = rooms.map(r => (user.ID === r.userId1 ? r.userId2 : r.userId1));

  const { data } = yield call(
    getApiRequest,
    apiEndpoint.users(),
    { ids: userIds.join(',') },
    token,
  );

  const res = rooms.map(v => {
    const room = v;
    room.isRead = room.isUnsubscribe;
    if (room[`user${user.ID}LastReadDt`]) {
      const lastMessageDt = parseInt(room.lastMessageDt.getTime() / 1000, 10);
      const lastReadDt = room[`user${user.ID}LastReadDt`].seconds;
      room.isRead = room.isRead || lastMessageDt <= lastReadDt;
    }

    const { userId1, userId2 } = room;
    const partnerId = user.ID === userId1 ? userId2 : userId1;
    room.user = data.find(u => u.ID === partnerId);
    if (room.user) {
      room.user.ImageUrl = convertImgixUrl(room.user.ImageUrl, 'w=32&auto=format');
    }

    return room;
  });

  const unreadRooms = res.filter(v => v.isRead === false).length;

  yield put(messagesActions.fetchRoomsEnd({ rooms: res, unreadRooms }));
}

function* fetchUnreadRooms() {
  const user = yield select(state => state.auth.user);
  const rooms = yield getRooms(user.ID);

  const res = rooms.map(v => {
    const room = v;
    room.isRead = room.isUnsubscribe;
    if (room[`user${user.ID}LastReadDt`]) {
      const lastMessageDt = parseInt(room.lastMessageDt.getTime() / 1000, 10);
      const lastReadDt = room[`user${user.ID}LastReadDt`].seconds;
      room.isRead = room.isRead || lastMessageDt <= lastReadDt;
    }
    return room;
  });

  const unreadRooms = res.filter(v => v.isRead === false).length;

  yield put(messagesActions.fetchUnreadRoomsEnd({ unreadRooms }));
}

function messagesUnsubscribe() {
  if (messageObserverUnsubscribe) {
    messageObserverUnsubscribe();
    messageObserverUnsubscribe = null;
  }
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
      reject(err);
    }
  });

function* fetchMessagesStart({ payload }) {
  yield messagesUnsubscribe();

  let user = yield select(state => state.auth.user);
  if (!user.ID) {
    yield take(authActions.checkLoginSuccess);
  }
  user = yield select(state => state.auth.user);

  const messageData = yield getMessages(payload);
  const { room, messageObserver } = messageData;
  let { messages } = messageData;

  const token = yield* getToken();

  if (!room) {
    store.dispatch(push(Path.notFound()));
    return;
  }

  // 見積もりステータスの取得
  messages = yield Promise.all(
    messages.map(async message => {
      const { messageType } = message;
      if (messageType !== 2) {
        return message;
      }
      const { requestId } = message;
      const { data } = await getApiRequest(apiEndpoint.requests(requestId), {}, token);
      message.request = data;
      return message;
    }),
  );

  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1];
    roomCollection()
      .doc(payload)
      .set(
        { [`user${user.ID}LastRead`]: lastMessage.id, [`user${user.ID}LastReadDt`]: new Date() },
        { merge: true },
      );
  } else {
    roomCollection()
      .doc(payload)
      .set({ [`user${user.ID}LastReadDt`]: new Date() }, { merge: true });
  }

  // メッセージが１件のみの場合はfirebaseから取得した方を使用するためViewとして追加しない
  if (messages.length > 1) {
    store.dispatch(messagesActions.updateMessage(messages));
  }

  if (!messageObserverUnsubscribe) {
    messageObserverUnsubscribe = messageObserver.onSnapshot(snapshot => {
      if (snapshot.docChanges().length === 1) {
        const message = snapshot.docChanges()[0].doc.data();
        message.createDt = message.createDt.toDate();
        store.dispatch(messagesActions.updateMessage(message));
        const messageId = snapshot.docChanges()[0].doc.id;
        roomCollection()
          .doc(payload)
          .set(
            { [`user${user.ID}LastRead`]: messageId, [`user${user.ID}LastReadDt`]: new Date() },
            { merge: true },
          );
      }
    });
  }

  const { userId1, userId2, spaceId } = room;

  const partnerUserId = user.ID === userId1 ? userId2 : userId1;

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
      lastMessage: `${userName}さんが興味を持っています`,
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
}

function* sendEmail(payload) {
  const { roomId, toUserId, text } = payload;

  const token = yield* getToken();
  const { data: toUser } = yield call(getApiRequest, apiEndpoint.users(toUserId), {}, token);

  if (!toUser.IsNoticeEmail) {
    return;
  }

  const user = yield select(state => state.auth.user);

  const name = user.Name !== '' ? `${user.Name}さんから` : '';
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
    Address: toUser.Email,
    Body: messageBody,
    Category: 'message',
  };

  yield call(postApiRequest, apiEndpoint.sendMail(), body, token);
}

function* sendSMS(payload) {
  const { roomId, toUserId } = payload;

  const token = yield* getToken();
  const user = yield select(state => state.auth.user);

  const name = user.Name !== '' ? `${user.Name}さんから` : '';
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
