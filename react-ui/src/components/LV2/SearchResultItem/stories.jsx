// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchResultItem from './index';

SearchResultItem.displayName = 'SearchResultItem';

storiesOf('Molecules(LV2)/SearchResultItem', module)
  .addDecorator(StorybookRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        検索結果アイテム
      `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
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
    )),
  );
