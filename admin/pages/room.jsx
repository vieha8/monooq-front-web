import React from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
import Layout from '../components/Layout';
require('firebase/firestore');

import { Table, Image } from 'semantic-ui-react';

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

const TextMessage = styled.div`
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export default class extends React.Component {

  static async getInitialProps({ query }) {
    const roomId = query.id;

    const firestore = firebase.firestore();
    const messages = await firestore.collection('rooms').doc(roomId).collection('messages').orderBy('createDt').get();

    const res = messages.docs.map(v => {
      const id = v.id;
      const messageType = v.data().messageType;
      let text = v.data().text;
      const image = v.data().image;
      const createdAt = v.data().createDt.toLocaleString();
      let userId = v.data().userId;

      if(messageType === 2) {
        text = `見積り\n金額:${v.data().price}円\n開始日:${v.data().startDate}\n終了日:${v.data().endDate}`;
      } else if(messageType === 3) {
        text = '決済完了';
      }

      return {
        id, userId, messageType, text, image, createdAt,
      };
    });

    return { messages: res };
  }

  render() {
    return (
      <Layout>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>UserId</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Text</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>CreatedAt</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.messages.map((message, i) => (
              <Table.Row key={i}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{message.userId}</Table.Cell>
                <Table.Cell>{message.messageType}</Table.Cell>
                <Table.Cell><TextMessage>{message.text}</TextMessage></Table.Cell>
                <Table.Cell>
                  {message.image && <Image src={message.image} size='small' />}
                </Table.Cell>
                <Table.Cell>{message.createdAt}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Layout>
    );
  }

}