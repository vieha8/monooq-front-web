// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SpaceList from './index';

SpaceList.displayName = 'SpaceList';

const aaa = () => {
  const data = [];
  for (let i = 0; i < 10; i += 1) {
    data.push({
      image: 'http://placehold.jp/200x200.png',
      address: '東京都渋谷区渋谷',
      title: '広々8畳・和室・武蔵小杉駅より徒歩5分以内の駅近スペース',
      isFurniture: true,
      priceFull: '10000',
      priceHalf: '5000',
      priceQuarter: '3000',
      onClick: () => console.log('onClick'),
    });
  }

  return data;
};

const getData = () => {
  const data = [];
  for (let i = 0; i < 8; i += 1) {
    data.push({
      ID: 3,
      PrefectureId: 13,
      SpaceId: 3,
      Space: {
        ID: 3,
        UserID: 8,
        Title: '広々8畳・和室・武蔵小杉駅より徒歩5分以内の駅近スペース',
        Introduction:
          'サンプル部屋です。サンプル部屋です。サンプル部屋です。サンプル部屋です。サンプル部屋です。サンプル部屋です。サンプル部屋です。サンプル部屋です。',
        PriceFull: 3000,
        PriceHalf: 0,
        PriceQuarter: 0,
        Address: '東京都渋谷区東1-2',
        AddressPref: '東京都',
        AddressCity: '渋谷区',
        AddressTown: '東',
        Images: [
          {
            ID: 3,
            CreatedAt: '2018-11-28T05:08:30+09:00',
            UpdatedAt: '2018-11-28T05:08:30+09:00',
            DeletedAt: null,
            SpaceID: 3,
            ImageUrl:
              'https://firebasestorage.googleapis.com/v0/b/monooq-dev.appspot.com/o/img%2Fspaces%2F3%2F1543381707934.jpg?alt=media&token=f10230b7-3ff8-4e58-9a26-57c3d2ab941c',
          },
        ],
      },
    });
  }

  return data;
};

storiesOf('Organisms(LV3)/SpaceList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        利用例リスト
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SpaceList
          caption="運営のおすすめスペース紹介"
          captionSub="公式がイチオシする高評価スペース"
          spaceList={getData()}
        />
      </div>
    )),
  );
