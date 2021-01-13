import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchConditionMore from './index';

SearchConditionMore.displayName = 'SearchConditionMore';

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

storiesOf('Organisms(LV3)/SearchConditionMore', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        スペース削除ボタン
        - ・ボタン押下時、削除確認POPUPを表示。
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SearchConditionMore
          btnText="地域を絞り込む"
          prefecture="東京都"
          city="渋谷区,新宿区,目黒区,千代田区,文京区,港区"
          townArea="上原,恵比寿,神山町,笹塚,松濤,神宮前,神泉町,千駄ヶ谷"
          cityTownAreaList={[
            {
              cityName: '目黒区',
              areaAroundList: AreaAroundList(),
              townAreaList: TownAreaList1(),
            },
            {
              cityName: '渋谷区',
              areaAroundList: [
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
              ],
              townAreaList: [
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
              ],
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
