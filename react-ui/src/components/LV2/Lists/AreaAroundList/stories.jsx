// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AreaAroundList from './index';

AreaAroundList.displayName = 'AreaAroundList';

storiesOf('Molecules(LV2)/Lists/AreaAroundList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      ボタンリスト(エリアボタン赤丸ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <AreaAroundList
          caption="周辺エリアを含めて探す"
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
