// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import Profile from './index';

function getSpaces() {
  const spaces = [];
  for (let i = 0; i < 10; i += 1) {
    spaces.push({
      id: 1,
      image: 'http://placehold.jp/200x200.png',
      address: '六本木',
      content: '駅近で利用しやすいスペース！',
      furniture: true,
      prices: [3000, 5000, 20000],
    });
  }

  return spaces;
}

storiesOf('Molecules/Profile', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <Profile
        image="http://placehold.jp/200x200.png"
        name="モノオク太郎"
        prefCode={12}
        profile={`使いやすい物置提供中です！\nよろしくお願いします！`}
        spaces={getSpaces()}
      />
    </div>
  ));
