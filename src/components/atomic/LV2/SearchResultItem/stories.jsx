// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchResultItem from './index';

storiesOf('Molecules/SearchResultItem', module).add('Normal', () => (
  <div style={{ width: '100%', maxWidth: '800px' }}>
    <SearchResultItem
      image="http://placehold.jp/200x200.png"
      addressTown="六本木六本木六本木六本木六本木"
      title="テストテストテストテストテスト"
      isFurniture
      priceFull="10000"
      priceHalf="5000"
      priceQuarter="3000"
      onClick={() => console.log('onClick')}
    />
  </div>
));
