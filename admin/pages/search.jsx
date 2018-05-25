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
    console.error('Firebase initialization error', err.stack);
  }
}

export default class extends React.Component {
  static async getInitialProps() {
    const firestore = firebase.firestore();
    const searchLogs = await firestore.collection('spaceSearchLogs').get();

    const res = await Promise.all(
      searchLogs.docs.map(async log => {
        const logId = log.id;
        const userId = log.data().userId;
        const keyword = log.data().keyword;
        const date = log.data().createDt;
        const timestamp = Math.round(date.getTime() / 1000);

        return {
          logId,
          userId,
          keyword,
          date: date.toLocaleString(),
          timestamp,
        };
      }),
    );

    const res2 = res.filter(v => v !== undefined);

    res2.sort((a, b) => {
      if (a.timestamp < b.timestamp) return -1;
      if (a.timestamp > b.timestamp) return 1;
      return 0;
    });

    return { logs: res2 };
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
              <Table.HeaderCell>Keyword</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.logs.map((log, i) => (
              <Table.Row key={i}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{log.logId}</Table.Cell>
                <Table.Cell>
                  <Link href={`https://monooq.com/user/${log.userId}`}>
                    <a target="_brank">{log.userId}</a>
                  </Link>
                </Table.Cell>
                <Table.Cell>{log.keyword}</Table.Cell>
                <Table.Cell>{log.date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Layout>
    );
  }
}
