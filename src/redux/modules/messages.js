import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase';
import fileType from 'file-type';
import { uploadImage } from '../helpers/firebase';
require('firebase/firestore');

//Actions
const FETCH_ROOMS_START = 'FETCH_ROOMS_START';
const FETCH_ROOMS_END = 'FETCH_ROOMS_END';
const FETCH_MESSAGES_START = 'FETCH_MESSAGES_START';
const FETCH_MESSAGES_END = 'FETCH_MESSAGES_END';
const SEND_MESSAGE = 'SEND_MESSAGE';

export const messagesActions = createActions(
  FETCH_ROOMS_START,
  FETCH_ROOMS_END,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_END,
  SEND_MESSAGE,
);

//Reducer

const initialState = {
  rooms: [],
  messages: [],
  isLoading: false,
};

export const messagesReducer = handleActions(
  {
    [FETCH_ROOMS_START]: state => ({ ...state, isLoading: true }),
    [FETCH_ROOMS_END]: (state, action) => ({ ...state, isLoading: false, rooms: action.payload }),
    [FETCH_MESSAGES_START]: state => ({ ...state, isLoading: true }),
    [FETCH_MESSAGES_END]: (state, action) => ({
      ...state,
      isLoading: false,
      messages: action.payload,
    }),
    [SEND_MESSAGE]: state => ({ ...state }),
  },
  initialState,
);

//Sagas
export const messagesSagas = [
  takeEvery(FETCH_ROOMS_START, function*({ payload }) {
    const rooms = yield getRooms(payload);
    yield put(messagesActions.fetchRoomsEnd(rooms));
  }),
  takeEvery(FETCH_MESSAGES_START, function*({ payload }) {
    const messages = yield getMessages(payload);
    yield put(messagesActions.fetchMessagesEnd(messages));
  }),
  takeEvery(SEND_MESSAGE, function*({ payload }) {
    yield sendMessage(payload);
    yield put(messagesActions.fetchMessagesStart(payload.roomId));
  }),
];

//ルーム作成
export const createRoom = (userId1, userId2) => {
  return new Promise(async resolve => {
    const room = {
      [userId1]: true,
      [userId2]: true,
    };
    const db = firebase.firestore();
    const roomRef = await db.collection('rooms').add(room);
    resolve(roomRef.id);
  });
};

export const isExistRoom = (userId1, userId2) => {
  return new Promise(async resolve => {
    const db = firebase.firestore();
    const rooms = await db
      .collection('rooms')
      .where(userId1, '==', true)
      .where(userId2, '==', true)
      .get();

    if (rooms.size === 1) {
      resolve(rooms.docs[0].id);
      return;
    }
    resolve(false);
  });
};

//ルーム取得
const getRooms = userId => {
  return new Promise(async resolve => {
    const db = firebase.firestore();
    const rooms = await db
      .collection('rooms')
      .where(userId, '==', true)
      .get();
    const res = [];
    rooms.forEach(room => {
      res.push({
        id: room.id,
        ...room.data(),
      });
    });
    resolve(res);
  });
};

//メッセージ取得
const getMessages = roomId => {
  return new Promise(async resolve => {
    const db = firebase.firestore();
    const messages = await db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('createDt')
      .get();
    const res = [];
    messages.forEach(message => {
      res.push({
        id: message.id,
        ...message.data(),
      });
    });
    resolve(res);
  });
};

//メッセージ送信
const sendMessage = function*(payload) {
  const { roomId, userId, text, image } = payload;

  let imageUrl;
  if (image) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(image);
    const ext = yield call(() => {
      return new Promise(resolve => {
        fileReader.onload = () => {
          const imageType = fileType(fileReader.result);
          resolve(imageType.ext);
        };
      });
    });
    const timeStamp = Date.now();
    imageUrl = yield call(() => uploadImage(`/${roomId}/${userId}/${timeStamp}.${ext}`, image));
  }

  return yield new Promise(async resolve => {
    const db = firebase.firestore();
    const message = {
      userId: userId,
      text: text,
      messageType: 1,
      createDt: new Date(),
    };
    if (imageUrl) {
      message.image = imageUrl;
    }
    await db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add(message);
    resolve();
  });
};
