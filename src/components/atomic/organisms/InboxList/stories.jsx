// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import InboxList from './index';

function getMessages() {
  const data = [];
  for (let i = 0; i < 10; i += 1) {
    data.push({
      image: 'http://placehold.jp/500x500.png',
      name: 'モノオク太郎さん',
      receivedAt: new Date(),
    });
  }
  return data;
}

storiesOf('Organisms/InboxList', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <InboxList messages={getMessages()} />
    </div>
  ));
