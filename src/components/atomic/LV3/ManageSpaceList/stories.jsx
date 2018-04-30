// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import ManageSpaceList from './index';

function getData() {
  const spaces = [];
  for (let i = 0; i <= 9; i += 1) {
    spaces.push({
      image: {
        src: 'http://placehold.jp/500x500.png',
        alt: 'name',
      },
      address: '六本木',
      content:
        '東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！',
      furniture: true,
      prices: [20000, 10000, 5000],
      onClickSpace: () => console.log('onClickSpace'),
      onClickRemove: () => console.log('onClickRemove'),
    });
  }
  return spaces;
}

storiesOf('Organisms/ManageSpaceList', module).add('Normal', () => (
  <ManageSpaceList spaces={getData()} />
));
