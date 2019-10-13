// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import CityTownAreaList from './index';

CityTownAreaList.displayName = 'CityTownAreaList';

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

storiesOf('Molecules(LV2)/Lists/CityTownAreaList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      市区町村リスト
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <CityTownAreaList
          prefecture="目黒区"
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
