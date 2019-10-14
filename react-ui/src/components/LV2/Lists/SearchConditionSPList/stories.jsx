// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchConditionSPList from './index';
import SearchConditionSPListCityTownArea from './CityTownArea';

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

storiesOf('Molecules(LV2)/Lists/SearchConditionSPList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      検索条件リスト(SPのみ)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SearchConditionSPList
          searchConditionSPList={[
            {
              title: '東北・北海道',
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
          ]}
        />
      </div>
    )),
  )
  .add(
    'CityTownArea',
    withInfo(`
      ### コンポーネント概要
      検索条件リスト(SPのみ)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SearchConditionSPListCityTownArea
          searchConditionSPList={[
            {
              title: '渋谷区',
              areaAroundList: AreaAroundList(),
              collapsibleItemList: [
                {
                  isChecked: true,
                  text: '渋谷',
                },
                {
                  isChecked: false,
                  text: '表参道',
                },
                {
                  isChecked: true,
                  text: '原宿',
                },
                {
                  isChecked: true,
                  text: '神宮前',
                },
              ],
            },
            {
              title: '新宿区',
              areaAroundList: AreaAroundList(),
              collapsibleItemList: [
                {
                  isChecked: true,
                  text: '渋谷',
                },
                {
                  isChecked: false,
                  text: '表参道',
                },
                {
                  isChecked: true,
                  text: '原宿',
                },
                {
                  isChecked: true,
                  text: '神宮前',
                },
              ],
            },
          ]}
        />
      </div>
    )),
  );
