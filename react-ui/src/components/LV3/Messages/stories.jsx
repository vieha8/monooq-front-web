// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Messages from './index';

Messages.displayName = 'Messages';

let lastReadDt = new Date(2017, 0, 15, 22, 30); // 2017年1月15日 22時30分
let lastReadDt_kidoku = new Date(9999, 0, 15, 22, 30); // 9999年1月15日 22時30分

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

storiesOf('Organisms(LV3)/Messages', module)
  .addDecorator(StoryRouter())
  .add(
    'hostUser',
    withInfo(`
        ### コンポーネント概要
        メッセージ(ホストユーザver)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Messages hostUser messages={getMessages()} lastReadDt={lastReadDt} />
      </div>
    )),
  )
  .add(
    'hostUser kidoku',
    withInfo(`
        ### コンポーネント概要
        メッセージ(ホストユーザver)(既読)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Messages hostUser messages={getMessages()} lastReadDt={lastReadDt_kidoku} />
      </div>
    )),
  )
  .add(
    'notHostUser',
    withInfo(`
        ### コンポーネント概要
        メッセージ(利用者ユーザver)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Messages messages={getMessages()} lastReadDt={lastReadDt} />
      </div>
    )),
  );
