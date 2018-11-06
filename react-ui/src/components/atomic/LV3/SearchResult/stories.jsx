// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchResult from './index';

SearchResult.displayName = 'SearchNotFound';

function getData() {
  const data = [];
  for (let i = 0; i < 10; i += 1) {
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

storiesOf('Organisms(LV3)/SearchResult', module).add(
  'Disabled',
  withInfo(`
        ### コンポーネント概要
        検索結果リスト
      `)(() => (
    <div style={{ width: '100%', maxWidth: '880px', padding: `${Dimens.storyBookPadding}` }}>
      <SearchResult spaces={getData()} />
    </div>
  )),
);
