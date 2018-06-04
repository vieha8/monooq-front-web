import React from 'react';
import Link from 'next/link';
import firebase from 'firebase';
import Layout from '../components/Layout';
require('firebase/firestore');

import { Table, Dropdown, TextArea } from 'semantic-ui-react';

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

export default class extends React.Component {
  static async getInitialProps() {
    const firestore = firebase.firestore();
    const rooms = await firestore.collection('rooms').get();

    const res = await Promise.all(
      rooms.docs.map(async room => {
        const roomId = room.id;
        const userId1 = room.data().userId1;
        const userId2 = room.data().userId2;
        const spaceId = room.data().spaceId;
        let lastMessageDt = new Date();
        if (room.data().lastMessageDt) {
          lastMessageDt = room.data().lastMessageDt;
        }

        const status = room.data().status;
        const user1Status = room.data().user1Status;
        const user2Status = room.data().user2Status;
        const memo = room.data().memo;

        const messages = await firestore
          .collection('rooms')
          .doc(roomId)
          .collection('messages')
          .get();
        const messageCount = messages.docs.length;

        const lastMessage = room.data().lastMessage;

        let lastMessageTimeStamp = 0;
        if (lastMessageDt) {
          lastMessageTimeStamp = Math.round(lastMessageDt.getTime() / 1000);
        }

        if (messageCount > 0) {
          return {
            roomId,
            status,
            userId1,
            user1Status,
            user2Status,
            userId2,
            spaceId,
            messageCount,
            lastMessage,
            lastMessageDt: lastMessageDt.toLocaleString(),
            lastMessageTimeStamp,
            memo,
          };
        }
      }),
    );

    const res2 = res.filter(v => v !== undefined);

    res2.sort((a, b) => {
      if (a.lastMessageTimeStamp < b.lastMessageTimeStamp) return -1;
      if (a.lastMessageTimeStamp > b.lastMessageTimeStamp) return 1;
      return 0;
    });

    return { rooms: res2 };
  }

  constructor(props) {
    super(props);
    this.state = {
      rooms: props.rooms,
    };
  }

  onChangeRoomStatus = async (index, roomId, value) => {
    const firestore = firebase.firestore();
    const roomRef = firestore.collection('rooms').doc(roomId);
    roomRef.set({ status: value }, { merge: true });
    const rooms = this.state.rooms;
    rooms[index].status = value;
    this.setState({ rooms });
  };

  onChangeUser1Status = async (index, roomId, userId, value) => {
    const firestore = firebase.firestore();
    const roomRef = firestore.collection('rooms').doc(roomId);
    roomRef.set({ user1Status: value }, { merge: true });
    const rooms = this.state.rooms;
    rooms[index].user1Status = value;
    this.setState({ rooms });
  };

  onChangeUser2Status = async (index, roomId, userId, value) => {
    const firestore = firebase.firestore();
    const roomRef = firestore.collection('rooms').doc(roomId);
    roomRef.set({ user2Status: value }, { merge: true });
    const rooms = this.state.rooms;
    rooms[index].user2Status = value;
    this.setState({ rooms });
  };

  render() {
    const roomStatusOptions = [
      {
        text: '',
        value: 0,
      },
      {
        text: '相談中',
        value: 1,
      },
      {
        text: '不成立',
        value: 2,
      },
      {
        text: '稼働中',
        value: 3,
      },
      {
        text: '取引完了',
        value: 4,
      },
      {
        text: 'テスト',
        value: 5,
      },
    ];

    const hostStatusOptions = [
      {
        text: '',
        value: 0,
      },
      {
        text: 'メール済み',
        value: 1,
      },
      {
        text: '電話済み',
        value: 2,
      },
      {
        text: 'SMS済み',
        value: 3,
      },
      {
        text: '注意済み',
        value: 4,
      },
    ];

    const userStatusOptions = [
      {
        text: '',
        value: 0,
      },
      {
        text: 'メール済み',
        value: 1,
      },
      {
        text: '電話済み',
        value: 2,
      },
      {
        text: 'SMS済み',
        value: 3,
      },
      {
        text: '注意済み',
        value: 4,
      },
      {
        text: '支払い催促済み',
        value: 5,
      },
      {
        text: 'レコメンド済み',
        value: 6,
      },
      {
        text: '決済完了',
        value: 7,
      },
    ];

    const rooms = this.state.rooms;

    return (
      <Layout>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>UserId</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>HostUserId</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>SpaceId</Table.HeaderCell>
              <Table.HeaderCell>LastMessageDt</Table.HeaderCell>
              <Table.HeaderCell>MessageCount</Table.HeaderCell>
              <Table.HeaderCell>LastMessage</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rooms.map((room, i) => (
              <Table.Row key={i}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>
                  <Link href={`/room?id=${room.roomId}`}>
                    <a>{room.roomId}</a>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder={'選択'}
                    selection
                    options={roomStatusOptions}
                    value={room.status}
                    onChange={(event, data) => this.onChangeRoomStatus(i, room.roomId, data.value)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Link href={`https://monooq.com/user/${room.userId1}`}>
                    <a target="_brank">{room.userId1}</a>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder={'選択'}
                    selection
                    options={userStatusOptions}
                    value={room.user1Status}
                    onChange={(event, data) =>
                      this.onChangeUser1Status(i, room.roomId, room.userId1, data.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Link href={`https://monooq.com/user/${room.userId2}`}>
                    <a target="_brank">{room.userId2}</a>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder={'選択'}
                    selection
                    options={hostStatusOptions}
                    value={room.user2Status}
                    onChange={(event, data) =>
                      this.onChangeUser2Status(i, room.roomId, room.userId2, data.value)
                    }
                  />
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
