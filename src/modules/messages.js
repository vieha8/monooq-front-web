import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase';
import faker from 'faker';
require('firebase/firestore');

//Actions
const FETCH_ROOMS_START = 'FETCH_ROOMS_START';
const FETCH_ROOMS_END = 'FETCH_ROOMS_END';

export const messagesActions = createActions(FETCH_ROOMS_START, FETCH_ROOMS_END);

//Reducer

const initialState = {
  rooms: [],
  isLoading: false,
};

const { fetchRoomsStart, fetchRoomsEnd } = messagesActions;
export const messagesReducer = handleActions(
  {
    [fetchRoomsStart]: state => ({ ...state, isLoading: true }),
    [fetchRoomsEnd]: (state, action) => ({ ...state, isLoading: false, rooms: action.payload }),
  },
  initialState,
);

//Sagas
function* fetchRooms(action) {
  const rooms = yield call(() => getRooms(action.payload));
  yield put(fetchRoomsEnd(rooms));
}

export const messagesSagas = [takeEvery(FETCH_ROOMS_START, fetchRooms)];

//ルーム作成

export const createRoom = async () => {
  const fn = faker.name.firstName();
  const ln = faker.name.lastName();
  const name = fn + ' ' + ln;
  const profile = faker.image.avatar();

  const data = {
    ownerUserId: '1',
    guestUserId: '1',
    guestUserName: name,
    guestUserImgUrl: profile,
    lastMessage: '田中さん初めまして!メッセージありがとうございます。ぜひお預かりさせてください。',
    lastMessageDt: new Date(),
  };

  const db = firebase.firestore();
  db.collection('rooms').add(data);
};

//ルーム取得
export const getRooms = userId => {
  return new Promise(async resolve => {
    const db = firebase.firestore();
    const rooms = await db
      .collection('rooms')
      .where('ownerUserId', '==', userId)
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

//メッセージ追加
