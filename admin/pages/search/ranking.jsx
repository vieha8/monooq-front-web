import React from 'react';
import Link from 'next/link';
import firebase from 'firebase';
import Layout from '../../components/Layout';
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

    const keywords = searchLogs.docs.map(log => log.data().keyword);

    const counts = {};
    keywords.map(keyword => {
      counts[keyword] = counts[keyword] ? counts[keyword] + 1 : 1;
      return 1;
    });

    const result = Object.keys(counts).map(key => ({ keyword: key, count: counts[key] }));

    result.sort((a, b) => {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
      return 0;
    });

    console.log(result);
    return { ranking: result };
  }

  render() {
    return (
      <Layout>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>Keyword</Table.HeaderCell>
              <Table.HeaderCell>Count</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.ranking.map((data, i) => (
              <Table.Row key={i}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{data.keyword}</Table.Cell>
                <Table.Cell>{data.count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Layout>
    );
  }
}
