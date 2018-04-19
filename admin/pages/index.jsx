import React from 'react';
import Link from 'next/link';
import firebase from 'firebase';
import Layout from '../components/Layout';
require('firebase/firestore');

import { Table } from 'semantic-ui-react';

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
    console.error('Firebase initialization error', err.stack)
  }
}

const getMessageCount = async (roomId) => {
  return messages.docs.length;
};

export default class extends React.Component {

  static async getInitialProps() {
    const firestore = firebase.firestore();
    const rooms = await firestore.collection('rooms').get();

    const res = await Promise.all(rooms.docs.map(async room => {
      const roomId = room.id;
      const userId1 = room.data().userId1;
      const userId2 = room.data().userId2;
      const spaceId = room.data().spaceId;
      let lastMessageDt = new Date();
      if (room.data().lastMessageDt) {
        lastMessageDt = room.data().lastMessageDt;
      }
      const messages = await firestore.collection('rooms').doc(roomId).collection('messages').get();
      const messageCount = messages.docs.length;

      const lastMessage = room.data().lastMessage;

      let lastMessageTimeStamp = 0;
      if (lastMessageDt) {
        lastMessageTimeStamp = Math.round(lastMessageDt.getTime() / 1000);
      }

      if(messageCount > 0) {
        return {
          roomId,
          userId1,
          userId2,
          spaceId,
          messageCount,
          lastMessage,
          lastMessageDt: lastMessageDt.toLocaleString(),
          lastMessageTimeStamp,
        };
      }
    }));

    const res2 = res.filter(v => v !== undefined);

    res2.sort((a, b) => {
      if(a.lastMessageTimeStamp < b.lastMessageTimeStamp) return -1;
      if(a.lastMessageTimeStamp > b.lastMessageTimeStamp) return 1;
      return 0;
    });

    return { rooms: res2 };
  }

  render() {
    return (
      <Layout>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>UserId</Table.HeaderCell>
              <Table.HeaderCell>HostUserId</Table.HeaderCell>
              <Table.HeaderCell>SpaceId</Table.HeaderCell>
              <Table.HeaderCell>LastMessageDt</Table.HeaderCell>
              <Table.HeaderCell>MessageCount</Table.HeaderCell>
              <Table.HeaderCell>LastMessage</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.rooms.map((room, i) => (
              <Table.Row key={i}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>
                  <Link href={`/room?id=${room.roomId}`}>
                    <a>{room.roomId}</a>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link href={`https://monooq.com/user/${room.userId1}`}>
                    <a target="_brank">{room.userId1}</a>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link href={`https://monooq.com/user/${room.userId2}`}>
                    <a target="_brank">{room.userId2}</a>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link href={`https://monooq.com/space/${room.spaceId}`}>
                    <a target="_brank">{room.spaceId}</a>
                  </Link>
                </Table.Cell>
                <Table.Cell>{room.lastMessageDt}</Table.Cell>
                <Table.Cell>{room.messageCount}</Table.Cell>
                <Table.Cell>{room.lastMessage}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Layout>
    );
  }

}