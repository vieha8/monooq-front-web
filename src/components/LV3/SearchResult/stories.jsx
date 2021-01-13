import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchResult from './index';

SearchResult.displayName = 'SearchResult';

const getData = () => {
  const data = [];
  for (let i = 0; i < 10; i += 1) {
    data.push({
      image: 'http://placehold.jp/200x200.png',
      address: '東京都渋谷区渋谷',
      title: '広々8畳・和室・武蔵小杉駅より徒歩5分以内の駅近スペース',
      isFurniture: true,
      priceFull: '10000',
      priceTatami: '3123',
      onClick: () => console.log('onClick'),
    });
  }

  return data;
};

storiesOf('Organisms(LV3)/SearchResult', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        検索結果リスト
      `)(() => (
      <div style={{ width: '100%', maxWidth: '880px', padding: `${Dimens.storyBookPadding}` }}>
        <SearchResult spaces={getData()} />
      </div>
    )),
  );
