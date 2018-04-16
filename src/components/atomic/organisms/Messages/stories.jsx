// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import Messages from './index';

function getMessages() {
  return [
    {
      self: {
        sentAt: new Date(),
        message: 'よろしくよろしくよろしく',
      },
    },
    {
      self: {
        sentAt: new Date(),
        image: 'http://placehold.jp/500x500.png',
      },
    },
    {
      other: {
        userImage: 'http://placehold.jp/500x500.png',
        receivedAt: new Date(),
        message: 'こちらこそよろしくよろしくよろしく',
      },
    },
    {
      other: {
        userImage: 'http://placehold.jp/500x500.png',
        receivedAt: new Date(),
        image: 'http://placehold.jp/500x500.png',
      },
    },
    {
      admin: {
        receivedAt: new Date(),
        message: '予約完了！',
      },
    },
    {
      estimate: {
        name: 'モノオク太郎',
        beginAt: '2018/05/01 12:00',
        endAt: '2018/05/02 18:00',
        price: 12000,
        link: '#',
        receivedAt: new Date(),
      },
    },
  ];
}

storiesOf('Organisms/Messages', module)
  .addDecorator(StorybookRouter())
  .add('userMySelf', () => (
    <div>
      <Messages userMySelf messages={getMessages()} />
    </div>
  ));
