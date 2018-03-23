import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, take, select, all } from 'redux-saga/effects';
import { authActions } from './auth';
import { userActions } from './user';
import { apiEndpoint } from './api';
import { getApiRequest } from '../helpers/api';
import firebase from 'firebase';
import fileType from '../../helpers/file-type';
import { uploadImage } from '../helpers/firebase';
import { store } from '../store/configureStore';

require('firebase/firestore');

//Actions
const FETCH_ROOMS_START = 'FETCH_ROOMS_START';
const FETCH_ROOMS_END = 'FETCH_ROOMS_END';
const FETCH_MESSAGES_START = 'FETCH_MESSAGES_START';
const FETCH_MESSAGES_END = 'FETCH_MESSAGES_END';
const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

export const messagesActions = createActions(
  FETCH_ROOMS_START,
  FETCH_ROOMS_END,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_END,
  SEND_MESSAGE,
  UPDATE_MESSAGE,
);

//Reducer

const initialState = {
  rooms: [],
  messages: [],
  room: null,
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
      messages: action.payload.messages,
      room: action.payload.room,
    }),
    [UPDATE_MESSAGE]: (state, action) => ({
      ...state,
      messages: [...state.messages, action.payload],
    }),
  },
  initialState,
);

//Sagas
export const messagesSagas = [
  takeEvery(FETCH_ROOMS_START, function*() {
    let user = yield select(state => state.auth.user);
    if (!user.ID) {
      yield take(authActions.checkLoginSuccess);
    }
    user = yield select(state => state.auth.user);

    const rooms = yield getRooms(user.ID);

    const users = yield all(
      rooms.map(room => {
        const { userId1, userId2 } = room;
        const id = user.ID === userId1 ? userId2 : userId1;
        return call(getApiRequest, apiEndpoint.users(id));
      }),
    );

    const res = rooms.map((room, i) => {
      //TODO エラーハンドリング
      room.user = users[i].data;
      return room;
    });

    yield put(messagesActions.fetchRoomsEnd(res));
  }),
  takeEvery(FETCH_MESSAGES_START, function*({ payload }) {
    let user = yield select(state => state.auth.user);
    if (!user.ID) {
      yield take(authActions.checkLoginSuccess);
    }
    user = yield select(state => state.auth.user);

    const { messages, room, messageObserver } = yield getMessages(payload);

    messageObserver.onSnapshot(snapshot => {
      if (snapshot.docChanges.length === 1) {
        const message = snapshot.docChanges[0].doc.data();
        store.dispatch(messagesActions.updateMessage(message));
      }
    });

    const { userId1, userId2 } = room;
    const partnerUserId = user.ID === userId1 ? userId2 : userId1;

    yield put(userActions.fetchUser({ userId: partnerUserId }));
    const { payload: partnerUser } = yield take(userActions.fetchSuccessUser);
    room.user = partnerUser;

    yield put(messagesActions.fetchMessagesEnd({ messages, room }));
  }),
  takeEvery(SEND_MESSAGE, function*({ payload }) {
    yield sendMessage(payload);
  }),
];

//ルーム作成
export const createRoom = (userId1, firebaseUid1, userId2, firebaseUid2, spaceId) => {
  return new Promise(async resolve => {
    const room = {
      [`user${userId1}`]: true,
      [`user${userId2}`]: true,
      [`space${spaceId}`]: true,
      userId1,
      userId2,
      firebaseUid1,
      firebaseUid2,
      spaceId,
    };
    const db = firebase.firestore();
    const roomRef = await db.collection('rooms').add(room);
    resolve(roomRef.id);
  });
};

export const getRoomId = (userId1, userId2, spaceId) => {
  return new Promise(async resolve => {
    const db = firebase.firestore();
    const rooms = await db
      .collection('rooms')
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
};

//ルーム取得
const getRooms = userId => {
  return new Promise(async resolve => {
    const db = firebase.firestore();
    const rooms = await db
      .collection('rooms')
      .where(`user${userId}`, '==', true)
      .get();
    const res = [];
    rooms.forEach(room => {
      if (room.data().lastMessageDt) {
        res.push({
          id: room.id,
          ...room.data(),
        });
      }
    });
    resolve(res);
  });
};

//メッセージ取得
const getMessages = roomId => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = firebase.firestore();
      const roomDoc = db.collection('rooms').doc(roomId);
      const messages = await roomDoc
        .collection('messages')
        .orderBy('createDt')
        .get();

      const room = await roomDoc.get();
      const res = {
        room: room.data(),
        messages: messages.docs.map(v => ({ id: v.id, ...v.data() })),
        messageObserver: roomDoc.collection('messages'),
      };

      resolve(res);
    } catch (err) {
      console.error(err);
      reject(err);
    }
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

    const roomDoc = db.collection('rooms').doc(roomId);
    await roomDoc.collection('messages').add(message);
    await roomDoc.set(
      {
        lastMessage: message.text,
        lastMessageDt: new Date(),
      },
      { merge: true },
    );

    resolve();
  });
};
