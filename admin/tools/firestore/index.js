import admin from 'firebase-admin';
import config from './firebase.json';

admin.initializeApp({
  credential: admin.credential.cert(config),
});

const db = admin.firestore();

const getRooms = async userId => {
  const rooms = await db
    .collection('rooms')
    .where(`user${userId}`, '==', true)
    .get();
  rooms.forEach(doc => {
    console.log(doc.id);
    console.log(doc.data());
  });
  return rooms;
};

getRooms(process.argv[2]);
