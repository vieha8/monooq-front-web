// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AreaCircleList from './index';

AreaCircleList.displayName = 'AreaCircleList';

storiesOf('Molecules(LV2)/Lists/AreaCircleList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      ボタンリスト(エリアボタン赤丸ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <AreaCircleList
          caption="周辺エリアを含めて探す"
          areaCircleList={[
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
