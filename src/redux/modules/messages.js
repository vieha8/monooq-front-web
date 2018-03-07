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

const {
  fetchRoomsStart,
  fetchRoomsEnd,
  fetchMessagesStart,
  fetchMessagesEnd,
  sendMessage,
} = messagesActions;
export const messagesReducer = handleActions(
  {
    [fetchRoomsStart]: state => ({ ...state, isLoading: true }),
    [fetchRoomsEnd]: (state, action) => ({ ...state, isLoading: false, rooms: action.payload }),
    [fetchMessagesStart]: state => ({ ...state, isLoading: true }),
    [fetchMessagesEnd]: (state, action) => ({
      ...state,
      isLoading: false,
      messages: action.payload,
    }),
    [sendMessage]: state => ({ ...state }),
  },
  initialState,
);

//Sagas
export const messagesSagas = [
  takeEvery(FETCH_ROOMS_START, function*(action) {
    const rooms = yield call(() => getRooms(action.payload));
    yield put(fetchRoomsEnd(rooms));
  }),
  takeEvery(FETCH_MESSAGES_START, function*(action) {
    const messages = yield call(() => getMessages(action.payload));
    yield put(fetchMessagesEnd(messages));
  }),
  takeEvery(SEND_MESSAGE, function*(action) {
    const { roomId, userId, text, image } = action.payload;

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

    yield call(() => {
      return new Promise(async resolve => {
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
    });
    yield put(fetchMessagesStart(roomId));
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
