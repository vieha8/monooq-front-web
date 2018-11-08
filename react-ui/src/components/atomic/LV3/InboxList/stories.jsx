// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import InboxList from './index';

InboxList.displayName = 'InboxList';

function getMessages() {
  const data = [];
  for (let i = 0; i < 5; i += 1) {
    data.push({
      image: 'http://placehold.jp/500x500.png',
      name: 'モノオク太郎さん',
      receivedAt: new Date(),
    });
  }
  return data;
}

storiesOf('Organisms(LV3)/InboxList', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        IMBOXリスト
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InboxList messages={getMessages()} />
      </div>
    )),
  );
