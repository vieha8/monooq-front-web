// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import CityTownAreaList from './index';

CityTownAreaList.displayName = 'CityTownAreaList';

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
          cityName="目黒区"
          areaAroundList={[
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
          ]}
        />
      </div>
    )),
  );
