import mysql from 'promise-mysql';
import firebase from 'firebase';
import firestore from '../admin/helpers/firestore';
require('firebase/firestore');

try {
  firebase.initializeApp({
    apiKey: 'AIzaSyAOzkRrYFUdzQ2kuwMyTjrjcsbhKOfuQVo',
    authDomain: 'monooq-prod.firebaseapp.com',
    databaseURL: 'https://monooq-prod.firebaseio.com',
    projectId: 'monooq-prod',
    storageBucket: 'monooq-prod.appspot.com',
    messagingSenderId: '569699475393',
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const getMessageRate = async () => {
  const rooms = await firestore.collection('rooms').get();

  const messageCounts = {};

  const zeroMessageUsers = [];

  const res = await Promise.all(
    rooms.docs.map(async room => {
      const roomId = room.id;
      const messages = await firestore
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .get();
      const messageCount = messages.docs.length;

      let key = messageCount;
      if (messageCount > 1) {
        key = 2;
      }

      if (messageCount === 0) {
        zeroMessageUsers.push(room.data().userId1);
      }

      if (messageCounts[key]) {
        messageCounts[key] += 1;
      } else {
        messageCounts[key] = 1;
      }
    }),
  );

  const allRoomCount = res.length;

  zeroMessageUsers.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  return messageCounts[2] / (allRoomCount - messageCounts[0]);
};

const aggregateKPI = async () => {
  const sql = await mysql.createConnection({
    host: 'monooq-prod.cfscers6catt.ap-northeast-1.rds.amazonaws.com',
    port: 3306,
    database: 'monooq',
    user: 'monooq',
    password: '5Fb9N7Vu',
  });

  const messageRate = await getMessageRate();
  const q = 'INSERT INTO kpi_message_response_rate(date, rate) VALUES(CURDATE(), ?)';
  await sql.query(q, [messageRate]);

  // TODO デイリーの新規登録ユーザー数
  // TODO デイリーの新規登録スペース数
  // TODO デイリーの新規成約数
  // TODO デイリーの新規リクエスト数

  sql.end();
  console.log('aggregate KPI Success!');
};

aggregateKPI();
