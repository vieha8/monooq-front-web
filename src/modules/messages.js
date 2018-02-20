import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase';
import faker from 'faker';
require('firebase/firestore');

//Actions
const FETCH_ROOMS_START = 'FETCH_ROOMS_START';
const FETCH_ROOMS_END = 'FETCH_ROOMS_END';
const FETCH_MESSAGES_START = 'FETCH_MESSAGES_START';
const FETCH_MESSAGES_END = 'FETCH_MESSAGES_END';

export const messagesActions = createActions(
  FETCH_ROOMS_START,
  FETCH_ROOMS_END,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_END,
);

//Reducer

const initialState = {
  rooms: [],
  messages: [],
  isLoading: false,
};

const { fetchRoomsStart, fetchRoomsEnd, fetchMessagesStart, fetchMessagesEnd } = messagesActions;
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
  },
  initialState,
);

//Sagas
function* fetchRooms(action) {
  const rooms = yield call(() => getRooms(action.payload));
  yield put(fetchRoomsEnd(rooms));
}

function* fetchMessages(action) {
  const messages = yield call(() => getMessages(action.payload));
  yield put(fetchMessagesEnd(messages));
}

export const messagesSagas = [
  takeEvery(FETCH_ROOMS_START, fetchRooms),
  takeEvery(FETCH_MESSAGES_START, fetchMessages),
];

//ルーム作成

export const createRoom = async () => {
  const fn = faker.name.firstName();
  const ln = faker.name.lastName();
  const name = fn + ' ' + ln;
  const profile = faker.image.avatar();

  const roomSample = {
    ownerUserId: '1',
    guestUserId: '1',
    guestUserName: name,
    guestUserImgUrl: profile,
    lastMessage: '田中さん初めまして!メッセージありがとうございます。ぜひお預かりさせてください。',
    lastMessageDt: new Date(),
  };

  const db = firebase.firestore();
  const roomRef = await db.collection('rooms').add(roomSample);

  const messageSample = {
    userId: '1',
    messageType: 1,
    text: '田中さん初めまして!メッセージありがとうございます。ぜひお預かりさせてください。',
    createDt: new Date(),
  };

  roomRef.collection('messages').add(messageSample);
  roomRef.collection('messages').add(messageSample);
  roomRef.collection('messages').add(messageSample);
  roomRef.collection('messages').add(messageSample);
  roomRef.collection('messages').add(messageSample);
};

//ルーム取得
const getRooms = userId => {
  return new Promise(async resolve => {
    const db = firebase.firestore();
    const rooms = await db
      .collection('rooms')
      .where('ownerUserId', '==', userId)
      // .orderBy('lastMessageDt', 'desc') TODO なんかエラー出る
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

//最終メッセージ更新

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

//メッセージ追加
