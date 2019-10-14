// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchConditionMoreSP from './index';

SearchConditionMoreSP.displayName = 'SearchConditionMoreSP';

const AreaAroundList = () => [
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
];

const TownAreaList1 = () => [
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
];

const SearchConditionSPList = () => [
  {
    title: '東北・北海道',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '北陸・甲信越',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '関東',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '東海',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '関西',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '四国',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '九州・沖縄',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
];

storiesOf('Organisms(LV3)/SearchConditionMoreSP', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        スペース削除ボタン
        - ・ボタン押下時、削除確認POPUPを表示。
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SearchConditionMoreSP
          btnText="地域を絞り込む"
          searchConditionCurrentList={[
            {
              title: '都道府県',
              value: '東京都',
            },
            {
              title: '市区町村',
              value: '渋谷区,新宿区,目黒区,千代田区,文京区,港区',
            },
            {
              title: '町域・エリア',
              value: '上原,恵比寿,神山町,笹塚,松濤,神宮前,神泉町,千駄ヶ谷',
            },
          ]}
          searchConditionSPList={SearchConditionSPList()}
          cityTownAreaList={[
            {
              cityName: '目黒区',
              areaAroundList: AreaAroundList(),
              townAreaList: TownAreaList1(),
            },
            {
              cityName: '港区',
              areaAroundList: AreaAroundList(),
              townAreaList: TownAreaList1(),
            },
          ]}
        />
      </div>
    )),
  );
