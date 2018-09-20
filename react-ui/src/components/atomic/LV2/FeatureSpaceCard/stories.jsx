// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import UserSpaceImage from './index';

storiesOf('Molecules/UserSpaceImage', module).add('Normal', () => (
  <div>
    <UserSpaceImage
      user={{
        image: 'http://placehold.jp/500x500.png',
        name: 'hogehoge',
      }}
      space={{
        image: 'http://placehold.jp/500x500.png',
        price: '3,000',
        area: '東京都渋谷区',
        description: '素敵なスペース',
        color: '#FF0000',
      }}
    />
  </div>
));
