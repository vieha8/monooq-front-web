import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchResultItem from './index';

SearchResultItem.displayName = 'SearchResultItem';

storiesOf('Molecules(LV2)/Items/SearchResultItem', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        検索結果アイテム
      `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <SearchResultItem
          image="http://placehold.jp/200x200.png"
          address="東京都渋谷区渋谷"
          title="広々8畳・和室・武蔵小杉駅より徒歩5分以内の駅近スペース"
          isFurniture
          priceFull="10000"
          priceHalf="5000"
          priceQuarter="3000"
          onClick={() => console.log('onClick')}
        />
      </div>
    )),
  )
  .add(
    'isRecommended',
    withInfo(`
        ### コンポーネント概要
        検索結果アイテム(おすすめスペース)(タグありver)
      `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <SearchResultItem
          image="http://placehold.jp/200x200.png"
          address="東京都渋谷区渋谷"
          title="広々8畳・和室・武蔵小杉駅より徒歩5分以内の駅近スペース"
          isFurniture
          priceFull="10000"
          priceHalf="5000"
          priceQuarter="3000"
          isRecommended
          tagList={['4畳以上', '1階', 'ダンボール1箱']}
          onClick={() => console.log('onClick')}
        />
      </div>
    )),
  );
