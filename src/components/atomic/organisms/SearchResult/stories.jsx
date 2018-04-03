// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchResult from './index';

function getData() {
  const data = [];
  for (let i = 0; i < 30; i += 1) {
    data.push({
      image: 'http://placehold.jp/200x200.png',
      addressTown: '六本木六本木六本木六本木六本木',
      title: 'テストテストテストテストテスト',
      isFurniture: true,
      priceFull: '10000',
      priceHalf: '5000',
      priceQuarter: '3000',
      onClick: () => console.log('onClick'),
    });
  }

  return data;
}

storiesOf('Organisms/SearchResult', module)
  .add('Normal', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <SearchResult
        spaces={getData()}
      />
    </div>
  ));
