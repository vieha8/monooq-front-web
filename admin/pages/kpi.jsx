import React from 'react';
import Layout from '../components/Layout';
import firestore from '../helpers/firestore';

export default class extends React.Component {
  static async getInitialProps() {
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

        if (messageCount == 0) {
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

    console.log(allRoomCount);
    console.log(messageCounts);

    zeroMessageUsers.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    const a = zeroMessageUsers.filter((x, i, self) => {
      return self.indexOf(x) === i;
    });

    console.log(a.length);

    const responseRate = messageCounts[2] / (allRoomCount - messageCounts[0]);
    console.log(responseRate);

    return { rooms: res };
  }

  render() {
    return <Layout>Hi!</Layout>;
  }
}
